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

function rotatePlanet(planetName, modelType, rotationSpeed) {
    const planet = modelType.find(model => model?.planet === planetName)  

    if (planet?.rotation === undefined) {
    } else {
        planet.rotation.y += rotationSpeed
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

const earthSize = .01

loader.load("./public/assets/sun/Sun_1_1391000.glb", onLoad => load(onLoad, 'sun', earthSize * 109, 0, 0), onProgress, onError)
loader.load("./public/assets/mercury/Mercury_1_4878.glb", onLoad => load(onLoad, 'mercury', earthSize * 1/3, 200), onProgress, onError)
loader.load("./public/assets/venus/Venus_1_12103.glb", onLoad => load(onLoad, 'venus', earthSize * .9, 400), onProgress, onError)
loader.load("./public/assets/earth/EarthClouds_1_12756.glb", onLoad => load(onLoad, 'earth', earthSize, 600), onProgress, onError)
loader.load("./public/assets/mars/Mars_1_6792.glb", onLoad => load(onLoad, 'mars', earthSize * 1/2, 800), onProgress, onError)
loader.load("./public/assets/jupiter/Jupiter_1_142984.glb", onLoad => load(onLoad, 'jupiter', earthSize * 11, 1000), onProgress, onError)
loader.load("./public/assets/saturn/Saturn_1_120536.glb", onLoad => load(onLoad, 'saturn', earthSize * 9, 1200), onProgress, onError)
loader.load("./public/assets/uranus/Uranus_1_51118.glb", onLoad => load(onLoad, 'uranus', earthSize * 4, 1400), onProgress, onError)
loader.load("./public/assets/neptune/Neptune_1_49528.glb", onLoad => load(onLoad, 'neptune', earthSize * 3.5, 1600), onProgress, onError)

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
    controls.update()
    window.requestAnimationFrame(loop)
}
loop()

function animate() {

    rotatePlanet('mercury', planetMeshes, .01)
    rotatePlanet('mercury', planetObjects, .001)

    rotatePlanet('venus', planetMeshes, .01)
    rotatePlanet('venus', planetObjects, .001)

    rotatePlanet('earth', planetMeshes, .01)
    rotatePlanet('earth', planetObjects, .001)

    rotatePlanet('mars', planetMeshes, .01)
    rotatePlanet('mars', planetObjects, .001)

    rotatePlanet('jupiter', planetMeshes, .01)
    rotatePlanet('jupiter', planetObjects, .001)

    rotatePlanet('saturn', planetMeshes, .01)
    rotatePlanet('saturn', planetObjects, .001)

    rotatePlanet('uranus', planetMeshes, .01)
    rotatePlanet('uranus', planetObjects, .001)

    rotatePlanet('neptune', planetMeshes, .01)
    rotatePlanet('neptune', planetObjects, .001)

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()
