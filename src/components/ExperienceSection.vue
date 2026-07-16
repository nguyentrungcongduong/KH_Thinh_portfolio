<script setup>
import { ref } from 'vue'
import { projects } from '@/data/portfolio.js'

const expandedCards = ref({})
const activeImageIndexes = ref({})

function toggleCard(id) {
  expandedCards.value[id] = !expandedCards.value[id]
}

function isExpanded(id) {
  return !!expandedCards.value[id]
}

function formatIndex(i) {
  return String(i + 1).padStart(2, '0')
}

function briefDescription(text) {
  const firstSentence = text.split(/[.?!]/)[0]
  return firstSentence + '.'
}

function isValidLink(link) {
  return typeof link === 'string' && link.trim() !== '' && link !== '#'
}

function hasProjectLinks(project) {
  return project.links && Object.values(project.links).some(isValidLink)
}

function projectImages(project) {
  return Array.isArray(project.images) ? project.images : []
}

function currentImageIndex(project) {
  const images = projectImages(project)

  if (!images.length) {
    return 0
  }

  const index = activeImageIndexes.value[project.id] ?? 0
  return ((index % images.length) + images.length) % images.length
}

function currentProjectImage(project) {
  return projectImages(project)[currentImageIndex(project)]
}

function showPreviousImage(project) {
  const images = projectImages(project)

  if (images.length < 2) {
    return
  }

  activeImageIndexes.value[project.id] = currentImageIndex(project) - 1
}

function showNextImage(project) {
  const images = projectImages(project)

  if (images.length < 2) {
    return
  }

  activeImageIndexes.value[project.id] = currentImageIndex(project) + 1
}
</script>

<template>
  <section class="relative py-16 md:py-24 swiss-diagonal overflow-hidden">
    <!-- Section Header -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
      <div class="border-t-2 border-swiss-fg pt-8">
        <span class="section-label">03. Experience</span>
        <h2 class="text-display-sm md:text-display-md section-title mt-2">
          Dự án
        </h2>
      </div>
    </div>

    <!-- Project Cards -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 space-y-8 md:space-y-12">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        class="border-2 border-swiss-fg bg-white relative rounded-md overflow-hidden"
        data-animate="fade-up"
        :data-animate-delay="index + 1"
      >
        <!-- Card Header - Clickable -->
        <div
          class="cursor-pointer transition-colors duration-200 ease-out"
          :class="isExpanded(project.id) ? 'bg-swiss-muted' : 'hover:bg-swiss-muted'"
          @click="toggleCard(project.id)"
        >
          <div class="p-6 md:p-8 lg:p-10">
            <div class="grid grid-cols-12 gap-4 md:gap-6 items-start">
              <!-- Project Number -->
              <div class="col-span-3 md:col-span-2">
                <span class="text-5xl md:text-7xl font-extrabold text-swiss-accent leading-none select-none">
                  {{ formatIndex(index) }}
                </span>
              </div>

              <!-- Project Info -->
              <div class="col-span-9 md:col-span-10">
                <span class="block text-sm text-swiss-fg/60 mb-2 font-medium">
                  {{ project.period }}
                </span>
                <h3 class="text-2xl md:text-3xl font-bold leading-snug mb-3">
                  {{ project.name }}
                </h3>
                <p
                  v-if="!isExpanded(project.id)"
                  class="text-base md:text-lg text-swiss-fg/70 leading-relaxed max-w-3xl"
                >
                  {{ briefDescription(project.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Expanded Content -->
        <div
          class="overflow-hidden transition-all duration-200 ease-out"
          :style="{
            maxHeight: isExpanded(project.id) ? '2800px' : '0px',
            opacity: isExpanded(project.id) ? 1 : 0
          }"
        >
          <div class="border-t-2 border-swiss-fg">
            <div class="p-6 md:p-8 lg:p-10">
              <!-- Asymmetric 2-column grid for content -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                <!-- Left Column - 7 cols -->
                <div class="lg:col-span-7 space-y-8">

                  <!-- Context -->
                  <div>
                    <h4 class="eyebrow mb-3">
                      Bối cảnh
                    </h4>
                    <div class="border-l-4 border-swiss-accent pl-6">
                      <p class="text-base md:text-lg leading-relaxed">
                        {{ project.context }}
                      </p>
                    </div>
                  </div>

                  <!-- Role -->
                  <div>
                    <h4 class="eyebrow mb-3">
                      Vai trò
                    </h4>
                    <p class="text-base md:text-lg leading-relaxed">
                      {{ project.role }}
                    </p>
                  </div>

                  <!-- Description -->
                  <div>
                    <h4 class="eyebrow mb-3">
                      Mô tả
                    </h4>
                    <p class="text-base md:text-lg leading-relaxed">
                      {{ project.description }}
                    </p>
                  </div>

                  <!-- Tools -->
                  <div>
                    <h4 class="eyebrow mb-3">
                      Công cụ
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tool in project.tools"
                        :key="tool"
                        class="inline-flex bg-swiss-fg text-white px-3 py-1.5 text-sm font-medium rounded-md"
                      >
                        {{ tool }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Right Column - 5 cols -->
                <div class="lg:col-span-5 space-y-8">

                  <!-- Results -->
                  <div>
                    <h4 class="eyebrow mb-3">
                      Kết quả
                    </h4>
                    <div class="bg-swiss-muted p-6 border-2 border-swiss-fg rounded-md">
                      <p class="text-base md:text-lg leading-relaxed font-medium">
                        {{ project.results }}
                      </p>
                    </div>
                  </div>

                  <!-- Lessons -->
                  <div>
                    <h4 class="eyebrow mb-3">
                      Bài học
                    </h4>
                    <p class="text-base md:text-lg leading-relaxed italic text-swiss-fg/80">
                      "{{ project.lessons }}"
                    </p>
                  </div>

                  <!-- Project Images -->
                  <div>
                    <h4 class="eyebrow mb-3">
                      Sơ đồ
                    </h4>
                    <div
                      v-if="projectImages(project).length"
                      class="border-2 border-swiss-fg bg-white rounded-md overflow-hidden"
                      role="region"
                      :aria-label="`Sơ đồ ${project.name}`"
                    >
                      <div class="relative bg-swiss-muted border-b-2 border-swiss-fg">
                        <img
                          :src="currentProjectImage(project).src"
                          :alt="currentProjectImage(project).alt"
                          class="w-full h-72 md:h-80 object-contain p-3"
                          loading="lazy"
                        >

                        <button
                          v-if="projectImages(project).length > 1"
                          type="button"
                          class="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border-2 border-swiss-fg bg-white text-swiss-fg rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 ease-out"
                          aria-label="Xem ảnh trước"
                          @click.stop="showPreviousImage(project)"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="square"
                            stroke-linejoin="miter"
                            aria-hidden="true"
                          >
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>

                        <button
                          v-if="projectImages(project).length > 1"
                          type="button"
                          class="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border-2 border-swiss-fg bg-white text-swiss-fg rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 ease-out"
                          aria-label="Xem ảnh tiếp theo"
                          @click.stop="showNextImage(project)"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="square"
                            stroke-linejoin="miter"
                            aria-hidden="true"
                          >
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </button>
                      </div>

                      <div class="flex items-center justify-between gap-4 px-4 py-3">
                        <p class="text-sm font-semibold text-swiss-fg/75">
                          {{ currentProjectImage(project).caption || currentProjectImage(project).alt }}
                        </p>
                        <p class="text-xs font-bold text-swiss-accent flex-shrink-0">
                          {{ currentImageIndex(project) + 1 }} / {{ projectImages(project).length }}
                        </p>
                      </div>
                    </div>

                    <div
                      v-else
                      class="grid grid-cols-2 gap-3"
                    >
                      <div
                        v-for="placeholder in 2"
                        :key="placeholder"
                        class="bg-swiss-muted border-2 border-swiss-fg aspect-video flex items-center justify-center rounded-md"
                      >
                        <span class="text-xs font-semibold text-swiss-fg/30 select-none">
                          Diagram
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Links -->
                  <div v-if="hasProjectLinks(project)">
                    <h4 class="eyebrow mb-3">
                      Liên kết
                    </h4>
                    <div class="flex flex-wrap gap-3">
                      <a
                        v-if="isValidLink(project.links.drive)"
                        :href="project.links.drive"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 border-2 border-swiss-fg px-4 py-2 text-sm font-semibold bg-white text-swiss-fg rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 ease-out"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.71 3.5L1.15 15l4.58 7.5h13.54l4.58-7.5L17.29 3.5H7.71zm.58 1h8.42l5.72 10h-5.13l-2.29-4-2.29 4H7.59L2.87 14.5l5.42-10z"/>
                        </svg>
                        Drive
                      </a>
                      <a
                        v-if="isValidLink(project.links.figma)"
                        :href="project.links.figma"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 border-2 border-swiss-fg px-4 py-2 text-sm font-semibold bg-white text-swiss-fg rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 ease-out"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 010 7H12V2zm0 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zm-7 0A3.5 3.5 0 018.5 11H12v3.5A3.5 3.5 0 015 14.5zM5 19a3.5 3.5 0 013.5-3.5H12V19a3.5 3.5 0 01-7 0z"/>
                        </svg>
                        Figma
                      </a>
                      <a
                        v-if="isValidLink(project.links.github)"
                        :href="project.links.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 border-2 border-swiss-fg px-4 py-2 text-sm font-semibold bg-white text-swiss-fg rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 ease-out"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.19-3.37-1.19-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.99c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0012 2z"/>
                        </svg>
                        GitHub
                      </a>
                      <a
                        v-if="isValidLink(project.links.demo)"
                        :href="project.links.demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 border-2 border-swiss-accent px-4 py-2 text-sm font-semibold bg-swiss-accent text-white rounded-md hover:bg-swiss-fg hover:border-swiss-fg transition-colors duration-200 ease-out"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square">
                          <path d="M18 13v6H5V6h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Expand/Collapse Toggle -->
        <div class="border-t-2 border-swiss-fg">
          <button
            class="w-full px-6 md:px-8 lg:px-10 py-4 text-left text-sm font-semibold text-swiss-accent hover:text-swiss-fg transition-colors duration-200 ease-out flex items-center gap-2"
            @click="toggleCard(project.id)"
          >
            <template v-if="!isExpanded(project.id)">
              Xem chi tiết
              <span class="text-lg leading-none">↓</span>
            </template>
            <template v-else>
              Thu gọn
              <span class="text-lg leading-none">↑</span>
            </template>
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
