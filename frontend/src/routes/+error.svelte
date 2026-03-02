<script lang="ts">
	import { page } from '$app/stores';
	let { status, error }: { status: number; error?: { message?: string; name?: string } } = $props();

	let eps = $derived($page.data?.errorPages);
	let content = $derived(status === 404 ? (eps as any)?.notFound : (eps as any)?.generic);
</script>

<section class="mx-auto max-w-7xl px-6 py-24 text-center">
	<h1 class="mb-4 text-4xl font-bold">
		{content?.title ?? (status === 404 ? 'Page not found' : 'Something went wrong')}
	</h1>
	<p class="mb-8 text-surface-400">
		{content?.message ?? error?.message ?? 'An unexpected error occurred.'}
	</p>
	{#if content?.ctaHref && content?.ctaLabel}
		<a
			href={content.ctaHref}
			class="rounded-lg bg-primary-500 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-600"
			>{content.ctaLabel}</a
		>
	{:else}
		<a
			href="/"
			class="rounded-lg bg-primary-500 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-600"
			>Go home</a
		>
	{/if}
</section>
