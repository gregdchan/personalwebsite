<script lang="ts">
	import PortableText from '$lib/rendering/PortableText.svelte';

	let { section = {} }: { section?: any } = $props();

	const heading = section?.heading || '';
	const subheading = section?.subheading || '';
	const description = section?.description || [];

	// Format dates
	function formatDate(dateStr: string | undefined) {
		if (!dateStr) return '';
		const d = new Date(dateStr + 'T00:00:00');
		return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	}

	const startDate = formatDate(section?.startDate);
	const endDate = section?.current ? 'Present' : formatDate(section?.endDate);
	const dateRange = [startDate, endDate].filter(Boolean).join(' – ');
</script>

<div class="group relative flex gap-6 pb-12">
	<!-- Timeline line -->
	<div class="relative flex flex-col items-center">
		<div
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface-800 shadow-lg"
		>
			{#if section?.companyLogo?.asset?.url}
				<img
					src={section.companyLogo.asset.url}
					alt={heading}
					class="h-8 w-8 rounded-lg object-contain"
				/>
			{:else}
				<span class="text-lg font-bold text-primary-500">{heading.charAt(0)}</span>
			{/if}
		</div>
		<div class="mt-2 w-px flex-1 bg-white/5"></div>
	</div>

	<!-- Content -->
	<div class="flex-1 pt-1 pb-4">
		<div class="mb-2 flex flex-wrap items-baseline gap-3">
			<h3 class="text-lg font-bold text-white">{heading}</h3>
			{#if dateRange}
				<span class="font-mono text-xs text-surface-500">{dateRange}</span>
			{/if}
			{#if section?.current}
				<span
					class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400"
					>Current</span
				>
			{/if}
		</div>
		{#if subheading}
			<p class="mb-3 text-sm font-medium text-primary-400">{subheading}</p>
		{/if}
		{#if description.length > 0}
			<PortableText blocks={description} />
		{/if}
	</div>
</div>
