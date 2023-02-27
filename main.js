import * as THREE from 'three'
import './style.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const sun = new URL('./assets/sun/sun.glb', import.meta.url).href
const mercury = new URL('./assets/mercury/mercury.glb', import.meta.url).href
const venus = new URL('./assets/venus/venus.glb', import.meta.url).href
const earth = new URL('./assets/earth/earth.glb', import.meta.url).href
const mars = new URL('./assets/mars/mars.glb', import.meta.url).href
const jupiter = new URL('./assets/jupiter/jupiter.glb', import.meta.url).href
const saturn = new URL('./assets/saturn/saturn.glb', import.meta.url).href
const uranus = new URL('./assets/uranus/uranus.glb', import.meta.url).href
const neptune = new URL('./assets/neptune/neptune.glb', import.meta.url).href

const back = new URL('./assets/background/skybox/back.png', import.meta.url).href
const bottom = new URL('./assets/background/skybox/bottom.png', import.meta.url).href
const front = new URL('./assets/background/skybox/front.png', import.meta.url).href
const left = new URL('./assets/background/skybox/left.png', import.meta.url).href
const right = new URL('./assets/background/skybox/right.png', import.meta.url).href
const top = new URL('./assets/background/skybox/top.png', import.meta.url).href

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
    back,
    bottom,
    front,
    left,
    right,
    top,
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
const earthSize = 1
const speed = .0008
const distance = 300

loader.load(sun, onLoad => load(onLoad, 'sun', earthSize * 2, 0), onProgress, onError)
loader.load(mercury, onLoad => load(onLoad, 'mercury', earthSize * .4, 15 * distance), onProgress, onError)
loader.load(venus, onLoad => load(onLoad, 'venus', earthSize * .9, 30 * distance), onProgress, onError)
loader.load(earth, onLoad => load(onLoad, 'earth', earthSize, 45 * distance), onProgress, onError)
loader.load(mars, onLoad => load(onLoad, 'mars', earthSize * .6, 60 * distance), onProgress, onError)
loader.load(jupiter, onLoad => load(onLoad, 'jupiter', earthSize * 11, 350 * distance), onProgress, onError)
loader.load(saturn, onLoad => load(onLoad, 'saturn', earthSize * 9, 600 * distance), onProgress, onError)
loader.load(uranus, onLoad => load(onLoad, 'uranus', earthSize * 4, 800 * distance), onProgress, onError)
loader.load(neptune, onLoad => load(onLoad, 'neptune', earthSize * 4, 1200 * distance), onProgress, onError)

// Light
const light = new THREE.PointLight(0xffffff, 1)
light.position.set(-1, 0, 0)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 1, 2500 * distance)
camera.position.z = 5000
camera.position.y = 3000
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
}
animate()
