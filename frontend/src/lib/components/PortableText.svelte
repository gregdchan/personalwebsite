<script lang="ts">
	import { PortableText as PortableTextComponent } from '@portabletext/svelte';
	import { urlFor } from '$lib/utils/sanityImage';

	export let value;

	// Custom serializers for handling block types
	const components = {
		// Customize how block types are rendered
		types: {
			image: ({ value }) => {
				if (!value?.asset?._ref) {
					return null;
				}
				return `<img src="${urlFor(value).width(800).auto('format').url()}" alt="${value.alt || ''}" />`;
			}
			// Add other custom block types here
		},
		// Customize how marks (bold, italic, etc.) are rendered
		marks: {
			link: ({ children, value }) => {
				const { href, blank } = value;
				const rel = blank ? 'noopener noreferrer' : undefined;
				const target = blank ? '_blank' : undefined;
				return `<a href="${href}" rel="${rel}" target="${target}">${children}</a>`;
			}
			// Add other custom marks here
		}
	};
</script>

<div class="portable-text prose dark:prose-invert max-w-none">
	<PortableTextComponent {value} {components} />
</div>

<style>
	/* Optional: Add custom styling for your portable text content */
	:global(.portable-text h2) {
		margin-top: 1.5em;
	}

	:global(.portable-text p) {
		margin-bottom: 1em;
	}

	:global(.portable-text a) {
		color: var(--primary, #1a73e8);
		text-decoration: underline;
	}

	:global(.portable-text img) {
		max-width: 100%;
		height: auto;
		margin: 2em 0;
	}
</style>
