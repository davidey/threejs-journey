import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import './style.css'

const sizes = {
  width: 800,
  height: 600
}

const aspectRatio = sizes.width / sizes.height

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()

// Cursor
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = event.clientY / sizes.height - 0.5
})


// Objects
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0x0000FF})
)

group.add(cube1)

// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Camera
// PerspectiveCamera(degree of field of view, ratio, near, far )
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// // OrthographicCamera(left, right, top, bottom)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
scene.add(camera)

// Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

// Animations
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  // cube1.rotation.y = elapsedTime

  // Update camera
  // camera.position.x = cursor.x * 3
  // // y direction is opposite in THREE compared to the browser
  // camera.position.y = -cursor.y * 3

  // camera.position.x = Math.sin(Math.PI * 2 * cursor.x) * 3
  // camera.position.z = Math.cos(Math.PI * 2 * cursor.x) * 3
  // camera.position.y = cursor.y * 5

  // camera.lookAt(cube1.position)

  controls.update()


  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()