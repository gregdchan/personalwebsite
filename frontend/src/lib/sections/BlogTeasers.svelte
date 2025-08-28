<script lang="ts">
  export let items: any[] = [];
  function href(p:any){ return p?.slug?.current ? `/blog/${p.slug.current}` : '#' }
</script>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
  <div class="mb-6 flex items-end justify-between">
    <h2 class="text-2xl font-semibold text-[color:var(--heading-color)]">From the blog</h2>
    <a href="/blog" class="text-sm text-[var(--color-primary)] hover:opacity-80 focus:outline-none focus-visible:ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--color-body-bg)] rounded px-2 py-1">All posts</a>
  </div>
  {#if !items?.length}
    <p class="text-[var(--color-body-text)]/70">Add “post” docs in Sanity to populate this section.</p>
  {:else}
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each items as p}
        <a href={href(p)} class="group overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-[var(--color-body-bg)]">
          {#if p?.cover?.asset?.url}
            <img src={p.cover.asset.url} alt={p.cover?.alt || p.title} class="h-48 w-full object-cover transition duration-300 group-hover:scale-105" />
          {/if}
          <div class="p-4">
            <h3 class="font-medium">{p.title}</h3>
            {#if p.excerpt}<p class="mt-1 text-sm text-[var(--color-body-text)]/70 line-clamp-2">{p.excerpt}</p>{/if}
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>