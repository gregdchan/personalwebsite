<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  export let animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn' = 'fadeIn';
  export let duration: number = 0.8;
  export let delay: number = 0;
  export let stagger: number = 0;
  export let trigger: 'top' | 'center' | 'bottom' = 'top';
  export let offset: string = '80%';
  export let ease: string = 'power2.out';
  export let once: boolean = true;
  
  let element: HTMLElement;
  
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const animations = {
      fadeIn: { opacity: 0, y: 0 },
      slideUp: { opacity: 0, y: 50 },
      slideLeft: { opacity: 0, x: 50 },
      slideRight: { opacity: 0, x: -50 },
      scaleIn: { opacity: 0, scale: 0.8 },
      rotateIn: { opacity: 0, rotation: 15 }
    };
    
    const startValues = animations[animation];
    const endValues = { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1, 
      rotation: 0,
      duration,
      delay,
      ease,
      stagger
    };
    
    // If stagger is set, animate children
    if (stagger > 0) {
      const children = element.querySelectorAll('[data-animate-child]');
      if (children.length > 0) {
        gsap.fromTo(children,
          startValues,
          { ...endValues, stagger }
        );
      } else {
        // Fallback to animating the element itself
        gsap.fromTo(element, startValues, endValues);
      }
    } else {
      gsap.fromTo(element, startValues, endValues);
    }
    
    // Set up scroll trigger
    ScrollTrigger.create({
      trigger: element,
      start: `${trigger} ${offset}`,
      end: 'bottom 20%',
      toggleActions: once ? 'play none none reverse' : 'play none none none',
      animation: gsap.fromTo(element, startValues, endValues)
    });
  });
</script>

<div bind:this={element} class="scroll-animation">
  <slot />
</div>

<style>
  .scroll-animation {
    opacity: 0; /* Start hidden, will be animated by GSAP */
  }
</style>