<script lang="ts">
	import type { PageData } from './$types';
	import { PortableText } from '@portabletext/svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.page.title}</title>
	{#if data.page.seo?.description}
		<meta name="description" content={data.page.seo.description} />
	{/if}
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-4 text-4xl font-bold">{data.page.title}</h1>
	{#if data.page.content}
		<div class="prose">
			<!-- Render the Portable Text content -->
			<PortableText value={data.page.content} />
		</div>
	{/if}
</div>
