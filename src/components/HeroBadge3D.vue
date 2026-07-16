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
let lanyards = []
let strapGroup
let hookGroup
let anchor
let animationFrame
let resizeObserver
let texture
let strapTexture
let pointerId = null
let isDragging = false
let targetX = 0
let targetY = -0.9
let velocityX = 0
let velocityY = 0
let currentX = 0
let currentY = -0.9
let lastX = 0
let lastY = -0.9
let startedAt = 0

const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function createBadgeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 1200
  const context = canvas.getContext('2d')

  context.fillStyle = '#050606'
  context.fillRect(0, 0, canvas.width, canvas.height)

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, 'rgba(255,255,255,0.08)')
  gradient.addColorStop(0.45, 'rgba(255,255,255,0.015)')
  gradient.addColorStop(1, 'rgba(200,74,47,0.045)')
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'rgba(250,250,247,0.72)'
  context.font = '700 20px "Open Sans", Arial, sans-serif'
  context.fillText('24/KW/29 BA', 58, 72)
  context.fillText('UTH  HCMC CITY', 610, 72)

  context.fillStyle = '#FAFAF7'
  context.font = '900 178px "Montserrat", "Open Sans", Arial, sans-serif'
  context.fillText('B', 355, 315)
  context.fillRect(365, 410, 42, 128)
  context.fillRect(503, 410, 42, 128)
  context.fillRect(418, 485, 75, 34)
  context.font = '900 218px "Montserrat", "Open Sans", Arial, sans-serif'
  context.fillText('A', 548, 642)

  context.fillStyle = '#C84A2F'
  context.beginPath()
  context.moveTo(65, 455)
  context.lineTo(98, 398)
  context.lineTo(130, 455)
  context.closePath()
  context.fill()

  context.fillStyle = '#FAFAF7'
  context.beginPath()
  context.arc(112, 500, 9, 0, Math.PI * 2)
  context.fill()

  context.font = '800 50px "Open Sans", Arial, sans-serif'
  wrapText(context, personalInfo.name, 70, 720, 520, 58)

  context.fillStyle = 'rgba(250,250,247,0.62)'
  context.font = '700 22px "Open Sans", Arial, sans-serif'
  context.fillText('BUSINESS ANALYST INTERN', 72, 850)

  context.fillStyle = 'rgba(250,250,247,0.52)'
  context.font = '700 19px "Open Sans", Arial, sans-serif'
  context.fillText('PROCESS / BPMN', 72, 1050)
  context.fillText('SRS / GAP ANALYSIS', 72, 1084)

  context.fillStyle = '#FAFAF7'
  context.fillRect(670, 1068, 96, 18)

  return new THREE.CanvasTexture(canvas)
}

function createStrapTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 220
  canvas.height = 900
  const context = canvas.getContext('2d')

  context.fillStyle = '#050606'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(255,255,255,0.08)'
  context.fillRect(8, 0, 16, canvas.height)
  context.fillRect(canvas.width - 24, 0, 12, canvas.height)

  context.save()
  context.translate(152, 180)
  context.rotate(-Math.PI / 2)
  context.fillStyle = '#FAFAF7'
  context.font = '800 64px "Montserrat", "Open Sans", Arial, sans-serif'
  context.fillText('PHT.', 0, 0)
  context.restore()

  context.strokeStyle = 'rgba(250,250,247,0.86)'
  context.lineWidth = 10
  ;[330, 485].forEach((y) => {
    context.beginPath()
    context.arc(110, y, 28, 0, Math.PI * 2)
    context.stroke()
  })

  context.fillStyle = '#FAFAF7'
  context.font = '800 34px "Open Sans", Arial, sans-serif'
  context.strokeStyle = '#FAFAF7'
  context.lineWidth = 7
  context.strokeRect(82, 610, 56, 56)
  context.fillText('24', 88, 651)

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
  camera.position.set(0, 0, 11.4)

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

  anchor = new THREE.Vector3(0, 2.55, 0.12)
  texture = createBadgeTexture()
  texture.colorSpace = THREE.SRGBColorSpace
  strapTexture = createStrapTexture()
  strapTexture.colorSpace = THREE.SRGBColorSpace

  const badgeGeometry = new THREE.BoxGeometry(1.9, 2.55, 0.1, 4, 4, 1)
  const badgeMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x080909, roughness: 0.48, metalness: 0.16 }),
    new THREE.MeshStandardMaterial({ color: 0x080909, roughness: 0.48, metalness: 0.16 }),
    new THREE.MeshStandardMaterial({ color: 0x080909, roughness: 0.56, metalness: 0.12 }),
    new THREE.MeshStandardMaterial({ color: 0x080909, roughness: 0.56, metalness: 0.12 }),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0.08 }),
    new THREE.MeshStandardMaterial({ color: 0x050606, roughness: 0.56, metalness: 0.12 }),
  ]

  badge = new THREE.Mesh(badgeGeometry, badgeMaterials)
  badge.position.set(currentX, currentY, 0)
  badge.castShadow = false
  scene.add(badge)

  const clipGeometry = new THREE.TorusGeometry(0.18, 0.032, 12, 48)
  const clipMaterial = new THREE.MeshStandardMaterial({
    color: 0x050606,
    roughness: 0.28,
    metalness: 0.7,
  })
  const clip = new THREE.Mesh(clipGeometry, clipMaterial)
  clip.position.set(0, 1.34, 0.11)
  clip.rotation.x = Math.PI / 2
  badge.add(clip)

  strapGroup = new THREE.Group()
  const strapMaterial = new THREE.MeshStandardMaterial({
    map: strapTexture,
    roughness: 0.5,
    metalness: 0.18,
  })
  const strap = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 2.55, 0.055, 1, 12, 1),
    strapMaterial,
  )
  strap.position.set(0, 1.38, 0.04)
  strapGroup.add(strap)

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b1c1c,
    roughness: 0.24,
    metalness: 0.82,
  })
  const strapBottomRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 14, 48), metalMaterial)
  strapBottomRing.position.set(0, 0.03, 0.08)
  strapBottomRing.rotation.x = Math.PI / 2
  strapGroup.add(strapBottomRing)
  scene.add(strapGroup)

  hookGroup = new THREE.Group()
  const swivel = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.026, 14, 48), metalMaterial)
  swivel.position.set(0, 0.2, 0.1)
  swivel.rotation.x = Math.PI / 2
  hookGroup.add(swivel)

  const hookStem = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.3, 8, 16), metalMaterial)
  hookStem.position.set(0, -0.05, 0.1)
  hookStem.rotation.z = 0.08
  hookGroup.add(hookStem)
  scene.add(hookGroup)

  const connectorMaterial = new THREE.MeshStandardMaterial({
    color: 0x111313,
    roughness: 0.3,
    metalness: 0.68,
  })
  lanyards = [
    new THREE.Mesh(new THREE.BufferGeometry(), connectorMaterial),
  ]
  lanyards.forEach((connector) => scene.add(connector))

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
  targetY = THREE.MathUtils.clamp(point.y - 0.34, -1.9, -0.25)
}

function handlePointerMove(event) {
  if (!isDragging || event.pointerId !== pointerId) return

  const point = pointerToWorld(event)
  targetX = THREE.MathUtils.clamp(point.x, -2.1, 2.1)
  targetY = THREE.MathUtils.clamp(point.y - 0.34, -1.9, -0.25)
}

function handlePointerUp(event) {
  if (event.pointerId !== pointerId) return

  isDragging = false
  renderer.domElement.releasePointerCapture(pointerId)
  pointerId = null
  targetX = 0
  targetY = -0.9
}

function updateLanyard() {
  const swing = badge.rotation.z
  const top = new THREE.Vector3(0, 1.34, 0.13).applyEuler(badge.rotation).add(badge.position)
  const strapEnd = new THREE.Vector3(anchor.x, 0.03, anchor.z)
  const sway = currentX * 0.1 + velocityX * 0.25
  const middle = new THREE.Vector3((top.x + strapEnd.x) * 0.5 + sway, top.y + 0.22, 0.18)
  const curve = new THREE.CatmullRomCurve3([strapEnd, middle, top])
  const geometry = new THREE.TubeGeometry(curve, 28, 0.035, 8, false)

  lanyards[0].geometry.dispose()
  lanyards[0].geometry = geometry

  hookGroup.position.set((top.x + strapEnd.x) * 0.5, (top.y + strapEnd.y) * 0.5 + 0.06, 0.02)
  hookGroup.rotation.z = swing * 0.55 + currentX * -0.04
  strapGroup.rotation.z = currentX * -0.018
}

function animate() {
  const elapsed = (performance.now() - startedAt) / 1000
  const spring = isDragging ? 0.25 : 0.045
  const damping = isDragging ? 0.62 : 0.84
  const idleX = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.58) * 0.16 + Math.sin(elapsed * 1.1) * 0.035
  const idleY = prefersReducedMotion ? -0.9 : -0.94 + Math.sin(elapsed * 0.9) * 0.045
  const desiredX = isDragging ? targetX : idleX
  const desiredY = isDragging ? targetY : idleY

  lastX = currentX
  lastY = currentY
  velocityX = (velocityX + (desiredX - currentX) * spring) * damping
  velocityY = (velocityY + (desiredY - currentY) * spring) * damping
  currentX += velocityX
  currentY += velocityY

  const frameX = currentX - lastX
  const frameY = currentY - lastY

  badge.position.set(currentX, currentY, 0)
  badge.rotation.z = THREE.MathUtils.clamp(-frameX * 5.8 + currentX * -0.1, -0.28, 0.28)
  badge.rotation.x = THREE.MathUtils.clamp(frameY * 2.4, -0.14, 0.14)
  badge.rotation.y = THREE.MathUtils.clamp(currentX * 0.11 + frameX * 1.8, -0.2, 0.2)

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
  strapTexture?.dispose()
  strapGroup?.traverse((node) => {
    node.geometry?.dispose()
    node.material?.dispose()
  })
  hookGroup?.traverse((node) => {
    node.geometry?.dispose()
    node.material?.dispose()
  })
  lanyards.forEach((connector) => {
    connector.geometry.dispose()
    connector.material.dispose()
  })

  if (badge) {
    badge.geometry.dispose()
    badge.material.forEach((material) => material.dispose())
  }

  renderer?.dispose()
})
</script>
