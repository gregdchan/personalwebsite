<script lang="ts">
	import SectionRenderer from '$lib/rendering/SectionRenderer.svelte';
	import PortableText from '$lib/rendering/PortableText.svelte';

	let { data }: { data: { page: any } } = $props();

	const sections = data?.page?.sections ?? [];
	const page = data?.page;
	const body = data?.page?.body ?? [];
</script>

<div class="slug-page-content mt-16 lg:mt-24">
	<div class="container mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 lg:px-8 lg:text-left">
		<h1
			class="mb-4 font-black tracking-tight text-[color:var(--h1-color,var(--heading-color))]"
			style="font-size: var(--h1-font-size); line-height: var(--h1-line-height); letter-spacing: var(--h1-letter-spacing); text-transform: var(--h1-text-transform); font-family: var(--font-heading);"
		>
			{page?.title ?? 'Page'}
		</h1>
		{#if page?.description}
			<p class="mx-auto max-w-2xl text-lg font-medium text-[var(--color-body-text)]/80 lg:mx-0">
				{page.description}
			</p>
		{/if}
	</div>

	{#if body.length > 0}
		<div class="container mx-auto max-w-4xl px-4 pb-14 sm:px-6 lg:px-8">
			<div class="rounded-2xl border border-white/8 bg-white/3 p-6 sm:p-8">
				<PortableText blocks={body} />
			</div>
		</div>
	{/if}

	{#if sections.length === 0 && body.length === 0}
		<div class="container mx-auto max-w-7xl px-4 pb-32 text-center opacity-50 sm:px-6 lg:px-8">
			<div class="inline-block rounded-2xl border border-white/10 bg-white/5 p-12">
				<p class="mb-2 font-mono text-xs tracking-widest text-white/50 uppercase">No Content Found</p>
				<p class="text-white/60">Manage this page in the Sanity CMS.</p>
			</div>
		</div>
	{:else}
		{#if sections.length > 0}
			<SectionRenderer {sections} />
		{/if}
	{/if}
</div>

<style>
	.slug-page-content {
		width: 100%;
		overflow-x: hidden;
	}
</style>
