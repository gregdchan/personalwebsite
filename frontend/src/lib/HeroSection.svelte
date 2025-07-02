<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let gsap: any;
  let ScrollTrigger: any;

  onMount(async () => {
    if (!browser) return;

    // Dynamically import GSAP only on the client
    const importedGsap = await import('gsap');
    const importedScrollTrigger = await import('gsap/ScrollTrigger');
    importedGsap.default.registerPlugin(importedScrollTrigger.default);

    gsap = importedGsap.default;
    ScrollTrigger = importedScrollTrigger.default;

    // Animate photo and text
    const intro = gsap.timeline();
    intro.from('.hero-photo img', {
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      ease: 'power2.out'
    }).from('.hero-text', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.5');

    gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        scrub: 1,
        pinSpacing: true
      }
    })
    .to('.hero-photo img', {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: 'power1.inOut'
    })
    .to('.hero-text', {
      y: -50,
      opacity: 0,
      duration: 1.5,
      ease: 'power1.inOut'
    }, '<+0.2');
  });
</script>

<section class="hero relative w-full h-screen flex items-center justify-center bg-black text-white overflow-hidden">
  <div class="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
    <div class="hero-photo w-64 md:w-96 mb-8 md:mb-0 md:mr-12">
      <img
        src="/images/headshot.webp"
        alt="Greg Headshot"
        class="w-full h-auto object-cover rounded-full shadow-2xl"
      />
    </div>
    <h1
    class="shine-text hero-text text-5xl md:text-7xl font-extrabold tracking-tight relative inline-block bg-gradient-to-r from-white via-gray-400 to-white text-transparent bg-clip-text animate-shine"
  >
    Hi, I'm Greg
  </h1>
  
  </div>
</section>

<style>
  .hero-photo img {
    transition: all 0.3s ease;
  }
</style>
