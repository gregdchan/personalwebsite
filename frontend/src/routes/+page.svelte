<script lang="ts">
  import type { Page } from '../lib/types/page';
  import ProjectsGrid from '$lib/sections/ProjectsGrid.svelte';
  import AboutMe from '$lib/sections/AboutMe.svelte';
  import SkillsCloud from '$lib/sections/SkillsCloud.svelte';
  import TestimonialsDeck from '$lib/sections/TestimonialsDeck.svelte';
  import BlogTeasers from '$lib/sections/BlogTeasers.svelte';
  import ContactCTA from '$lib/sections/ContactCTA.svelte';
  import LogosMarquee from '$lib/sections/LogosMarquee.svelte';
  import Hero from '$lib/sections/Hero.svelte';

  export let data: {
    page: Page | null;
    projects?: any[];
    posts?: any[];
    testimonials?: any[];
  };

  const sections = data?.page?.sections ?? [];
  const hero = sections.find((s: any) => ['hero','pictureHero','videoHero'].includes(s?._type));
  const about = sections.find((s: any) => s?._type === 'about') ?? null;
  const skills = sections.find((s: any) => s?._type === 'skills' || s?._type === 'skillsCloud') ?? null;
  const projects = data.projects ?? [];
  const posts = data.posts ?? [];
  const testimonials = (data.testimonials?.length ? data.testimonials : (sections.find((s: any) => s?._type === 'testimonialCarousel')?.testimonials)) ?? [];
</script>

{#if hero}
  <Hero section={hero} />
{:else}
  <section class="relative isolate min-h-[70vh] grid place-items-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[color-mix(in srgb,var(--color-primary) 60%,black)]"></div>
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white py-16 sm:py-24">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">Designing delightful, performant experiences</h1>
      <p class="mt-4 text-lg/7 text-white/90">Product designer & engineer crafting modern interfaces with SvelteKit.</p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <a href="/contact" class="inline-flex items-center rounded-lg bg-white/10 px-5 py-3 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15 focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-black">Get in touch</a>
        <a href="/work" class="inline-flex items-center rounded-lg bg-black/60 px-5 py-3 text-white ring-1 ring-white/10 hover:bg-black/70 focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-black">View work</a>
      </div>
    </div>
  </section>
{/if}

<!-- Logos/clients marquee -->
<LogosMarquee logos={(sections.find((s:any)=>s?._type==='logosMarquee')?.logos) ?? []} />

<!-- Projects -->
<ProjectsGrid title="Featured Projects" items={projects} />

<!-- About -->
<AboutMe section={about} />

<!-- Skills cloud -->
<SkillsCloud section={skills} />

<!-- Testimonials -->
<TestimonialsDeck items={testimonials} />

<!-- Blog -->
<BlogTeasers items={posts} />

<!-- Contact CTA -->
<ContactCTA />
