<script lang="ts">
	let { section = {} }: { section?: any } = $props();

	const heading = section?.heading || '';
	const subheading = section?.subheading || '';
	const description = section?.description || '';

	function formatDate(dateStr: string | undefined) {
		if (!dateStr) return '';
		const d = new Date(dateStr + 'T00:00:00');
		return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	}

	const startDate = formatDate(section?.startDate);
	const endDate = formatDate(section?.endDate);
	const dateRange = [startDate, endDate].filter(Boolean).join(' – ');
</script>

<div class="relative flex gap-6 pb-12">
	<!-- Icon -->
	<div class="relative flex flex-col items-center">
		<div
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface-800 shadow-lg"
		>
			{#if section?.logo?.asset?.url}
				<img src={section.logo.asset.url} alt={heading} class="h-8 w-8 rounded-lg object-contain" />
			{:else}
				<span class="text-lg font-bold text-secondary-500">{heading.charAt(0)}</span>
			{/if}
		</div>
		<div class="mt-2 w-px flex-1 bg-white/5"></div>
	</div>

	<!-- Content -->
	<div class="flex-1 pt-1">
		<div class="mb-1 flex flex-wrap items-baseline gap-3">
			<h3 class="text-lg font-bold text-white">{heading}</h3>
			{#if dateRange}
				<span class="font-mono text-xs text-surface-500">{dateRange}</span>
			{/if}
		</div>
		{#if subheading}
			<p class="mb-2 text-sm font-medium text-secondary-400">{subheading}</p>
		{/if}
		{#if description}
			<p class="text-sm leading-relaxed text-surface-400">{description}</p>
		{/if}
	</div>
</div>
