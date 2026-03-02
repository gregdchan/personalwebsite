<script lang="ts">
	let { section = {} }: { section?: any } = $props();
	let i = $state(0);
	const imgs = (section?.images || []).map((im: any) => im?.asset?.url || im?.url).filter(Boolean);
	let timer: any;
	const autoplay = section?.autoplay ?? false;
	const interval = Math.max(section?.interval ?? 5000, 1500);

	function next() {
		i = (i + 1) % Math.max(imgs.length, 1);
	}
	function prev() {
		i = (i - 1 + imgs.length) % Math.max(imgs.length, 1);
	}

	$effect(() => {
		if (autoplay && imgs.length > 1) {
			clearInterval(timer);
			timer = setInterval(next, interval);
			return () => clearInterval(timer);
		}
	});
</script>

{#if imgs.length}
	<section class="container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
		<div class="group relative overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
			<img
				src={imgs[i]}
				alt={`Slide ${i + 1}`}
				class="h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			{#if imgs.length > 1}
				<button
					class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-4 text-white backdrop-blur-md transition-all hover:bg-primary-500"
					onclick={prev}
					aria-label="Previous slide"
				>
					‹
				</button>
				<button
					class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-4 text-white backdrop-blur-md transition-all hover:bg-primary-500"
					onclick={next}
					aria-label="Next slide"
				>
					›
				</button>

				<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
					{#each imgs as _, idx}
						<div
							class={`h-1.5 rounded-full transition-all ${idx === i ? 'w-8 bg-primary-500' : 'w-2 bg-white/20'}`}
						></div>
					{/each}
				</div>
			{/if}
		</div>
	</section>
{/if}
