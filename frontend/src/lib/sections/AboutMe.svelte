<script lang="ts">
  export let section: any = {};
</script>

<section class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
  <div class="grid gap-8 md:grid-cols-[1.1fr,1fr] items-center">
    <div>
      <h2 class="text-2xl font-semibold text-[color:var(--heading-color)]">{section?.heading || 'About me'}</h2>
      {#if section?.body}
        <div class="prose prose-invert:prose-invert mt-4 max-w-none text-[var(--color-body-text)]/90">
          {#each section.body as blk}
            {#if blk._type === 'block'}
              <p>{blk.children?.[0]?.text}</p>
            {/if}
          {/each}
        </div>
      {:else}
        <p class="mt-4 text-[var(--color-body-text)]/80">Designer/engineer focused on UI, accessibility, and performance.</p>
      {/if}
    </div>
    <div class="relative overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10">
      {#if section?.image?.asset?.url}
        <img src={section.image.asset.url} alt={section.image?.alt || 'Portrait'} class="h-80 w-full object-cover" />
      {:else}
        <div class="h-80 grid place-items-center bg-[var(--color-body-text)]/5 text-[var(--color-body-text)]/60">Portrait</div>
      {/if}
    </div>
  </div>
</section>