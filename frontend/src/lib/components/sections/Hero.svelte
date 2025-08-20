<script lang="ts">
  import { urlFor } from '$lib/utils/sanityImage';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  export let heading = '';
  export let subheading = '';
  export let backgroundType = 'image';
  export let backgroundImage: any = null;
  export let backgroundColor = null;
  export let cta: { text?: string; url?: string } | null = null;
  
  let heroSection: HTMLElement;
  let contentElement: HTMLElement;
  let backgroundElement: HTMLElement;
  
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animation
    const tl = gsap.timeline();
    
    tl.fromTo(contentElement, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );
    
    // Parallax effect on scroll
    if (backgroundElement) {
      gsap.to(backgroundElement, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    // Text reveal animation
    gsap.fromTo('.hero-text', 
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3
      }
    );
  });
</script>

<section 
  bind:this={heroSection}
  class="hero-section {backgroundType}"
  style="background-color: {backgroundColor || 'transparent'}"
>
  {#if backgroundType === 'image' && backgroundImage?.asset?._ref}
    <div 
      bind:this={backgroundElement}
      class="hero-background"
    >
      <img
        src={urlFor(backgroundImage).width(1920).auto('format').url()}
        alt=""
        class="hero-bg-image"
        loading="eager"
        fetchpriority="high"
      />
      <div class="hero-overlay"></div>
    </div>
  {/if}
  
  {#if backgroundType === 'video' && backgroundVideo}
    <div 
      bind:this={backgroundElement}
      class="hero-background"
    >
      <video autoplay muted loop playsinline class="hero-bg-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>
    </div>
  {/if}

  <div class="hero-content">
    <div bind:this={contentElement} class="hero-text-container">
      {#if heading}
        <h1 class="hero-heading hero-text">{heading}</h1>
      {/if}
      
      {#if subheading}
        <p class="hero-subheading hero-text">{subheading}</p>
      {/if}
      
      {#if cta?.text && cta?.url}
        <div class="hero-cta hero-text">
          <a href={cta.url} class="cta-button">
            <span class="cta-text">{cta.text}</span>
            <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      {/if}
    </div>
  </div>
  
  <div class="hero-scroll-indicator">
    <div class="scroll-arrow"></div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .hero-background {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  
  .hero-bg-image,
  .hero-bg-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.1);
  }
  
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    padding: 0 2rem;
  }
  
  .hero-text-container {
    opacity: 0;
  }
  
  .hero-heading {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: white;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.02em;
  }
  
  .hero-subheading {
    font-size: clamp(1.125rem, 4vw, 1.5rem);
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-cta {
    display: inline-block;
  }
  
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.125rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
  }
  
  .cta-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.6);
  }
  
  .cta-button:hover::before {
    opacity: 1;
  }
  
  .cta-button:hover .cta-arrow {
    transform: translateX(4px);
  }
  
  .cta-arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
  
  .hero-scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    animation: bounce 2s infinite;
  }
  
  .scroll-arrow {
    width: 2px;
    height: 30px;
    background: rgba(255, 255, 255, 0.6);
    position: relative;
  }
  
  .scroll-arrow::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid rgba(255, 255, 255, 0.6);
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
  
  @media (max-width: 768px) {
    .hero-content {
      padding: 0 1rem;
    }
    
    .hero-heading {
      margin-bottom: 1rem;
    }
    
    .hero-subheading {
      margin-bottom: 2rem;
    }
    
    .cta-button {
      padding: 0.875rem 1.75rem;
      font-size: 1rem;
    }
  }
</style>