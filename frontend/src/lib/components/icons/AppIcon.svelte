<script lang="ts">
	type IconName =
		| 'menu'
		| 'x'
		| 'sun'
		| 'moon'
		| 'github'
		| 'linkedin'
		| 'mail'
		| 'arrow-left'
		| 'arrow-right'
		| 'arrow-up-right'
		| 'external-link'
		| 'terminal';

	let {
		name,
		size = 20,
		class: className = '',
		strokeWidth = 2
	}: {
		name: IconName;
		size?: number;
		class?: string;
		strokeWidth?: number;
	} = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width={strokeWidth}
	aria-hidden="true"
	class={className}
>
	{#if name === 'menu'}
		<path d="M4 7h16M4 12h16M4 17h16" />
	{:else if name === 'x'}
		<path d="M6 6l12 12M18 6L6 18" />
	{:else if name === 'sun'}
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
	{:else if name === 'moon'}
		<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
	{:else if name === 'mail'}
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="M3 7l9 6 9-6" />
	{:else if name === 'arrow-left'}
		<path d="M19 12H5" />
		<path d="M12 19l-7-7 7-7" />
	{:else if name === 'arrow-right'}
		<path d="M5 12h14" />
		<path d="M12 5l7 7-7 7" />
	{:else if name === 'arrow-up-right'}
		<path d="M7 17L17 7" />
		<path d="M8 7h9v9" />
	{:else if name === 'external-link'}
		<path d="M14 3h7v7" />
		<path d="M10 14L21 3" />
		<path d="M21 14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4" />
	{:else if name === 'terminal'}
		<path d="M4 17l6-5-6-5" />
		<path d="M12 19h8" />
	{:else if name === 'linkedin'}
		<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
		<path d="M8 11v5M8 8.5v.01M12 16v-3a2 2 0 1 1 4 0v3" />
	{:else if name === 'github'}
		<path
			fill="currentColor"
			stroke="none"
			d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.66c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.88 1.51 2.32 1.08 2.89.82.09-.65.34-1.08.62-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.58 9.58 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.56 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.85-2.35 4.69-4.58 4.94.35.3.67.89.67 1.79v2.65c0 .27.18.57.69.47A10 10 0 0 0 12 2z"
		/>
	{/if}
</svg>
