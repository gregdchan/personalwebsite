<script lang="ts">
	import SectionRenderer from '$lib/rendering/SectionRenderer.svelte';

	let {
		data
	}: {
		data: {
			page: {
				title?: string;
				description?: string;
				sections?: any[];
			};
		};
	} = $props();

	const sections = data?.page?.sections ?? [];
</script>

<div class="slug-page-content mt-16 lg:mt-24">
	<div class="container mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8 lg:text-left">
		<h1
			class="mb-4 font-black tracking-tight text-[color:var(--h1-color,var(--heading-color))]"
			style="font-size: var(--h1-font-size); line-height: var(--h1-line-height); letter-spacing: var(--h1-letter-spacing); text-transform: var(--h1-text-transform); font-family: var(--font-heading);"
		>
			{data.page?.title ?? 'Page'}
		</h1>
		{#if data.page?.description}
			<p class="mx-auto max-w-2xl text-xl font-medium text-[var(--color-body-text)]/80 lg:mx-0">
				{data.page.description}
			</p>
		{/if}
	</div>

	{#if sections.length === 0}
		<div class="container mx-auto max-w-7xl px-4 pb-32 text-center opacity-50 sm:px-6 lg:px-8">
			<div class="inline-block rounded-2xl border border-white/10 bg-white/5 p-12">
				<p class="mb-2 font-mono text-xs tracking-widest text-white/50 uppercase">
					No Content Found
				</p>
				<p class="text-white/60">Manage this page in the Sanity CMS.</p>
			</div>
		</div>
	{:else}
		<SectionRenderer {sections} />
	{/if}
</div>

<style>
	.slug-page-content {
		width: 100%;
		overflow-x: hidden;
	}
</style>
