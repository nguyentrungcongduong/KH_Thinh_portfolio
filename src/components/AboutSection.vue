<template>
  <section class="relative bg-swiss-muted font-inter overflow-hidden">
    <!-- Swiss Dots Pattern Background -->
    <div class="absolute inset-0 swiss-dots opacity-30 pointer-events-none"></div>

    <div class="relative z-10 px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-32 max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="mb-12 md:mb-16" data-animate="fade-up">
        <span class="section-label block mb-3">
          02. About
        </span>
        <h2 class="section-title text-display-sm md:text-display-md text-swiss-fg">
          Về tôi
        </h2>
      </div>

      <!-- Asymmetric Layout 5:7 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
        
        <!-- LEFT — Portrait + Address (5 cols) -->
        <div class="col-span-1 lg:col-span-5" data-animate="slide-left">
          
          <!-- Portrait -->
          <div class="relative aspect-[326/366] w-full max-w-[360px] bg-white border-2 border-swiss-fg overflow-hidden mb-8 rounded-md">
            <img
              src="/avatar.png"
              alt="Phan Hùng Thịnh"
              class="h-full w-full object-contain"
            />
            <div class="absolute left-0 top-0 h-14 w-14 bg-swiss-accent/90 rounded-br-md"></div>
            <div class="absolute bottom-0 right-0 h-14 w-14 bg-swiss-fg/90 rounded-tl-md"></div>
          </div>

          <!-- Address Info -->
          <div class="space-y-3" data-animate="fade-up">
            <div class="flex items-start gap-3">
              <span class="eyebrow w-20 flex-shrink-0 pt-0.5">
                Địa chỉ
              </span>
              <span class="text-sm md:text-base text-swiss-fg">
                {{ personalInfo.address }}
              </span>
            </div>
            <div class="flex items-start gap-3">
              <span class="eyebrow w-20 flex-shrink-0 pt-0.5">
                EMAIL
              </span>
              <a
                :href="'mailto:' + personalInfo.email"
                class="text-sm md:text-base text-swiss-fg underline underline-offset-4 transition-colors duration-200 ease-out hover:text-swiss-accent"
              >
                {{ personalInfo.email }}
              </a>
            </div>
            <div class="flex items-start gap-3">
              <span class="eyebrow w-20 flex-shrink-0 pt-0.5">
                PHONE
              </span>
              <span class="text-sm md:text-base text-swiss-fg">
                {{ personalInfo.phone }}
              </span>
            </div>
          </div>
        </div>

        <!-- RIGHT — Summary + Goals + Interests (7 cols) -->
        <div class="col-span-1 lg:col-span-7">
          
          <!-- Summary -->
          <div class="mb-10 md:mb-14" data-animate="fade-up">
            <p class="text-lg md:text-xl leading-8 text-swiss-fg/80">
              {{ personalInfo.summary }}
            </p>
          </div>

          <!-- Career Goals -->
          <div class="mb-10 md:mb-14" data-animate="fade-up">
            <h3 class="eyebrow mb-6">
              Mục tiêu nghề nghiệp
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <!-- Short-term -->
              <div class="border-2 border-swiss-fg p-6 bg-white transition-colors duration-200 ease-out hover:bg-swiss-fg hover:text-white group rounded-md">
                <span class="block text-swiss-accent font-bold text-xs mb-3 transition-colors duration-200 ease-out group-hover:text-swiss-accent">
                  Ngắn hạn
                </span>
                <p class="text-sm md:text-base leading-relaxed transition-colors duration-200 ease-out">
                  {{ personalInfo.goals.shortTerm }}
                </p>
              </div>
              <!-- Long-term -->
              <div class="border-2 border-swiss-fg p-6 bg-white transition-colors duration-200 ease-out hover:bg-swiss-fg hover:text-white group rounded-md">
                <span class="block text-swiss-accent font-bold text-xs mb-3 transition-colors duration-200 ease-out group-hover:text-swiss-accent">
                  Dài hạn
                </span>
                <p class="text-sm md:text-base leading-relaxed transition-colors duration-200 ease-out">
                  {{ personalInfo.goals.longTerm }}
                </p>
              </div>
            </div>
          </div>

          <!-- Interests -->
          <div data-animate="fade-up">
            <h3 class="eyebrow mb-6">
              Sở thích
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="(interest, index) in personalInfo.interests"
                :key="index"
                class="inline-block border border-swiss-fg px-4 py-2 text-sm font-medium text-swiss-fg rounded-md transition-colors duration-200 ease-out hover:bg-swiss-fg hover:text-white cursor-default"
              >
                {{ interest }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { personalInfo } from '@/data/portfolio.js'
</script>
