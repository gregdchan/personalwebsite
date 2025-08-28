<script lang="ts">
  export let title: string = 'Featured Projects';
  export let items: any[] = [];
  function href(p:any){ return p?.slug?.current ? `/work/${p.slug.current}` : '#' }
</script>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
  <div class="mb-6 flex items-end justify-between">
    <h2 class="text-2xl font-semibold text-[color:var(--heading-color)]">{title}</h2>
    <a href="/work" class="text-sm text-[var(--color-primary)] hover:opacity-80 focus:outline-none focus-visible:ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--color-body-bg)] rounded px-2 py-1">Browse all</a>
  </div>

  {#if !items?.length}
    <p class="text-[var(--color-body-text)]/70">Add “project” docs in Sanity to populate this section.</p>
  {:else}
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each items as p}
        <a href={href(p)} class="group relative overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-[var(--color-body-bg)]">
          {#if p?.cover?.asset?.url}
            <img src={p.cover.asset.url} alt={p.cover?.alt || p.title} class="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          {/if}
          <div class="p-4">
            <h3 class="font-medium">{p.title}</h3>
            {#if p.excerpt}<p class="mt-1 text-sm text-[var(--color-body-text)]/70 line-clamp-2">{p.excerpt}</p>{/if}
            {#if p.tags?.length}
              <div class="mt-3 flex flex-wrap gap-2">
                {#each p.tags as t}<span class="rounded bg-[var(--color-body-text)]/10 px-2 py-0.5 text-xs text-[var(--color-body-text)]/80">{t}</span>{/each}
              </div>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>