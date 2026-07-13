<script setup>
import { personalInfo } from '@/data/portfolio.js'
</script>

<template>
  <section id="contact" class="relative bg-white">
    <!-- Top border separator -->
    <div class="border-t-2 border-swiss-fg"></div>

    <div class="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <!-- Section header -->
      <div data-animate class="mb-12 md:mb-16">
        <p class="section-label">06. Contact</p>
        <h2 class="text-display-sm md:text-display-md section-title">Liên hệ</h2>
      </div>

      <!-- Asymmetric layout 5:7 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <!-- LEFT - CTA (5 cols) -->
        <div class="lg:col-span-5" data-animate="slide-left" data-animate-delay="1">
          <h3 class="text-3xl md:text-5xl font-extrabold leading-[1.08] mb-8">
            Hãy kết nối<br />với tôi
          </h3>

          <a
            :href="personalInfo.links.cvPdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-swiss-accent text-white px-7 py-3.5 font-semibold text-sm rounded-md hover:bg-swiss-fg transition-colors duration-200"
          >
            Tải CV PDF
          </a>
        </div>

        <!-- RIGHT - Contact details (7 cols) -->
        <div class="lg:col-span-7">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            <!-- Phone -->
            <div data-animate data-animate-delay="2">
              <p class="eyebrow text-gray-500 mb-2">
                Điện thoại
              </p>
              <p class="text-lg font-semibold">
                {{ personalInfo.phone }}
              </p>
            </div>

            <!-- Email -->
            <div data-animate data-animate-delay="3">
              <p class="eyebrow text-gray-500 mb-2">
                EMAIL
              </p>
              <a
                :href="`mailto:${personalInfo.email}`"
                class="text-lg font-semibold hover:text-swiss-accent transition-colors duration-200"
              >
                {{ personalInfo.email }}
              </a>
            </div>

            <!-- Address -->
            <div data-animate data-animate-delay="4" class="sm:col-span-2">
              <p class="eyebrow text-gray-500 mb-2">
                Địa chỉ
              </p>
              <p class="text-lg font-semibold">
                {{ personalInfo.address }}
              </p>
            </div>
          </div>

          <!-- Social links -->
          <div class="flex flex-wrap gap-4 mt-10 md:mt-12" data-animate data-animate-delay="5">
            <a
              :href="personalInfo.links.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="border-2 border-swiss-fg px-6 py-3 font-semibold text-sm rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 inline-block"
            >
              LinkedIn
            </a>
            <a
              :href="personalInfo.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="border-2 border-swiss-fg px-6 py-3 font-semibold text-sm rounded-md hover:bg-swiss-fg hover:text-white transition-colors duration-200 inline-block"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
