<script setup>
import { skills } from '@/data/portfolio.js'

const baSkills = skills.baSkills
const tools = skills.tools
</script>

<template>
  <section id="skills" class="relative bg-white swiss-grid-pattern">
    <!-- Top border separator -->
    <div class="border-t-2 border-swiss-fg"></div>

    <div class="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <!-- Section header -->
      <div data-animate class="mb-12 md:mb-16">
        <p class="section-label">04. Skills</p>
        <h2 class="text-display-sm md:text-display-md section-title">Kỹ năng</h2>
      </div>

      <!-- Two-column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <!-- LEFT COLUMN — BA Skills -->
        <div class="lg:border-r-2 lg:border-swiss-fg lg:pr-10 pb-12 lg:pb-0">
          <h3
            data-animate
            data-animate-delay="1"
            class="text-2xl font-bold mb-6"
          >
            Nghiệp vụ BA
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div
              v-for="(skill, index) in baSkills"
              :key="skill.name"
              data-animate
              :data-animate-delay="index + 1"
              class="group border-2 border-swiss-fg p-6 -mt-[2px] -ml-[2px] hover:bg-swiss-fg hover:text-white transition-colors duration-200 cursor-default"
            >
              <p class="font-bold text-lg">
                {{ skill.name }}
              </p>
              <p class="text-sm text-gray-600 mt-1 group-hover:text-gray-300 transition-colors duration-200">
                {{ skill.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN — Tools & Technologies -->
        <div class="lg:pl-10 pt-12 lg:pt-0">
          <h3
            data-animate
            data-animate-delay="1"
            class="text-2xl font-bold mb-6"
          >
            Công cụ &amp; nền tảng
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-0">
            <div
              v-for="(tool, index) in tools"
              :key="tool.name"
              data-animate
              :data-animate-delay="(index % 6) + 1"
              class="group border-2 border-swiss-fg p-4 -mt-[2px] -ml-[2px] hover:bg-swiss-accent hover:text-white transition-colors duration-200 cursor-default"
            >
              <p class="font-bold text-sm">
                {{ tool.name }}
              </p>
              <p class="text-xs text-swiss-accent mt-2 group-hover:text-white transition-colors duration-200">
                {{ tool.category }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
