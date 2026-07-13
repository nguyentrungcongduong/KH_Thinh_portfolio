<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-swiss-bg/95 backdrop-blur border-b-2 border-swiss-fg transition-transform duration-200 ease-out"
    :class="{ '-translate-y-full': isHidden && !menuOpen }"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo / Name -->
        <a
          href="#"
          class="font-extrabold text-lg md:text-xl hover:text-swiss-accent transition-colors duration-200"
        >
          PHT<span class="text-swiss-accent">.</span>
        </a>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="group relative text-sm font-semibold py-2 overflow-hidden inline-block"
            >
              <span
                class="block transition-transform duration-200 ease-out group-hover:-translate-y-full"
              >
                {{ link.label }}
              </span>
              <span
                class="absolute left-0 top-full text-swiss-accent transition-transform duration-200 ease-out group-hover:-translate-y-full"
                aria-hidden="true"
              >
                {{ link.label }}
              </span>
            </a>
          </li>
          <li>
            <a
              :href="personalInfo.links.cvPdf"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-swiss-fg text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-swiss-accent transition-colors duration-200"
            >
              Tải CV
            </a>
          </li>
        </ul>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          @click="menuOpen = !menuOpen"
          :aria-label="menuOpen ? 'Đóng menu' : 'Mở menu'"
          :aria-expanded="menuOpen"
        >
          <span
            class="w-6 h-0.5 bg-swiss-fg transition-all duration-200 ease-out origin-center"
            :class="{ 'rotate-45 translate-y-[4px]': menuOpen }"
          ></span>
          <span
            class="w-6 h-0.5 bg-swiss-fg transition-all duration-200 ease-out"
            :class="{ 'opacity-0': menuOpen }"
          ></span>
          <span
            class="w-6 h-0.5 bg-swiss-fg transition-all duration-200 ease-out origin-center"
            :class="{ '-rotate-45 -translate-y-[4px]': menuOpen }"
          ></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      class="md:hidden border-t-2 border-swiss-fg bg-swiss-bg overflow-hidden transition-all duration-200 ease-out"
      :class="menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
    >
      <ul class="px-6 py-4 space-y-1">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="block py-3 text-sm font-semibold border-b border-gray-200 hover:text-swiss-accent hover:pl-2 transition-all duration-200"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </a>
        </li>
        <li class="pt-2">
          <a
            :href="personalInfo.links.cvPdf"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-swiss-fg text-white text-center py-3 text-sm font-semibold rounded-md hover:bg-swiss-accent transition-colors duration-200"
          >
            Tải CV PDF
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { personalInfo } from '@/data/portfolio.js'

const menuOpen = ref(false)
const isHidden = ref(false)
let lastScrollY = 0

const navLinks = [
  { label: 'Về tôi', href: '#about' },
  { label: 'Dự án', href: '#experience' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Học vấn', href: '#education' },
  { label: 'Liên hệ', href: '#contact' },
]

function handleScroll() {
  const currentY = window.scrollY
  isHidden.value = currentY > lastScrollY && currentY > 100
  lastScrollY = currentY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
