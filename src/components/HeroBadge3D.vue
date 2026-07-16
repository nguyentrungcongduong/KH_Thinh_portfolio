<template>
  <div
    ref="container"
    class="hero-badge-3d"
    aria-label="Interactive 3D profile badge"
  ></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { personalInfo } from '@/data/portfolio.js'

const container = ref(null)

let THREE
let renderer
let scene
let camera
let badge
let lanyard
let anchor
let animationFrame
let resizeObserver
let texture
let pointerId = null
let isDragging = false
let targetX = 0
let targetY = -0.65
let velocityX = 0
let velocityY = 0
let currentX = 0
let currentY = -0.65
let startedAt = 0

const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function createBadgeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 1200
  const context = canvas.getContext('2d')

  context.fillStyle = '#FAFAF7'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = '#16201C'
  context.fillRect(0, 0, canvas.width, 190)

  context.fillStyle = '#C84A2F'
  context.fillRect(0, 190, canvas.width, 14)

  context.fillStyle = '#FFFFFF'
  context.font = '700 48px "Open Sans", Arial, sans-serif'
  context.fillText('BUSINESS ANALYST', 64, 116)

  context.strokeStyle = '#16201C'
  context.lineWidth = 10
  context.strokeRect(38, 38, canvas.width - 76, canvas.height - 76)

  context.fillStyle = '#C84A2F'
  context.beginPath()
  context.arc(144, 320, 60, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = '#16201C'
  context.font = '800 92px "Open Sans", Arial, sans-serif'
  context.fillText('PHT.', 220, 350)

  context.font = '800 64px "Open Sans", Arial, sans-serif'
  wrapText(context, personalInfo.name, 64, 530, 720, 80)

  context.fillStyle = 'rgba(22, 32, 28, 0.74)'
  context.font = '700 38px "Open Sans", Arial, sans-serif'
  wrapText(context, personalInfo.title, 64, 680, 720, 54)

  context.strokeStyle = '#C84A2F'
  context.lineWidth = 6
  context.beginPath()
  context.moveTo(64, 790)
  context.lineTo(836, 790)
  context.stroke()

  context.fillStyle = '#16201C'
  context.font = '700 32px "Open Sans", Arial, sans-serif'
  context.fillText('REQUIREMENTS', 64, 880)
  context.fillText('BPMN', 64, 946)
  context.fillText('SRS', 64, 1012)
  context.fillText('GAP ANALYSIS', 64, 1078)

  context.fillStyle = '#C84A2F'
  ;[855, 921, 987, 1053].forEach((y) => {
    context.fillRect(760, y, 76, 26)
  })

  return new THREE.CanvasTexture(canvas)
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''

  words.forEach((word, index) => {
    const testLine = `${line}${word} `
    const width = context.measureText(testLine).width

    if (width > maxWidth && index > 0) {
      context.fillText(line, x, y)
      line = `${word} `
      y += lineHeight
    } else {
      line = testLine
    }
  })

  context.fillText(line, x, y)
}

async function setupScene() {
  const element = container.value
  if (!element) return

  THREE = await import('three')

  if (!container.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  camera.position.set(0, 0, 9)

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.setClearColor(0x000000, 0)
  element.appendChild(renderer.domElement)

  const ambient = new THREE.AmbientLight(0xffffff, 1.9)
  const key = new THREE.DirectionalLight(0xffffff, 2.8)
  key.position.set(2.5, 4, 5)
  const rim = new THREE.DirectionalLight(0xc84a2f, 1.4)
  rim.position.set(-3, -1, 3)
  scene.add(ambient, key, rim)

  anchor = new THREE.Vector3(0, 3.25, 0)
  texture = createBadgeTexture()
  texture.colorSpace = THREE.SRGBColorSpace

  const badgeGeometry = new THREE.BoxGeometry(2.25, 3.15, 0.08, 4, 4, 1)
  const badgeMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x16201c, roughness: 0.55, metalness: 0.08 }),
    new THREE.MeshStandardMaterial({ color: 0x16201c, roughness: 0.55, metalness: 0.08 }),
    new THREE.MeshStandardMaterial({ color: 0xfafaf7, roughness: 0.7, metalness: 0.02 }),
    new THREE.MeshStandardMaterial({ color: 0xfafaf7, roughness: 0.7, metalness: 0.02 }),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.62, metalness: 0.03 }),
    new THREE.MeshStandardMaterial({ color: 0x16201c, roughness: 0.7, metalness: 0.02 }),
  ]

  badge = new THREE.Mesh(badgeGeometry, badgeMaterials)
  badge.position.set(currentX, currentY, 0)
  badge.castShadow = false
  scene.add(badge)

  const clipGeometry = new THREE.TorusGeometry(0.25, 0.035, 12, 48)
  const clipMaterial = new THREE.MeshStandardMaterial({
    color: 0xc84a2f,
    roughness: 0.35,
    metalness: 0.25,
  })
  const clip = new THREE.Mesh(clipGeometry, clipMaterial)
  clip.position.set(0, 1.6, 0.08)
  clip.rotation.x = Math.PI / 2
  badge.add(clip)

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xfafaf7,
    transparent: true,
    opacity: 0.9,
    linewidth: 2,
  })
  lanyard = new THREE.Line(new THREE.BufferGeometry(), lineMaterial)
  scene.add(lanyard)

  resizeObserver = new ResizeObserver(resizeRenderer)
  resizeObserver.observe(element)
  resizeRenderer()

  renderer.domElement.addEventListener('pointerdown', handlePointerDown)
  renderer.domElement.addEventListener('pointermove', handlePointerMove)
  renderer.domElement.addEventListener('pointerup', handlePointerUp)
  renderer.domElement.addEventListener('pointercancel', handlePointerUp)

  startedAt = performance.now()
  animate()
}

function resizeRenderer() {
  const element = container.value
  if (!element || !renderer || !camera) return

  const width = Math.max(1, element.clientWidth)
  const height = Math.max(1, element.clientHeight)
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

function pointerToWorld(event) {
  const rect = renderer.domElement.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
  const vector = new THREE.Vector3(x, y, 0.5).unproject(camera)
  const direction = vector.sub(camera.position).normalize()
  const distance = -camera.position.z / direction.z
  return camera.position.clone().add(direction.multiplyScalar(distance))
}

function handlePointerDown(event) {
  if (isCoarsePointer) return

  pointerId = event.pointerId
  isDragging = true
  renderer.domElement.setPointerCapture(pointerId)
  const point = pointerToWorld(event)
  targetX = THREE.MathUtils.clamp(point.x, -2.1, 2.1)
  targetY = THREE.MathUtils.clamp(point.y - 0.2, -1.85, 1.2)
}

function handlePointerMove(event) {
  if (!isDragging || event.pointerId !== pointerId) return

  const point = pointerToWorld(event)
  targetX = THREE.MathUtils.clamp(point.x, -2.1, 2.1)
  targetY = THREE.MathUtils.clamp(point.y - 0.2, -1.85, 1.2)
}

function handlePointerUp(event) {
  if (event.pointerId !== pointerId) return

  isDragging = false
  renderer.domElement.releasePointerCapture(pointerId)
  pointerId = null
  targetX = 0
  targetY = -0.65
}

function updateLanyard() {
  const top = new THREE.Vector3(
    badge.position.x,
    badge.position.y + 1.58,
    badge.position.z,
  )
  const middleA = new THREE.Vector3(anchor.x - 0.28, 2.35, 0.08)
  const middleB = new THREE.Vector3((anchor.x + top.x) * 0.45, 1.78, 0.12)
  const curve = new THREE.CatmullRomCurve3([anchor, middleA, middleB, top])
  const points = curve.getPoints(28)
  lanyard.geometry.dispose()
  lanyard.geometry = new THREE.BufferGeometry().setFromPoints(points)
}

function animate() {
  const elapsed = (performance.now() - startedAt) / 1000
  const spring = isDragging ? 0.35 : 0.08
  const damping = isDragging ? 0.68 : 0.9
  const idleX = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.8) * 0.13
  const idleY = prefersReducedMotion ? -0.65 : -0.65 + Math.sin(elapsed * 1.15) * 0.08
  const desiredX = isDragging ? targetX : idleX
  const desiredY = isDragging ? targetY : idleY

  velocityX = (velocityX + (desiredX - currentX) * spring) * damping
  velocityY = (velocityY + (desiredY - currentY) * spring) * damping
  currentX += velocityX
  currentY += velocityY

  badge.position.set(currentX, currentY, 0)
  badge.rotation.z = THREE.MathUtils.clamp(-velocityX * 0.28 + currentX * -0.13, -0.34, 0.34)
  badge.rotation.x = THREE.MathUtils.clamp(velocityY * 0.12, -0.18, 0.18)
  badge.rotation.y = THREE.MathUtils.clamp(currentX * 0.14, -0.25, 0.25)

  updateLanyard()
  renderer.render(scene, camera)
  animationFrame = window.requestAnimationFrame(animate)
}

onMounted(setupScene)

onBeforeUnmount(() => {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
  }

  resizeObserver?.disconnect()

  if (renderer?.domElement) {
    renderer.domElement.removeEventListener('pointerdown', handlePointerDown)
    renderer.domElement.removeEventListener('pointermove', handlePointerMove)
    renderer.domElement.removeEventListener('pointerup', handlePointerUp)
    renderer.domElement.removeEventListener('pointercancel', handlePointerUp)
    renderer.domElement.remove()
  }

  texture?.dispose()
  lanyard?.geometry.dispose()
  lanyard?.material.dispose()

  if (badge) {
    badge.geometry.dispose()
    badge.material.forEach((material) => material.dispose())
  }

  renderer?.dispose()
})
</script>
