<script lang="ts">
  export let section: any = {};
  // Try common field names; fallback to content/html
  const src = section?.url || section?.src;
  const html = section?.html || section?.content;
</script>

<section class="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
  {#if src}
    <div class="aspect-video w-full overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10">
      <iframe src={src} title="Embedded content" class="h-full w-full" loading="lazy" referrerpolicy="no-referrer" />
    </div>
  {:else if html}
    <div class="rounded-lg ring-1 ring-black/5 dark:ring-white/10" >
      {@html html}
    </div>
  {:else}
    <p class="text-[var(--color-body-text)]/70">Frame section has no src/html.</p>
  {/if}
</section>