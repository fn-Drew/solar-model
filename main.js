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

// Model loader
const loader = new GLTFLoader()

function load(glb, size, x) {
    glb.scene.scale.set(size, size, size)
    glb.scene.position.setX(x)
    scene.add(glb.scene)
}

function onProgress(xhr) {
    console.log(xhr.loaded / xhr.total * 100) + '% loaded'
}

function onError(error) {
    console.error(error)
}

loader.load("./public/assets/sun/Sun_1_1391000.glb", onLoad => load(onLoad, .2, 0, 0), onProgress, onError)
loader.load("./public/assets/mercury/Mercury_1_4878.glb", onLoad => load(onLoad, .1, 200), onProgress, onError)
loader.load("./public/assets/venus/Venus_1_12103.glb", onLoad => load(onLoad, .1, 300), onProgress, onError)
loader.load("./public/assets/earth/EarthClouds_1_12756.glb", onLoad => load(onLoad, .1, 400), onProgress, onError)
loader.load("./public/assets/mars/Mars_1_6792.glb", onLoad => load(onLoad, .1, 500), onProgress, onError)
loader.load("./public/assets/jupiter/Jupiter_1_142984.glb", onLoad => load(onLoad, .1, 600), onProgress, onError)
loader.load("./public/assets/saturn/Saturn_1_120536.glb", onLoad => load(onLoad, .1, 700), onProgress, onError)
loader.load("./public/assets/uranus/Uranus_1_51118.glb", onLoad => load(onLoad, .1, 800), onProgress, onError)
loader.load("./public/assets/neptune/Neptune_1_49528.glb", onLoad => load(onLoad, .1, 900), onProgress, onError)

// Light
const light = new THREE.DirectionalLight(0xffffff, 6)
light.position.set(2, 2, 5)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 1, 50000)
camera.position.z = 1000
scene.add(camera)


// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
// remove pixelated edges
renderer.setPixelRatio(2)

renderer.render(scene, camera)

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
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()
