<script lang="ts">
	let { section = {} }: { section?: any } = $props();
	// Try common field names; fallback to content/html
	const src = section?.url || section?.src;
	const rawHtml = section?.html || section?.content;
	const html =
		typeof rawHtml === 'string'
			? rawHtml
					.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
					.replace(/\son\w+=(["']).*?\1/gi, '')
					.replace(/\s(href|src)=(["'])\s*javascript:.*?\2/gi, '')
			: '';
</script>

<section class="container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
	{#if src}
		<div
			class="aspect-video w-full overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10"
		>
			<iframe
				{src}
				title="Embedded content"
				class="h-full w-full"
				loading="lazy"
				referrerpolicy="no-referrer"
			></iframe>
		</div>
	{:else if html}
		<div class="aspect-video w-full overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10">
			<iframe
				title="Embedded HTML content"
				class="h-full w-full"
				loading="lazy"
				sandbox=""
				srcdoc={html}
			></iframe>
		</div>
	{:else}
		<p class="text-[var(--color-body-text)]/70">Frame section has no src/html.</p>
	{/if}
</section>
