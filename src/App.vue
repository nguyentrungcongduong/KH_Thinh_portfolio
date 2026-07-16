<template>
  <div class="swiss-noise" :aria-busy="showLoader">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
const minLoadingMs = 1200

onMounted(() => {
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

useScrollAnimation()
</script>
