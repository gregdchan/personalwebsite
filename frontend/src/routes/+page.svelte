<script lang="ts">
	import SectionRenderer from '$lib/rendering/SectionRenderer.svelte';
	import ProjectGrid from '$lib/sections/ProjectGrid.svelte';

	let { data } = $props();

	const sections = data?.page?.sections ?? [];
	const projects = data.projects ?? [];

	// If there is no hero section in the sections array, we might want to manually add one
	// but normally the user should add it in Sanity.
	const hasHero = sections.some((s: any) =>
		['hero', 'pictureHero', 'videoHero'].includes(s?._type)
	);
</script>

<div class="page-content">
	{#if sections.length > 0}
		<SectionRenderer {sections} />
	{:else}
		<div class="flex min-h-[50vh] flex-col items-center justify-center p-12 text-center">
			<h2 class="mb-4 text-2xl font-bold">Welcome to Greg D. Chan's Website</h2>
			<p class="text-surface-400">Add sections in Sanity to populate this page.</p>
		</div>
	{/if}

	<!-- Always show projects if they exist and aren't already represented in sections -->
	{#if projects.length > 0 && !sections.some((s: any) => s._type === 'projectGrid')}
		<ProjectGrid items={projects} title="Featured Work" />
	{/if}
</div>

<style>
	.page-content {
		width: 100%;
		overflow-x: hidden;
	}
</style>
