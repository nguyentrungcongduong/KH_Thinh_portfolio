import { onMounted, onUnmounted } from 'vue'

/**
 * Composable for scroll-triggered animations using IntersectionObserver.
 * Adds 'in-view' class when elements with '[data-animate]' enter viewport.
 * Respects prefers-reduced-motion.
 */
export function useScrollAnimation() {
  let observer = null

  onMounted(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // If user prefers reduced motion, show all elements immediately
      document.querySelectorAll('[data-animate]').forEach((el) => {
        el.classList.add('in-view')
      })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
