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

function load(glb, size) {
    console.log(glb)
    console.log(size)
    // reduce scale of imported assets 1/10 scale
    glb.scene.scale.set(size, size, size)
    scene.add(glb.scene)
}

// loader.load('./public/assets/earth/EarthClouds_1_12756.glb', function(glb) {
//     console.log(glb)
//     // reduce scale of imported assets 1/10 scale
//     glb.scene.scale.set(.1, .1, .1)
//     scene.add(glb.scene)
// }, function(xhr) {
//     console.log(xhr.loaded / xhr.total * 100) + '% loaded'
// }, function(error) {
//     console.error(error)
// })

loader.load("./public/assets/earth/EarthClouds_1_12756.glb", onLoad => load(onLoad, .1))
loader.load("./public/assets/sun/Sun_1_1391000.glb", onLoad => load(onLoad, 1))

// Light
const light = new THREE.DirectionalLight(0xffffff, 6)
light.position.set(2, 2, 5)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height)
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
