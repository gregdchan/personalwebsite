<script lang="ts">
  export let section: any = {};
  let i = 0;
  const imgs = (section?.images || []).map((im: any) => im?.asset?.url || im?.url).filter(Boolean);
  let timer: any;
  const autoplay = section?.autoplay ?? false;
  const interval = Math.max(section?.interval ?? 5000, 1500);

  function next() { i = (i + 1) % Math.max(imgs.length, 1); }
  function prev() { i = (i - 1 + imgs.length) % Math.max(imgs.length, 1); }

  $: if (autoplay && imgs.length > 1) {
    clearInterval(timer);
    timer = setInterval(next, interval);
  }
  $: if (!autoplay) clearInterval(timer);
</script>

{#if imgs.length}
<section class="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
  <div class="relative">
    <img src={imgs[i]} alt={`Slide ${i+1}`} class="h-72 w-full rounded-lg object-cover" />
    {#if imgs.length > 1}
      <button class="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-black/40 p-2 text-white hover:bg-black/60" on:click={prev} aria-label="Previous slide">‹</button>
      <button class="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-black/40 p-2 text-white hover:bg-black/60" on:click={next} aria-label="Next slide">›</button>
    {/if}
  </div>
</section>
{/if}