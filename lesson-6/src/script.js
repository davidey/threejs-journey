import * as THREE from 'three'
import gsap from 'gsap'
import './style.css'

const sizes = {
  width: 800,
  height: 600
}

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()


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
// PerspectiveCamera(degree of field of view, ratio )
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// const clock = new THREE.Clock()

gsap.to(cube1.position, { x: 2, duration: 1, delay: 1})
gsap.to(cube1.position, { x: 0, duration: 1, delay: 2})

// Animations
const tick = () => {
  // // Time
  // const elapsedTime = clock.getElapsedTime()
  // console.log(elapsedTime)
  // // Update objects

  // camera.lookAt(cube1.position)

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()