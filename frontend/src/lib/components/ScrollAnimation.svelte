<script lang="ts">
  import { onMount } from 'svelte';
  
  export let target: string;
  export let type: 'fadeIn' | 'slideUp' | 'zoomIn' = 'fadeIn';
  export let delay: number = 0;
  export let duration: number = 800;
  export let threshold: number = 0.1;
  
  let element: HTMLElement;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add('animated');
          }, delay);
          observer.unobserve(element);
        }
      });
    }, { threshold });
    
    const targetElement = document.querySelector(target);
    if (targetElement) {
      element = targetElement as HTMLElement;
      observer.observe(element);
    }
  });
</script>

<style>
  :global(.scroll-animation) {
    opacity: 0;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.4, 1, 0.65, 1);
  }
  
  :global(.scroll-animation.fadeIn) {
    opacity: 0;
  }
  
  :global(.scroll-animation.slideUp) {
    opacity: 0;
    transform: translateY(40px);
  }
  
  :global(.scroll-animation.zoomIn) {
    opacity: 0;
    transform: scale(0.9);
  }
  
  :global(.scroll-animation.animated) {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
</style>