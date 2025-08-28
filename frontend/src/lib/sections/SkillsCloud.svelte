<script lang="ts">
  export let section: any = {};
  const skills = section?.skillsList ?? section?.skills ?? ['Svelte', 'TypeScript', 'Tailwind', 'Node', 'Sanity', 'Three.js'];
</script>

<section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
  <h2 class="text-2xl font-semibold text-[color:var(--heading-color)]">{section?.heading || 'Skills'}</h2>
  <div class="mt-4 flex flex-wrap gap-3">
    {#each skills as s, i}
      <span
        class="inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 ring-black/5 dark:ring-white/10 bg-[var(--color-body-bg)] text-[var(--color-body-text)]/90 hover:shadow transition-shadow"
        style="animation: float 6s ease-in-out infinite; animation-delay: {(i%5)*200}ms"
      >{typeof s === 'string' ? s : s?.skill}</span>
    {/each}
  </div>
</section>

<style>
  @media (prefers-reduced-motion: reduce) {
    span[style*="animation: float"] { animation: none !important; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
</style>