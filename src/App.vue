<template>
  <div
    class="swiss-noise"
    :aria-busy="showLoader"
    @click="handleImageClick"
  >
    <Transition name="loader-fade">
      <div
        v-if="showLoader"
        class="loading-screen"
        role="status"
        aria-live="polite"
      >
        <div class="loading-mark" aria-hidden="true">
          PHT<span>.</span>
        </div>
        <div class="loading-copy">
          Business Analyst Portfolio
        </div>
        <div class="loading-track" aria-hidden="true">
          <div class="loading-bar"></div>
        </div>
      </div>
    </Transition>

    <NavBar />

    <main>
      <HeroSection />
      <AboutSection id="about" />
      <ExperienceSection id="experience" />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>

    <FooterSection />

    <Transition name="image-lightbox-fade">
      <div
        v-if="activeImage"
        class="image-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="activeImage.alt ? `Phóng to ảnh: ${activeImage.alt}` : 'Phóng to ảnh'"
        @click.self="closeImage"
      >
        <button
          type="button"
          class="image-lightbox-close"
          aria-label="Đóng ảnh phóng to"
          @click="closeImage"
        >
          ×
        </button>

        <figure class="image-lightbox-panel">
          <img
            class="image-lightbox-image"
            :src="activeImage.src"
            :alt="activeImage.alt"
          >
          <figcaption
            v-if="activeImage.alt"
            class="image-lightbox-caption"
          >
            {{ activeImage.alt }}
          </figcaption>
        </figure>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation.js'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'

const showLoader = ref(true)
const activeImage = ref(null)
const minLoadingMs = 1200

function openImage(image) {
  activeImage.value = {
    src: image.currentSrc || image.src,
    alt: image.alt || '',
  }

  document.body.classList.add('lightbox-open')
}

function closeImage() {
  activeImage.value = null
  document.body.classList.remove('lightbox-open')
}

function handleImageClick(event) {
  if (!(event.target instanceof Element)) {
    return
  }

  const image = event.target.closest('img')

  if (!image || image.closest('.image-lightbox') || image.dataset.lightbox === 'off') {
    return
  }

  event.preventDefault()
  openImage(image)
}

function handleKeydown(event) {
  if (event.key === 'Escape' && activeImage.value) {
    closeImage()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)

  const startedAt = window.performance.now()

  function hideLoader() {
    const elapsed = window.performance.now() - startedAt
    const remaining = Math.max(0, minLoadingMs - elapsed)

    window.setTimeout(() => {
      showLoader.value = false
    }, remaining)
  }

  if (document.readyState === 'complete') {
    hideLoader()
  } else {
    window.addEventListener('load', hideLoader, { once: true })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('lightbox-open')
})

useScrollAnimation()
</script>
