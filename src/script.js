import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vector3 } from 'three';

const loader = new GLTFLoader();

loader.load( '/textures/frog.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const profilepic = new THREE.TextureLoader().load('/textures/pp.jpeg')


const textureLoader = new THREE.TextureLoader()

const normalTexture2 = textureLoader.load('/textures/texture2.png')




// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects

const geometry = new THREE.SphereGeometry( 1,42, 46 );
const imagecube = new THREE.BoxGeometry( 2, 2, 2 );

// Materials
 
const imagecubematerial = new THREE.MeshStandardMaterial()
imagecubematerial.color = new THREE.Color(0x424242)   
imagecubematerial.roughness = 0.9
imagecubematerial.metalness = 0.8
imagecubematerial.map = profilepic

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x000000)   
material.roughness = 0.3
material.wireframe = !true  
material.normalMap = normalTexture2
// Mesh
const sphere = new THREE.Mesh(geometry,material)
const cube = new THREE.Mesh(imagecube,imagecubematerial)
scene.add(cube)
scene.add(sphere)
cube.position.set(0,0,-5)
// Lights

const pointLight = new THREE.PointLight(0xffffff, 6)
pointLight.position.x = 4
pointLight.position.y = 7
pointLight.position.z = 2
scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0xff0000, 7)
pointLight2.position.set(4,-1,1)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0x0000ff, 7)
pointLight3.position.set(-4,-1,1)
scene.add(pointLight3)
const pointLight4 = new THREE.PointLight(0x00ff00, 7)
pointLight4.position.set(0,1,1)
scene.add(pointLight4)

const cubelight = new THREE.PointLight(0xffffff, .01)
cubelight.position.set(0,0,-5)
scene.add(cubelight)

// const whitelight = gui.addFolder('White light')

// whitelight.add(pointLight.position , 'x')
// whitelight.add(pointLight.position , 'y')
// whitelight.add(pointLight.position , 'z')
// whitelight.add(pointLight, 'intensity')

// const whitelightclr = {
//     color:0xffffff
// }

// whitelight.addColor(whitelightclr,'color').onChange(()=>{
//     pointLight.color.set(whitelightclr.color)
// })


// const redlight = gui.addFolder('Red light')


// redlight.add(pointLight2.position , 'x')
// redlight.add(pointLight2.position , 'y')
// redlight.add(pointLight2.position , 'z')
// redlight.add(pointLight2, 'intensity')

// const redlightclr = {
//     color:0xff0000
// }

// redlight.addColor(redlightclr,'color').onChange(()=>{
//     pointLight2.color.set(redlightclr.color)
// })

// const bluelight = gui.addFolder('Blue light')

// bluelight.add(pointLight3.position , 'x')
// bluelight.add(pointLight3.position , 'y')
// bluelight.add(pointLight3.position , 'z')
// bluelight.add(pointLight3, 'intensity')

// const bluelightclr = {
//     color:0x0000ff
// }

// bluelight.addColor(bluelightclr,'color').onChange(()=>{
//     pointLight3.color.set(bluelightclr.color)
// })

// const greenlight = gui.addFolder('Green light')


// greenlight.add(pointLight4.position , 'x')
// greenlight.add(pointLight4.position , 'y')
// greenlight.add(pointLight4.position , 'z')
// greenlight.add(pointLight4, 'intensity')

// const greenlightclr = {
//     color:0x00ff00
// }

// greenlight.addColor(greenlightclr,'color').onChange(()=>{
//     pointLight4.color.set(greenlightclr.color)
// })


// const lighthelper4 = new THREE.PointLightHelper(pointLight4 , .1)
// scene.add(lighthelper4)

// const lighthelper3 = new THREE.PointLightHelper(pointLight3 , .1)
// scene.add(lighthelper3)

// const lighthelper2 = new THREE.PointLightHelper(pointLight2 , .1)
// scene.add(lighthelper2)

const cubelighthelper = new THREE.PointLightHelper(cubelight , .2)
scene.add(cubelighthelper)

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
sphere.position.set(0,0,-2)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0
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


var mouseX = 0;
var mouseY = 0;

var targetX = 0;
var targetY = 0;

const onMouseMove = (event) =>{
    mouseX = (event.clientX - (window.innerWidth / 2))
    mouseY = (event.clientX - (window.innerHeight / 2))
}
const updateSphear = (event) =>{
    console.log("scrolled = " + window.scrollY);
    camera.position.z = window.scrollY * -.001
} 

document.addEventListener('mousemove' , onMouseMove)
document.addEventListener('scroll' , updateSphear)


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    cube.rotation.y = .5 * elapsedTime
    //sphere.rotation.x = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += -.5 * (targetY - sphere.rotation.x)

    cube.rotation.y += .5 * (targetX - cube.rotation.y)
    cube.rotation.x += .5 * (targetY - cube.rotation.x)
    cube.rotation.z += -.5 * (targetY - cube.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()