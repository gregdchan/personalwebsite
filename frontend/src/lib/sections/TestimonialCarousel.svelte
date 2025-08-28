<script lang="ts">
  export let section: any = {};
  let i = 0;
  const items = section?.testimonials || [];
  const autoplay = section?.autoplay ?? true;
  const interval = Math.max(section?.interval ?? 7000, 2000);
  let timer: any;
  function next() { i = (i + 1) % Math.max(items.length, 1); }
  function prev() { i = (i - 1 + items.length) % Math.max(items.length, 1); }
  $: if (autoplay && items.length > 1) { clearInterval(timer); timer = setInterval(next, interval); }
  $: if (!autoplay) clearInterval(timer);
</script>

{#if items.length}
<section class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
  <div class="relative rounded-xl bg-[var(--color-surface,transparent)] p-6 ring-1 ring-black/5 dark:ring-white/10">
    <figure class="text-center">
      {#if items[i]?.photo?.asset?.url || items[i]?.photo?.url}
        <img src={items[i].photo.asset?.url || items[i].photo.url} alt={items[i]?.author || 'Photo'} class="mx-auto mb-4 h-16 w-16 rounded-full object-cover" />
      {/if}
      <blockquote class="text-lg italic text-[var(--color-body-text)]/90">“{items[i]?.quote}”</blockquote>
      {#if items[i]?.author}<figcaption class="mt-2 font-medium">{items[i].author}</figcaption>{/if}
    </figure>
    {#if items.length > 1}
      <button class="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-black/40 p-2 text-white hover:bg-black/60" on:click={prev} aria-label="Previous">‹</button>
      <button class="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-black/40 p-2 text-white hover:bg-black/60" on:click={next} aria-label="Next">›</button>
    {/if}
  </div>
</section>
{/if}