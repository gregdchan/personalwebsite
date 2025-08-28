<script lang="ts">
  export let section: any = {};
  const cols = Math.min(Math.max(section?.columns ?? 3, 1), 4);
  const items = section?.features || [];
</script>

<section class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div class="contents" style={`--cols:${cols}`}></div>
  </div>

  <div class="grid gap-6" style={`grid-template-columns: repeat(${cols}, minmax(0, 1fr));`}>
    {#each items as f}
      <div class="rounded-lg bg-[var(--color-surface,transparent)] p-6 ring-1 ring-black/5 dark:ring-white/10">
        {#if f?.icon?.asset?.url || f?.icon?.url}
          <img src={f.icon.asset?.url || f.icon.url} alt={f.title || 'Feature icon'} class="mb-4 h-10 w-10 object-contain" />
        {/if}
        {#if f?.title}<h3 class="mb-1 font-semibold">{f.title}</h3>{/if}
        {#if f?.text}<p class="text-[var(--color-body-text)]/80">{f.text}</p>{/if}
      </div>
    {/each}
  </div>
</section>