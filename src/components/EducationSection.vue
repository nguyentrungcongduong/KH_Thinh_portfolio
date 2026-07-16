<script setup>
import { education, certifications, languages } from '@/data/portfolio.js'

function isValidLink(link) {
  return typeof link === 'string' && link.trim() !== '' && link !== '#'
}
</script>

<template>
  <section id="education" class="relative bg-swiss-muted swiss-grid-pattern">
    <!-- Top border separator -->
    <div class="border-t-2 border-swiss-fg"></div>

    <div class="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <!-- Section header -->
      <div data-animate class="mb-12 md:mb-16">
        <p class="section-label">05. Education</p>
        <h2 class="text-display-sm md:text-display-md section-title">Học vấn</h2>
      </div>

      <!-- Education block — Asymmetric 7:5 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-20">
        <!-- Left: School info (7 cols) -->
        <div class="lg:col-span-7" data-animate data-animate-delay="1">
          <p class="text-sm text-gray-500 mb-4">
            {{ education.period }}
          </p>
          <h3 class="text-2xl md:text-3xl font-bold leading-snug mb-3">
            {{ education.school }}
          </h3>
          <p class="text-xl font-medium text-gray-700">
            {{ education.major }}
          </p>
          <p class="text-sm text-gray-500 mt-2">
            {{ education.degree }}
          </p>
        </div>

        <!-- Right: GPA highlight (5 cols) -->
        <div
          class="lg:col-span-5 flex flex-col justify-center lg:items-end"
          data-animate="slide-right"
          data-animate-delay="2"
        >
          <p class="text-xs font-semibold text-gray-500 mb-2">
            GPA
          </p>
          <p class="text-swiss-accent text-6xl md:text-7xl font-extrabold leading-none">
            {{ education.gpa.split('/')[0].trim() }}
          </p>
          <p class="text-lg font-bold text-gray-400 mt-1">
            / {{ education.gpa.split('/')[1].trim() }}
          </p>
        </div>
      </div>

      <!-- Certifications -->
      <div class="mb-16 md:mb-20">
        <p
          class="section-label mb-8"
          data-animate
          data-animate-delay="1"
        >
          Chứng chỉ
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div
            v-for="(cert, index) in certifications"
            :key="cert.name"
            data-animate
            :data-animate-delay="index + 2"
            class="border-2 border-swiss-fg bg-white -mt-[2px] md:-mt-0 md:-ml-[2px] first:mt-0 first:ml-0 rounded-md overflow-hidden"
          >
            <div
              v-if="cert.image"
              class="h-44 md:h-48 border-b-2 border-swiss-fg bg-swiss-muted flex items-center justify-center p-4"
            >
              <img
                :src="cert.image"
                :alt="cert.name"
                class="max-h-full max-w-full object-contain"
                loading="lazy"
              >
            </div>

            <div class="p-6 md:p-8">
              <p class="font-bold text-lg leading-snug">
                {{ cert.name }}
              </p>
              <div class="flex flex-wrap items-center gap-3 mt-3">
                <p class="text-sm text-gray-600">{{ cert.issuer }}</p>
                <span class="w-1 h-1 bg-swiss-accent inline-block flex-shrink-0"></span>
                <p class="text-sm text-gray-500">{{ cert.date }}</p>
              </div>

              <a
                v-if="isValidLink(cert.url)"
                :href="cert.url"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-6 inline-flex items-center gap-2 border-2 border-swiss-fg px-4 py-2 text-sm font-semibold bg-white text-swiss-fg rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 ease-out"
              >
                Xem chứng chỉ
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  aria-hidden="true"
                >
                  <path d="M18 13v6H5V6h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div>
        <p
          class="section-label mb-8"
          data-animate
          data-animate-delay="1"
        >
          Ngôn ngữ
        </p>

        <div class="space-y-4">
          <div
            v-for="(lang, index) in languages"
            :key="lang.name"
            data-animate
            :data-animate-delay="index + 2"
            class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
          >
            <p class="font-bold text-lg min-w-[140px]">
              {{ lang.name }}
            </p>
            <span class="hidden sm:inline-block text-gray-300">—</span>
            <p class="text-base text-gray-600">{{ lang.level }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
