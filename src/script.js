import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')
const normalTexture2 = textureLoader.load('/textures/texture2.png')


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects

const geometry = new THREE.SphereGeometry( .5,42, 46 );

// Materials
 
const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x000000)   
material.roughness = 0.3
material.wireframe = !true  
material.normalMap = normalTexture2
// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 4
pointLight.position.y = 7
pointLight.position.z = 2
scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0xff0000, 4)
pointLight2.position.set(4,-1,1)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0x0000ff, 4)
pointLight3.position.set(-4,-1,1)
scene.add(pointLight3)
const pointLight4 = new THREE.PointLight(0x00ff00, 4)
pointLight4.position.set(0,1,1)
scene.add(pointLight4)

gui.add(pointLight4.position , 'y')
gui.add(pointLight4, 'intensity')
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.x = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()