import * as THREE from 'three'
import './style.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Scene
const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

let i = 0
let planetObjects = []
let planetMeshes = []

function load(glb, planet, size, x) {
    i++
    const mesh = glb.scene
    const obj = new THREE.Object3D()

    mesh['planet'] = planet
    obj['planet'] = planet

    planetMeshes[i] = mesh
    planetObjects[i] = obj

    mesh.scale.set(size, size, size)
    mesh.position.setX(x)

    obj.add(mesh)
    scene.add(obj)
}

function rotatePlanet() {
    if (planetObjects[1]?.rotation === undefined) {
        console.log('UNDEF')
    } else {
        planetObjects[1].rotation.y += .01
    }
}

function onProgress(xhr) {
    console.log(`${xhr.loaded / xhr.total * 100}%`)
}

function onError(error) {
    console.error(error)
}

// Model loader
const loader = new GLTFLoader()

loader.load("./public/assets/sun/Sun_1_1391000.glb", onLoad => load(onLoad, 'sun', .2, 0, 0), onProgress, onError)
loader.load("./public/assets/mercury/Mercury_1_4878.glb", onLoad => load(onLoad, 'mercury', .1, 200), onProgress, onError)
loader.load("./public/assets/venus/Venus_1_12103.glb", onLoad => load(onLoad, 'venus', .1, 300), onProgress, onError)
loader.load("./public/assets/earth/EarthClouds_1_12756.glb", onLoad => load(onLoad, 'earth', .1, 400), onProgress, onError)
loader.load("./public/assets/mars/Mars_1_6792.glb", onLoad => load(onLoad, 'mars', .1, 500), onProgress, onError)
loader.load("./public/assets/jupiter/Jupiter_1_142984.glb", onLoad => load(onLoad, 'jupiter', .1, 600), onProgress, onError)
loader.load("./public/assets/saturn/Saturn_1_120536.glb", onLoad => load(onLoad, 'saturn', .1, 700), onProgress, onError)
loader.load("./public/assets/uranus/Uranus_1_51118.glb", onLoad => load(onLoad, 'uranus', .1, 800), onProgress, onError)
loader.load("./public/assets/neptune/Neptune_1_49528.glb", onLoad => load(onLoad, 'neptune', .1, 900), onProgress, onError)

// Light
const light = new THREE.PointLight(0xffffff, 1)
light.position.set(-1, 0, 0)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 2, 50000)
camera.position.z = 1000
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
// remove pixelated edges
renderer.setPixelRatio(2)

// Camera Controls
const controls = new OrbitControls(camera, canvas)
// weighted camera
controls.enableDamping = true

// update window when resized
window.addEventListener('resize', () => {
    // Update
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

function loop() {
    // renderer.render(scene, camera)
    // weighted camera effect
    controls.update()
    window.requestAnimationFrame(loop)
}
loop()

function animate() {
    rotatePlanet('venus', planetObjects)
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()
