import * as THREE from 'three'
import './style.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Scene
const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const planetObjects = []
const planetMeshes = []

const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
    './public/assets/background/skybox/back.png',
    './public/assets/background/skybox/bottom.png',
    './public/assets/background/skybox/front.png',
    './public/assets/background/skybox/left.png',
    './public/assets/background/skybox/right.png',
    './public/assets/background/skybox/top.png',
])

function load(glb, planet, size, x) {
    const mesh = glb.scene
    const obj = new THREE.Object3D()

    mesh['planet'] = planet
    obj['planet'] = planet

    planetMeshes.push(mesh)
    planetObjects.push(obj)

    mesh.scale.set(size, size, size)
    mesh.position.setX(x)
    if (planet === 'saturn') {
        mesh.rotation.x = Math.PI / 1.2;
        mesh.rotation.y = Math.PI / 3.2;
    }

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

// 8,000 miles
const earthSize = .08
const speed = .002
const distance = 200

loader.load("./public/assets/sun/Sun_1_1391000.glb", onLoad => load(onLoad, 'sun', earthSize * 13, 0), onProgress, onError)
loader.load("./public/assets/mercury/Mercury_1_4878.glb", onLoad => load(onLoad, 'mercury', earthSize * 1 / 3, 3.5 * distance), onProgress, onError)
loader.load("./public/assets/venus/Venus_1_12103.glb", onLoad => load(onLoad, 'venus', earthSize * .9, 6.7 * distance), onProgress, onError)
loader.load("./public/assets/earth/EarthClouds_1_12756.glb", onLoad => load(onLoad, 'earth', earthSize, 9.3 * distance), onProgress, onError)
loader.load("./public/assets/mars/Mars_1_6792.glb", onLoad => load(onLoad, 'mars', earthSize * 1 / 2, 14.2 * distance), onProgress, onError)
loader.load("./public/assets/jupiter/Jupiter_1_142984.glb", onLoad => load(onLoad, 'jupiter', earthSize * 11, 48.4 * distance), onProgress, onError)
loader.load("./public/assets/saturn/Saturn_1_120536.glb", onLoad => load(onLoad, 'saturn', earthSize * 9, 88.9 * distance), onProgress, onError)
loader.load("./public/assets/uranus/Uranus_1_51118.glb", onLoad => load(onLoad, 'uranus', earthSize * 4, 179 * distance), onProgress, onError)
loader.load("./public/assets/neptune/Neptune_1_49528.glb", onLoad => load(onLoad, 'neptune', earthSize * 3.5, 288 * distance), onProgress, onError)

// Light
const light = new THREE.PointLight(0xffffff, 1)
light.position.set(-1, 0, 0)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 1, 500 * distance)
camera.position.z = 5000
camera.position.y = 3000
scene.add(camera)

// FPS counter
const stats = Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

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

    rotatePlanet('sun', planetMeshes, .4 * speed)

    rotatePlanet('mercury', planetMeshes, .4 * speed)
    rotatePlanet('mercury', planetObjects, 4 * speed)

    rotatePlanet('venus', planetMeshes, .2 * speed)
    rotatePlanet('venus', planetObjects, 1.5 * speed)

    rotatePlanet('earth', planetMeshes, 2 * speed)
    rotatePlanet('earth', planetObjects, 1 * speed)

    rotatePlanet('mars', planetMeshes, 1.8 * speed)
    rotatePlanet('mars', planetObjects, .8 * speed)

    rotatePlanet('jupiter', planetMeshes, 4 * speed)
    rotatePlanet('jupiter', planetObjects, .2 * speed)

    rotatePlanet('saturn', planetMeshes, 3.8 * speed)
    rotatePlanet('saturn', planetObjects, .09 * speed)

    rotatePlanet('uranus', planetMeshes, 3 * speed)
    rotatePlanet('uranus', planetObjects, .04 * speed)

    rotatePlanet('neptune', planetMeshes, 3.2 * speed)
    rotatePlanet('neptune', planetObjects, .01 * speed)

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    stats.update()
}
animate()
