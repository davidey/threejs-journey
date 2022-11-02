import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import './style.css'

// Debug
const gui = new dat.GUI({ closed:true, width: 400 })
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y + 10, duration: 1})
  }
}

// Base
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  console.log('resize')
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen()) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen()) {
      document.webkitExitFullscreen()
    }
  }
})

const aspectRatio = sizes.width / sizes.height

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()


// Objects
const group = new THREE.Group()
scene.add(group)

// const positionsArray = new Float32Array([
//   0, 0, 0,
//   0, 1, 0,
//   1, 0, 0
// ])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({color: parameters.color, wireframe: true})
const mesh = new THREE.Mesh(geometry, material)

group.add(mesh)

// Axes helper
const axesHelper = new THREE.AxesHelper()
//scene.add(axesHelper)

// Camera
// PerspectiveCamera(degree of field of view, ratio, near, far )
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// gui.add(mesh.position, 'y',  -3, 3, 0.01)
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
})
gui.add(parameters, 'spin')

// Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// Animations
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime()

  controls.update()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()