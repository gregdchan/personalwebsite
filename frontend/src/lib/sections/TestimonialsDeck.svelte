<script lang="ts">
  export let items: any[] = [];
</script>

<section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
  <div class="mb-6">
    <h2 class="text-2xl font-semibold text-[color:var(--heading-color)]">What clients say</h2>
  </div>
  {#if !items?.length}
    <p class="text-[var(--color-body-text)]/70">Add “testimonial” docs in Sanity to populate this section.</p>
  {:else}
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each items as t}
        <figure class="rounded-xl bg-[var(--color-body-bg)] p-6 ring-1 ring-black/5 dark:ring-white/10">
          <blockquote class="text-[var(--color-body-text)]/90">“{t.quote}”</blockquote>
          <figcaption class="mt-4 flex items-center gap-3">
            {#if t?.photo?.asset?.url}
              <img src={t.photo.asset.url} alt={t.photo?.alt || t.author} class="h-10 w-10 rounded-full object-cover" />
            {/if}
            <div>
              <div class="font-medium">{t.author}</div>
              {#if t.role}<div class="text-sm text-[var(--color-body-text)]/70">{t.role}</div>{/if}
            </div>
          </figcaption>
        </figure>
      {/each}
    </div>
  {/if}
</section>