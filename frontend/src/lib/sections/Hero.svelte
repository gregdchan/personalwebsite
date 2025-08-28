<script lang="ts">
  export let section: any = {};

  const type = section?._type || 'hero';
  const heading = section?.heading || section?.title || 'Welcome';
  const subheading = section?.subheading || section?.subtitle || section?.description || '';
  const actions = section?.actions || section?.cta ? [section?.cta] : [];
  const img = section?.backgroundImage?.asset?.url || section?.image?.asset?.url;
  const poster = section?.posterImage?.asset?.url;
  const vid = section?.videoUrl || section?.backgroundVideo;
  const bg1 = typeof section?.backgroundColor === 'string'
    ? section.backgroundColor
    : section?.backgroundColor?.hex;
  const bg2 = typeof section?.secondaryColor === 'string'
    ? section.secondaryColor
    : section?.secondaryColor?.hex;

  const hasVideo = type === 'videoHero' && vid;
  const hasImage = (type === 'pictureHero' || type === 'hero') && img;

  const gradientStyle = bg1 && bg2
    ? `background: linear-gradient(135deg, ${bg1}, ${bg2});`
    : bg1
      ? `background: ${bg1};`
      : '';
</script>

<section class="relative isolate min-h-[70vh] flex items-center overflow-hidden">
  {#if hasVideo}
    <video class="absolute inset-0 h-full w-full object-cover" src={vid} poster={poster} autoplay muted loop playsinline />
    <div class="absolute inset-0 bg-black/40"></div>
  {:else if hasImage}
    <img src={img} alt="" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-black/35"></div>
  {:else}
    <div class="absolute inset-0" style={gradientStyle}></div>
  {/if}

  <div class="relative z-10 w-full">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center py-16 sm:py-24">
        <h1 class="font-extrabold tracking-tight text-white" style="font-size: var(--h1-font-size); line-height: var(--h1-line-height); font-family: var(--font-heading);">
          {heading}
        </h1>
        {#if subheading}
          <p class="mt-4 text-lg/7 text-white/90">{subheading}</p>
        {/if}
        {#if actions?.length}
          <div class="mt-8 flex items-center justify-center gap-3">
            {#each actions as a}
              {#if a}
                <a
                  href={a?.url || a?.href || '#'}
                  target={a?.blank ? '_blank' : undefined}
                  rel={a?.blank ? 'noopener noreferrer' : undefined}
                  class="inline-flex items-center rounded-lg bg-white/10 px-5 py-3 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15 focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-black"
                >
                  {a?.text || a?.label || 'Learn more'}
                </a>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>