<script lang="ts">
	/** A full Portable Text renderer for Sanity blockContent arrays. */

	import InfographicBlock from '$lib/components/InfographicBlock.svelte';

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

	/** Check if a block is entirely code-marked (a code block, not inline code) */
	function isCodeBlock(block: any): boolean {
		if (block._type !== 'block' || block.listItem) return false;
		const children = block.children || [];
		if (children.length === 0) return false;
		return children.every((child: any) => {
			const marks: string[] = child.marks || [];
			return marks.includes('code');
		});
	}

	/** Get plain text from a block's children (for code blocks) */
	function getPlainText(block: any): string {
		return (block.children || []).map((child: any) => child.text || '').join('');
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
					text = `<code class="rounded bg-primary-500/10 px-1.5 py-0.5 font-mono text-sm text-primary-300 border border-primary-500/20">${text}</code>`;

				// Handle link annotations
				const linkMark = marks.find((m: string) =>
					markDefs.some((def: any) => def._key === m && def._type === 'link')
				);
				if (linkMark) {
					const def = markDefs.find((d: any) => d._key === linkMark);
					const target = def.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
					text = `<a href="${safeHref(def?.href)}" class="text-primary-400 font-medium underline underline-offset-4 decoration-primary-500/30 hover:decoration-primary-400 transition-colors"${target}>${text}</a>`;
				}

				return text;
			})
			.join('');
	}

	// Group list items and consecutive code blocks
	function groupBlocks(rawBlocks: any[]) {
		const result: any[] = [];
		const source = Array.isArray(rawBlocks) ? rawBlocks : [];
		let i = 0;
		while (i < source.length) {
			const block = source[i];
			if (block._type === 'block' && block.listItem) {
				const listType = block.listItem;
				const items: any[] = [];
				while (i < source.length && source[i].listItem === listType) {
					items.push(source[i]);
					i++;
				}
				result.push({ _type: 'list', listType, items });
			} else if (isCodeBlock(block)) {
				// Group consecutive code blocks into a single pre/code block
				const lines: string[] = [];
				while (i < source.length && isCodeBlock(source[i])) {
					lines.push(getPlainText(source[i]));
					i++;
				}
				result.push({ _type: 'codeBlock', lines });
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
						<li class="flex gap-2" style="color: var(--color-muted-text)">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"></span>
							<span>{@html getChildren(item)}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<ol class="list-decimal space-y-2 pl-6">
					{#each block.items as item}
						<li style="color: var(--color-muted-text)">{@html getChildren(item)}</li>
					{/each}
				</ol>
			{/if}
		{:else if block._type === 'codeBlock'}
			<pre class="code-block"><code>{block.lines.join('\n')}</code></pre>
		{:else if block._type === 'block'}
			{#if block.style === 'h2'}
				<h2 class="mt-8 text-2xl font-bold tracking-tight" style="color: var(--heading-color)">
					{@html getChildren(block)}
				</h2>
			{:else if block.style === 'h3'}
				<h3 class="mt-6 text-xl font-semibold" style="color: var(--heading-color)">
					{@html getChildren(block)}
				</h3>
			{:else if block.style === 'blockquote'}
				<blockquote
					class="border-l-4 border-primary-500 pl-4 italic"
					style="color: var(--color-muted-text)"
				>
					{@html getChildren(block)}
				</blockquote>
			{:else if getChildren(block)}
				<p class="leading-relaxed" style="color: var(--color-muted-text)">
					{@html getChildren(block)}
				</p>
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
		{:else if block._type === 'infographicBlock'}
			<div class="my-6">
				<InfographicBlock {block} />
			</div>
		{/if}
	{/each}
</div>

<style>
	.code-block {
		margin: 1.5rem 0;
		padding: 1.25rem;
		border-radius: 0.75rem;
		background: #09090b;
		border: 1px solid rgba(255, 255, 255, 0.1);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.7;
		color: #e4e4e7;
		white-space: pre;
		tab-size: 2;
	}

	.code-block code {
		background: none;
		padding: 0;
		border-radius: 0;
		font-size: inherit;
	}
</style>
