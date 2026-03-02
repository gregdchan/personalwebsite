<script lang="ts">
	let { section = {} }: { section?: any } = $props();
</script>

<section class="relative overflow-hidden">
	<div class="relative h-[50vh] min-h-[320px] w-full">
		<video
			class="absolute inset-0 h-full w-full object-cover"
			src={section?.videoUrl}
			poster={section?.posterImage?.asset?.url || section?.posterImage?.url}
			autoplay={section?.autoplay ?? true}
			loop={section?.loop ?? true}
			muted={section?.mute ?? true}
			playsinline
		></video>
		<div class="absolute inset-0 bg-black/30"></div>
		{#if section?.overlayText}
			<div class="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				<h2
					class="font-bold text-white"
					style="font-size: var(--h1-font-size); line-height: var(--h1-line-height); font-family: var(--font-heading);"
				>
					{section.overlayText}
				</h2>
			</div>
		{/if}
	</div>
</section>
