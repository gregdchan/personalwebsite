<script lang="ts">
  import Hero from '$lib/sections/Hero.svelte';
  import PictureHero from '$lib/sections/PictureHero.svelte';
  import VideoHero from '$lib/sections/VideoHero.svelte';
  import RichText from '$lib/sections/RichText.svelte';
  import FeatureGrid from '$lib/sections/FeatureGrid.svelte';
  import ImageCarousel from '$lib/sections/ImageCarousel.svelte';
  import TestimonialCarousel from '$lib/sections/TestimonialCarousel.svelte';
  import FAQ from '$lib/sections/FAQ.svelte';
  import EducationSection from '$lib/sections/EducationSection.svelte';
  import SkillsSection from '$lib/sections/SkillsSection.svelte';
  import ExperienceSection from '$lib/sections/ExperienceSection.svelte';
  import ThreeJsSection from '$lib/sections/ThreeJsSection.svelte';
  import FrameSection from '$lib/sections/FrameSection.svelte';
  import UnknownSection from '$lib/sections/UnknownSection.svelte';

  export let data: {
    page: {
      title?: string;
      description?: string;
      sections?: any[];
    }
  };

  const componentMap: Record<string, any> = {
    hero: Hero,
    pictureHero: PictureHero,
    videoHero: VideoHero,
    richText: RichText,
    featureGrid: FeatureGrid,
    imageCarousel: ImageCarousel,
    testimonialCarousel: TestimonialCarousel,
    faq: FAQ,
    education: EducationSection,
    skills: SkillsSection,
    experience: ExperienceSection,
    threeJsSection: ThreeJsSection,
    frame: FrameSection
  };

  const sections = data?.page?.sections ?? [];
</script>

<section class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
  <h1 class="mb-2 text-[color:var(--h1-color,var(--heading-color))] font-bold"
      style="font-size: var(--h1-font-size); line-height: var(--h1-line-height); letter-spacing: var(--h1-letter-spacing); text-transform: var(--h1-text-transform); font-family: var(--font-heading);">
    {data.page?.title ?? 'Page'}
  </h1>
  {#if data.page?.description}
    <p class="text-[var(--color-body-text)]/80">{data.page.description}</p>
  {/if}
</section>

{#if sections.length === 0}
  <section class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
    <p class="text-[var(--color-body-text)]/70">No sections yet. Add content in Sanity → Page → Sections.</p>
  </section>
{:else}
  {#each sections as section, i (section._key || `${section._type}-${i}`)}
    <svelte:component
      this={componentMap[section._type] || UnknownSection}
      section={section}
      index={i}
    />
  {/each}
{/if}