<template>
  <div class="swiss-noise">
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
import { useScrollAnimation } from '@/composables/useScrollAnimation.js'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'

useScrollAnimation()
</script>
