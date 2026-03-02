<script lang="ts">
	/** A full Portable Text renderer for Sanity blockContent arrays. */

	let { blocks = [] }: { blocks: any[] } = $props();

	function escapeHtml(value: string): string {
		return value
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#39;');
	}

	function safeHref(href: string | undefined): string {
		if (!href) return '#';
		if (href.startsWith('/')) return href;
		if (href.startsWith('#')) return href;
		if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
		return '#';
	}

	function getChildren(block: any): string {
		return (block.children || [])
			.map((child: any) => {
				if (!child.text) return '';
				let text = escapeHtml(child.text);

				const marks: string[] = child.marks || [];
				const markDefs: any[] = block.markDefs || [];

				if (marks.includes('strong')) text = `<strong>${text}</strong>`;
				if (marks.includes('em')) text = `<em>${text}</em>`;
				if (marks.includes('code'))
					text = `<code class="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm">${text}</code>`;

				// Handle link annotations
				const linkMark = marks.find((m: string) =>
					markDefs.some((def: any) => def._key === m && def._type === 'link')
				);
				if (linkMark) {
					const def = markDefs.find((d: any) => d._key === linkMark);
					const target = def.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
					text = `<a href="${safeHref(def?.href)}" class="text-primary-400 underline underline-offset-2 hover:text-primary-300 transition-colors"${target}>${text}</a>`;
				}

				return text;
			})
			.join('');
	}

	// Group list items into list blocks
	function groupBlocks(rawBlocks: any[]) {
		const result: any[] = [];
		const source = Array.isArray(rawBlocks) ? rawBlocks : [];
		let i = 0;
		while (i < source.length) {
			const block = source[i];
			if (block._type === 'block' && block.listItem) {
				const listType = block.listItem; // 'bullet' | 'number'
				const items: any[] = [];
				while (i < source.length && source[i].listItem === listType) {
					items.push(source[i]);
					i++;
				}
				result.push({ _type: 'list', listType, items });
			} else {
				result.push(block);
				i++;
			}
		}
		return result;
	}

	const grouped = $derived(groupBlocks(blocks));
</script>

<div class="portable-text space-y-4">
	{#each grouped as block}
		{#if block._type === 'list'}
			{#if block.listType === 'bullet'}
				<ul class="space-y-2 pl-6">
					{#each block.items as item}
						<li class="flex gap-2 text-surface-300">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"></span>
							<span>{@html getChildren(item)}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<ol class="list-decimal space-y-2 pl-6">
					{#each block.items as item}
						<li class="text-surface-300">{@html getChildren(item)}</li>
					{/each}
				</ol>
			{/if}
		{:else if block._type === 'block'}
			{#if block.style === 'h2'}
				<h2 class="mt-8 text-2xl font-bold tracking-tight text-white">
					{@html getChildren(block)}
				</h2>
			{:else if block.style === 'h3'}
				<h3 class="mt-6 text-xl font-semibold text-white">{@html getChildren(block)}</h3>
			{:else if block.style === 'blockquote'}
				<blockquote class="border-l-4 border-primary-500 pl-4 text-surface-300 italic">
					{@html getChildren(block)}
				</blockquote>
			{:else if getChildren(block)}
				<p class="leading-relaxed text-surface-300">{@html getChildren(block)}</p>
			{/if}
		{:else if block._type === 'image'}
			{#if block.asset?.url}
				<figure class="my-6">
					<img
						src={block.asset.url}
						alt={block.alt || ''}
						class="w-full rounded-xl border border-white/5 object-cover shadow-xl"
					/>
					{#if block.alt}
						<figcaption class="mt-2 text-center text-sm text-surface-500">{block.alt}</figcaption>
					{/if}
				</figure>
			{/if}
		{/if}
	{/each}
</div>
