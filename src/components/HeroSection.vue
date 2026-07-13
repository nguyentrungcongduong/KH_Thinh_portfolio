<template>
  <section class="relative min-h-screen bg-swiss-bg font-inter flex flex-col">
    <!-- Main Content Grid -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
      
      <!-- LEFT — Geometric Bauhaus Composition (7 cols) -->
      <div
        class="relative col-span-1 lg:col-span-7 border-b-2 lg:border-b-0 lg:border-r-2 border-swiss-fg overflow-hidden bg-swiss-fg min-h-[50vh] lg:min-h-full"
        data-animate="fade-in"
      >
        <!-- Swiss Grid Pattern Overlay -->
        <div class="absolute inset-0 swiss-grid-pattern opacity-10 z-10 pointer-events-none"></div>

        <!-- Large Red Circle — top left -->
        <div
          class="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full bg-swiss-accent -top-20 -left-20 md:-top-16 md:-left-16"
        ></div>

        <!-- White Circle — center right -->
        <div
          class="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] rounded-full border-4 border-white top-1/3 right-8 md:right-16 lg:right-12"
        ></div>

        <!-- Small filled white circle -->
        <div
          class="absolute w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full bg-white bottom-1/4 left-1/4"
        ></div>

        <!-- Horizontal Red Line -->
        <div
          class="absolute h-1 md:h-[6px] bg-swiss-accent left-0 right-0 top-[60%] md:top-[55%]"
        ></div>

        <!-- Vertical White Line -->
        <div
          class="absolute w-1 md:w-[6px] bg-white top-0 bottom-0 left-[40%]"
        ></div>

        <!-- White Rectangle — bottom left -->
        <div
          class="absolute w-[140px] h-[200px] md:w-[200px] md:h-[280px] border-4 border-white bottom-8 left-8 md:bottom-12 md:left-16"
        ></div>

        <!-- Red Rectangle — overlapping -->
        <div
          class="absolute w-[100px] h-[100px] md:w-[160px] md:h-[160px] bg-swiss-accent bottom-[10%] left-[25%] md:left-[30%] opacity-80"
        ></div>

        <!-- Small black circle on red -->
        <div
          class="absolute w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full bg-black top-[20%] right-[30%] md:right-[35%]"
        ></div>

        <!-- Diagonal line via rotated div -->
        <div
          class="absolute w-[400px] md:w-[600px] h-[3px] md:h-1 bg-white/40 top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rotate-[35deg]"
        ></div>

        <!-- Small outlined red circle -->
        <div
          class="absolute w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full border-4 border-swiss-accent top-12 right-1/4"
        ></div>

        <!-- Bottom-right accent square -->
        <div
          class="absolute w-[50px] h-[50px] md:w-[80px] md:h-[80px] bg-white bottom-8 right-8 md:bottom-16 md:right-20"
        ></div>

        <!-- Section number watermark -->
        <div
          class="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 text-white/20 text-[8rem] md:text-[14rem] font-extrabold leading-none select-none"
        >
          01
        </div>
      </div>

      <!-- RIGHT — Content (5 cols) -->
      <div
        class="col-span-1 lg:col-span-5 flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-14 lg:py-0"
      >
        <!-- Section Number -->
        <div
          class="mb-6 md:mb-8"
          data-animate="fade-up"
        >
          <span class="eyebrow">
            01. Portfolio
          </span>
        </div>

        <!-- Name -->
        <h1
          class="text-display-sm md:text-display-md lg:text-display-lg font-extrabold text-swiss-fg leading-[1.02] mb-5 md:mb-6 max-w-[10ch]"
          data-animate="fade-up"
        >
          {{ personalInfo.name }}
        </h1>

        <!-- Subtitle -->
        <p
          class="text-lg md:text-xl font-semibold text-swiss-fg/85 mb-6 md:mb-8"
          data-animate="fade-up"
        >
          {{ personalInfo.title }}
        </p>

        <!-- Quote -->
        <p
          class="text-base md:text-lg italic text-gray-600 mb-8 md:mb-10 leading-relaxed max-w-md"
          data-animate="fade-up"
        >
          {{ personalInfo.quote }}
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-wrap gap-3"
          data-animate="fade-up"
        >
          <a
            :href="personalInfo.links.cvPdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-swiss-fg text-white px-7 py-3.5 font-semibold text-sm rounded-md border-2 border-swiss-fg transition-colors duration-200 ease-out hover:bg-swiss-accent hover:border-swiss-accent"
          >
            Tải CV
          </a>
          <a
            :href="personalInfo.links.linkedin"
            class="inline-block bg-transparent text-swiss-fg px-7 py-3.5 font-semibold text-sm rounded-md border-2 border-swiss-fg transition-colors duration-200 ease-out hover:bg-swiss-fg hover:text-white"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Border + Scroll Indicator -->
    <div
      class="border-t-2 border-swiss-fg flex items-center justify-center py-4 md:py-5"
      data-animate="fade-in"
    >
      <div class="flex flex-col items-center gap-2 group cursor-pointer">
        <span class="text-xs font-semibold text-swiss-fg/75">
          Cuộn xuống
        </span>
        <div class="w-5 h-8 border-2 border-swiss-fg rounded-full flex justify-center pt-1">
          <div class="w-1 h-2 bg-swiss-accent animate-bounce"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { personalInfo } from '@/data/portfolio.js'
</script>
