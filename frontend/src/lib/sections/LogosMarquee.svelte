<script lang="ts">
  export let logos: any[] = []; // [{ image{asset{url},alt}, url? }]
  const list = logos?.filter(Boolean) || [];
</script>

{#if list.length}
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    <div class="relative overflow-hidden">
      <div class="flex gap-10 animate-marquee [animation-duration:30s] hover:[animation-play-state:paused]">
        {#each list.concat(list) as l}
          <a href={l?.url || '#'} target={l?.url ? '_blank' : undefined} rel="noopener" class="opacity-80 hover:opacity-100">
            {#if l?.image?.asset?.url}
              <img src={l.image.asset.url} alt={l.image?.alt || 'Logo'} class="h-10 w-auto object-contain" />
            {/if}
          </a>
        {/each}
      </div>
    </div>
  </section>
{/if}

<style>
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .animate-marquee { animation: marquee linear infinite; }
  @media (prefers-reduced-motion: reduce) { .animate-marquee { animation: none; } }
</style>