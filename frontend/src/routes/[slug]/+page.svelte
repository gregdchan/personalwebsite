<script lang="ts">
  import type { PageData } from './$types';
  import { PortableText } from '@portabletext/svelte';
  import { onMount } from 'svelte';
  export let data: PageData;
  
  // For scroll animations
  let scrollY: number = 0;
  let innerHeight: number = typeof window !== 'undefined' ? window.innerHeight : 0;
  
  // Image ref for circular treatment
  let profileImage: HTMLImageElement | null = null;

  // Reactive filtered arrays for sections
  let educationSections = [];
  let skillsSections = [];
  let experienceSections = [];

  // Helper function to check if body exists and has content
  const hasBody = (page) => {
    return page && page.body && Array.isArray(page.body) && page.body.length > 0;
  };

  $: if (data?.page?.sections) {
    educationSections = data.page.sections.filter(s => s._type === 'education');
    skillsSections = data.page.sections.filter(s => s._type === 'skills');
    experienceSections = data.page.sections.filter(s => s._type === 'experience');
  }
  
  onMount(() => {
    // Only log in development to avoid leaking sensitive info in production
    if (import.meta.env && import.meta.env.DEV) {
      console.log("Page data:", data.page);
    }
  });
</script>

<svelte:window bind:scrollY bind:innerHeight/>

<svelte:head>
  <title>{data.page?.title || 'Default Title'}</title>
  {#if data.page?.seo?.description}
    <meta name="description" content={data.page.seo?.description} />
  {/if}
  {#if data.page?.seo?.openGraph?.image?.asset?.url}
    <meta property="og:image" content={data.page.seo.openGraph.image.asset.url} />
    <meta property="og:title" content={data.page.seo?.openGraph?.title || data.page?.title || 'Default Title'} />
    <meta property="og:description" content={data.page.seo?.openGraph?.description || data.page.seo?.description || 'Default Description'} />
  {/if}
</svelte:head>

<div class="page-content">
  <div class="hero-section" style="min-height: calc(100vh - 450px);">
    <div class="row">
      <div class="column image-column" style="transform: translateY({Math.min(scrollY * 0.1, 50)}px);">
        {#if data.page.mainImage}
          <div class="circular-image-container" style="opacity: {1 - Math.min(scrollY / 500, 0.6)};">
            <img 
              bind:this={profileImage}
              src={data.page.mainImage.asset.url} 
              alt={data.page.mainImage.alt || data.page.title} 
              class="circular-image"
            />
          </div>
        {/if}
      </div>
      <div class="column content-column" style="transform: translateY({Math.min(scrollY * 0.05, 30)}px);">
        <h1 class="hero-title" style="opacity: {1 - Math.min(scrollY / 600, 0.4)};">
          Hi, I'm {data.page.title}.
        </h1>
      </div>
    </div>
  </div>

  <!-- Content section -->
  <div class="content-section">
    <div class="container">
      
      {#if hasBody(data.page)}
        <div class="description body-text">
          <PortableText value={data.page.body} />
        </div>
      {/if}
    </div>
  </div>

  <!-- Experience and Education section -->
  {#if data.page.sections && data.page.sections.length > 0}
    <div class="info-section">
      <div class="container">
        <div class="columns">
          <!-- Left column (Education) -->
          <div class="column left-column">
            <h2>Education</h2>
            {#each educationSections as section}
              <div class="info-block">
                <h3>{section.heading}</h3>
                <h4>{section.subheading}</h4>
              </div>
            {/each}
            
            <h2>Skills</h2>
            {#each skillsSections as section}
              <div class="info-block">
                <h3>{section.heading}</h3>
                <h4>{section.subheading}</h4>
              </div>
            {/each}
          </div>
          
          <!-- Right column (Experience) -->
          <div class="column right-column">
            <h2>Experience</h2>
            {#each experienceSections as section}
              <div class="info-block">
                <h3>{section.heading}</h3>
                <h4>{section.subheading}</h4>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Page Structure */
  .page-content {
    overflow-x: hidden;
  }
  
  .container {
    width: 90%;
    max-width: var(--container-max-width, 1200px);
    margin: 0 auto;
  }
  
  /* Hero Section */
  .hero-section {
    padding-top: var(--spacing-xxl, 150px);
    position: relative;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  
  .column {
    flex: 1;
    padding: var(--spacing-md, 20px);
  }
  
  .image-column {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .content-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  /* Circular Image */
  .circular-image-container {
    width: 100%;
    max-width: var(--image-max-width, 400px);
    transition: all var(--transition-duration, 0.3s) var(--transition-easing, ease);
  }
  
  .circular-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
    box-shadow: var(--shadow-light);
    transition: transform var(--transition-duration, 0.5s) var(--transition-easing, ease);
  }
  
  .circular-image:hover {
    transform: scale(1.03);
  }
  
  /* Typography */
  .hero-title {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-bold, 700);
    font-size: clamp(2.5em, 8vw, 8em);
    margin-left: 0;
    transition: all var(--transition-duration, 0.3s) var(--transition-easing, ease);
  }
  
  .body-text {
    font-family: var(--font-body);
    font-weight: var(--font-weight-semibold, 600);
    font-size: var(--font-size-lg, 1.3em);
    letter-spacing: var(--letter-spacing-wide, 2px);
    line-height: var(--line-height-relaxed, 1.5em);
    padding-top: var(--spacing-sm, 18px);
    margin-bottom: var(--spacing-xxl, 20vh);
  }
  
  /* Info Section */
  .info-section {
    background-color: var(--color-bg-light, #F4F7FF);
    color: var(--color-text-dark, #000000);
    padding: var(--spacing-xl, 50px) 0;
    margin-top: var(--spacing-xxl, 100px);
  }
  
  .columns {
    display: flex;
    flex-wrap: wrap;
  }
  
  .left-column, .right-column {
    flex: 1;
    padding: 0 var(--spacing-md, 20px);
    border-left: 2px solid var(--color-accent, #97C77D);
    padding-left: var(--spacing-md, 20px);
  }
  
  .info-block {
    margin-bottom: var(--spacing-lg, 30px);
  }
  
  h2 {
    font-weight: var(--font-weight-semibold, 600);
    font-size: var(--font-size-xl, 2em);
    color: var(--color-text-dark, #000000);
    line-height: var(--line-height-normal, 1.5em);
    text-align: left;
  }
  
  h3 {
    font-size: var(--font-size-lg, 23px);
    color: var(--color-text-dark, #000000);
  }
  
  h4 {
    font-family: var(--font-body);
    font-size: var(--font-size-md, 19px);
    color: var(--color-text-muted, #777777);
  }
  
  /* Media Queries */
  @media only screen and (max-width: 980px) {
    .hero-title {
      font-size: var(--font-size-xl-responsive, 6em);
    }
    
    .row {
      flex-direction: column;
    }
    
    .column {
      width: 100%;
    }
  }
  
  @media only screen and (max-width: 767px) {
    .hero-section {
      padding-top: var(--spacing-xxl, 150px);
    }
    
    .hero-title {
      font-size: var(--font-size-lg-responsive, 3em);
      padding-top: var(--spacing-lg, 40px);
    }
    
    .columns {
      flex-direction: column;
    }
  }
</style>
