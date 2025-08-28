<script lang="ts">
  export let section: any = {};
  const bg = section?.backgroundImage?.asset?.url || section?.backgroundImage?.url;
  const alt = section?.backgroundImage?.alt || section?.title || 'Hero background';
  const zoom = section?.hoverZoom ?? 1.1;
</script>

<section class="relative overflow-hidden group">
  {#if bg}
    <img
      src={bg}
      alt={alt}
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[var(--zoom)]"
      style={`--zoom:${zoom}`}
    />
    <div class="absolute inset-0 bg-black/30"></div>
  {/if}
  <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-white">
    {#if section?.preTitle}<p class="mb-2 text-sm/6 uppercase tracking-wide text-white/80">{section.preTitle}</p>{/if}
    {#if section?.title}
      <h2 class="mb-4 font-bold" style="font-size: var(--h1-font-size); line-height: var(--h1-line-height); font-family: var(--font-heading);">
        {section.title}
      </h2>
    {/if}
    {#if section?.subtitle}<p class="mb-6 max-w-prose text-white/90">{section.subtitle}</p>{/if}
  </div>
</section>