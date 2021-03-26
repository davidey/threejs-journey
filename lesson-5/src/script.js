import * as THREE from 'three'
import './style.css'

const sizes = {
  width: 800,
  height: 600
}

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()

// Red cube
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 'blue'})
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// scene.add(mesh)

// Scaling
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5

// Rotation
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = Math.PI / 2

// Objects
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0x0000FF})
)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0x00FF00})
)
cube2.position.x = 2

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0xFF0000})
)
cube3.position.x = -2

group.add(cube1)
group.add(cube2)
group.add(cube3)

group.position.z = -2

group.rotation.y = Math.PI * 0.25
group.rotation.z = Math.PI * 0.25

group.scale.y = 0.75

// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Camera
// PerspectiveCamera(degree of field of view, ratio )
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3
// camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)