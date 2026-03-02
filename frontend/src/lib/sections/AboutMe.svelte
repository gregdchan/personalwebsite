<script lang="ts">
	import PortableText from '$lib/rendering/PortableText.svelte';

	let { section = {} }: { section?: any } = $props();

	const heading = section?.heading || 'About Me';
	const body = section?.body || [];
	const image = section?.image;
</script>

<section class="py-20 lg:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-16">
		<div class="grid items-start gap-16 lg:grid-cols-[1fr_400px]">
			<!-- Text Content -->
			<div>
				<div
					class="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 font-mono text-xs tracking-widest text-primary-500 uppercase"
				>
					About
				</div>
				<h2 class="mb-8 text-3xl font-bold tracking-tight lg:text-4xl">
					{heading}
				</h2>

				{#if body.length > 0}
					<PortableText blocks={body} />
				{:else}
					<p class="text-surface-400">No content yet — add some in Sanity.</p>
				{/if}
			</div>

			<!-- Image -->
			{#if image?.asset?.url}
				<div
					class="relative overflow-hidden rounded-2xl border border-white/5 shadow-2xl lg:sticky lg:top-28"
				>
					<img
						src={image.asset.url}
						alt={image.alt || heading}
						class="aspect-[3/4] w-full object-cover"
					/>
				</div>
			{/if}
		</div>
	</div>
</section>
