<script lang="ts">
  import { urlFor } from '$lib/utils/sanityImage';
  import { onMount } from 'svelte';
  import PortableText from '$lib/components/PortableText.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Frame from '$lib/components/Frame.svelte';

  // Define the types for homePage and its nested properties
  interface MainImage {
    asset?: {
      _ref?: string;
    };
    alt?: string;
  }

  interface Section {
    _key: string;
    _type: string;
    backgroundType?: string;
    backgroundImage?: MainImage;
    backgroundVideo?: string;
    heading?: string;
    subheading?: string;
    cta?: {
      text?: string;
      url?: string;
    };
    // Additional properties for other section types
    [key: string]: any;
  }

  interface HomePage {
    title?: string;
    description?: string;
    mainImage?: MainImage;
    body?: any;
    sections?: Section[];
  }

  export let data: { homePage: HomePage };
  const { homePage } = data;

  onMount(async () => {
    // ✅ Load GSAP only in the browser
    const { gsap } = await import('gsap');
    // If your environment prefers the dist path, switch to: 'gsap/dist/ScrollTrigger'
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    (gsap.utils.toArray('.content-section') as HTMLElement[]).forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  });
</script>

<svelte:head>
  <title>{homePage?.title || 'Greg D. Chan - Personal Website'}</title>
  <meta name="description" content={homePage?.description || 'Personal website and portfolio of Greg D. Chan'} />
</svelte:head>

<!-- Hero Section -->
{#if homePage?.sections && homePage.sections.length > 0}
  {#each homePage.sections as section (section._key)}
    {#if section._type === 'hero'}
      <Hero 
        heading={section.heading}
        subheading={section.subheading}
        backgroundType={section.backgroundType}
        backgroundImage={section.backgroundImage}
        backgroundColor={section.backgroundColor}
        cta={section.cta}
      />
    {/if}
  {/each}
{/if}

<!-- Main Content -->
<main class="main-content">
  <!-- Page Header -->
  {#if homePage?.title && !homePage?.sections?.some(s => s._type === 'hero')}
    <section class="content-section page-header">
      <div class="container">
        {#if homePage.title}
          <h1 class="page-title">{homePage.title}</h1>
        {/if}

        {#if homePage.description}
          <p class="page-description">{homePage.description}</p>
        {/if}

        {#if homePage?.mainImage?.asset?._ref}
          <div class="featured-image">
            <img
              src={urlFor(homePage.mainImage).width(1200).auto('format').url()}
              alt={homePage.mainImage.alt || homePage.title}
              class="hero-image"
            />
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Body Content -->
  {#if homePage?.body}
    <section class="content-section body-content">
      <div class="container">
        <PortableText value={homePage.body} />
      </div>
    </section>
  {/if}

  <!-- Render all other section types -->
  {#if homePage?.sections && homePage.sections.length > 0}
    {#each homePage.sections as section (section._key)}
      {#if section._type !== 'hero'}
        <section class="content-section section-{section._type}">
          <div class="container">
            <!-- Three.js Section -->
            {#if section._type === 'threeJsSection'}
              <div class="threejs-container">
                <!-- Three.js content will go here -->
                <div class="threejs-placeholder">
                  <h3>Three.js Interactive Section</h3>
                  <p>This section will contain interactive 3D content.</p>
                </div>
              </div>
            {/if}

            <!-- Frame Section -->
            {#if section._type === 'frame'}
              <Frame>
                <iframe 
                  src={section.url} 
                  title={section.title || 'Embedded Content'} 
                  class="frame-content"
                  style="height: {section.height || 400}px"
                ></iframe>
              </Frame>
            {/if}

            <!-- Generic Section -->
            {#if !['threeJsSection', 'frame'].includes(section._type)}
              {#if section.heading}
                <h2 class="section-heading">{section.heading}</h2>
              {/if}
              
              {#if section.subheading}
                <p class="section-subheading">{section.subheading}</p>
              {/if}
              
              {#if section.cta?.text && section.cta?.url}
                <div class="section-cta">
                  <a href={section.cta.url} class="btn btn-primary">
                    {section.cta.text}
                  </a>
                </div>
              {/if}
            {/if}
          </div>
        </section>
      {/if}
    {/each}
  {/if}
</main>