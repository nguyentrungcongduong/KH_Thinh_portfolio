<template>
  <div class="firework-widget">
    <Transition name="firework-toast">
      <div
        v-if="showToast"
        class="firework-toast"
        role="status"
        aria-live="polite"
      >
        Hãy tặng anh ấy 1 pháo hoa cho sự nỗ lực của anh ấy
      </div>
    </Transition>

    <button
      type="button"
      class="firework-button"
      aria-label="Tặng pháo hoa"
      title="Tặng pháo hoa"
      @click="launchFireworks"
    >
      <span class="firework-button__spark" aria-hidden="true">✦</span>
      <span class="firework-button__burst" aria-hidden="true">✹</span>
    </button>
  </div>

  <canvas
    ref="canvas"
    class="firework-canvas"
    aria-hidden="true"
  ></canvas>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)
const showToast = ref(false)
const particles = []
const colors = ['#C84A2F', '#FAFAF7', '#FFD166', '#EF476F', '#7FDBCA']

let animationFrame = null
let toastTimeout = null
let resizeCleanup = null

function resizeCanvas() {
  const element = canvas.value
  if (!element) return

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  element.width = Math.floor(window.innerWidth * pixelRatio)
  element.height = Math.floor(window.innerHeight * pixelRatio)
  element.style.width = `${window.innerWidth}px`
  element.style.height = `${window.innerHeight}px`

  const context = element.getContext('2d')
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
}

function createBurst(x, y, count = 54) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.18
    const speed = 2.1 + Math.random() * 4.1

    particles.push({
      x,
      y,
      lastX: x,
      lastY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2.8 + Math.random() * 4.4,
      alpha: 1,
      decay: 0.009 + Math.random() * 0.012,
      gravity: 0.035 + Math.random() * 0.035,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }
}

function draw() {
  const element = canvas.value
  if (!element) return

  const context = element.getContext('2d')
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  context.globalCompositeOperation = 'source-over'

  for (let index = particles.length - 1; index >= 0; index -= 1) {
    const particle = particles[index]
    particle.lastX = particle.x
    particle.lastY = particle.y
    particle.x += particle.vx
    particle.y += particle.vy
    particle.vy += particle.gravity
    particle.vx *= 0.988
    particle.vy *= 0.988
    particle.alpha -= particle.decay

    if (particle.alpha <= 0) {
      particles.splice(index, 1)
      continue
    }

    context.globalAlpha = particle.alpha
    context.strokeStyle = particle.color
    context.lineWidth = Math.max(1, particle.size * 0.55)
    context.shadowColor = particle.color
    context.shadowBlur = 16
    context.beginPath()
    context.moveTo(particle.lastX, particle.lastY)
    context.lineTo(particle.x, particle.y)
    context.stroke()

    context.fillStyle = particle.color
    context.beginPath()
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    context.fill()
  }

  context.globalAlpha = 1
  context.shadowBlur = 0
  context.globalCompositeOperation = 'source-over'

  if (particles.length) {
    animationFrame = window.requestAnimationFrame(draw)
  } else {
    animationFrame = null
  }
}

function startAnimation() {
  if (!animationFrame) {
    animationFrame = window.requestAnimationFrame(draw)
  }
}

function launchFireworks() {
  resizeCanvas()
  showToast.value = true

  window.clearTimeout(toastTimeout)
  toastTimeout = window.setTimeout(() => {
    showToast.value = false
  }, 3200)

  const bursts = [
    [window.innerWidth * 0.68, window.innerHeight * 0.3, 76],
    [window.innerWidth * 0.45, window.innerHeight * 0.42, 70],
    [window.innerWidth * 0.78, window.innerHeight * 0.52, 72],
    [window.innerWidth * 0.58, window.innerHeight * 0.62, 58],
  ]

  bursts.forEach(([x, y, count], index) => {
    window.setTimeout(() => {
      createBurst(x, y, count)
      startAnimation()
    }, index * 170)
  })
}

if (typeof window !== 'undefined') {
  resizeCleanup = () => resizeCanvas()
  window.addEventListener('resize', resizeCleanup)
}

onBeforeUnmount(() => {
  window.clearTimeout(toastTimeout)

  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
  }

  if (resizeCleanup) {
    window.removeEventListener('resize', resizeCleanup)
  }
})
</script>
