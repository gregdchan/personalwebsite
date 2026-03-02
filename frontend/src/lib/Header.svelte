<script lang="ts">
	import type { Navigation, NavigationItem } from '$lib/types/navigation';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { Menu, X, Sun, Moon } from 'lucide-svelte';

	let {
		navigation = null,
		logoUrl = null,
		currentMode = 'dark',
		onToggleTheme
	}: {
		navigation: Navigation | null;
		logoUrl: string | null;
		currentMode: string;
		onToggleTheme: () => void;
	} = $props();

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleScroll() {
		isScrolled = window.scrollY > 20;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function href(item: NavigationItem) {
		if ((item as any)?.href) return (item as any).href;
		const link: any = (item as any)?.link;
		if (!link) return '#';
		if (typeof link === 'string') return link;
		if (link.url) return link.url;
		if (link.external) return link.external;
		const slug =
			link.internal?.slug?.current ?? link.internal?.slug ?? link.slug?.current ?? link.slug;
		return slug ? `/${slug}` : '#';
	}

	const navItems = navigation?.items ?? [
		{ text: 'Work', link: '/work' },
		{ text: 'About', link: '/about' },
		{ text: 'Contact', link: '/contact' }
	];
</script>

<header
	class="fixed top-0 right-0 left-0 z-50 border-b border-white/5 backdrop-blur-md transition-all duration-300 {isScrolled
		? 'bg-surface-900/80 py-2'
		: 'py-4'}"
	style="background-color: {isScrolled
		? 'var(--color-header-bg, rgba(15, 23, 42, 0.8))'
		: 'transparent'}; color: var(--color-header-text, inherit);"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6">
		<!-- Logo -->
		<a href="/" class="group flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 font-bold text-white shadow-lg shadow-primary-500/20 transition-transform group-hover:rotate-12"
			>
				G
			</div>
			<span class="hidden text-xl font-bold tracking-tight sm:block">Greg D. Chan</span>
		</a>

		<!-- Desktop Nav -->
		<nav class="hidden items-center gap-8 md:flex">
			{#each navItems as item}
				<a
					href={href(item)}
					class="group relative text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
				>
					{item.text}
					<span
						class="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-500 transition-all group-hover:w-full"
					></span>
				</a>
			{/each}

			<div class="mx-2 h-4 w-[1px] bg-white/10"></div>

			<!-- Theme Switcher -->
			<button
				onclick={onToggleTheme}
				class="rounded-xl border border-white/5 bg-white/5 p-2 transition-colors hover:bg-white/10"
				aria-label="Toggle Theme"
			>
				{#if currentMode === 'dark'}
					<Sun size={18} class="text-amber-400" />
				{:else}
					<Moon size={18} class="text-indigo-400" />
				{/if}
			</button>
		</nav>

		<!-- Mobile Menu Toggle -->
		<div class="flex items-center gap-2 md:hidden">
			<button
				onclick={onToggleTheme}
				class="rounded-lg p-2 transition-colors hover:bg-white/5"
				aria-label="Toggle Theme"
			>
				{#if currentMode === 'dark'}
					<Sun size={20} class="text-amber-400" />
				{:else}
					<Moon size={20} class="text-indigo-400" />
				{/if}
			</button>

			<button
				class="rounded-lg p-2 transition-colors hover:bg-white/5"
				onclick={toggleMenu}
				aria-label="Toggle Menu"
			>
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Nav Overlay -->
	{#if isMenuOpen}
		<div
			class="absolute top-full right-0 left-0 flex flex-col gap-4 border-b border-white/5 bg-surface-900 px-6 py-4 shadow-2xl md:hidden"
			transition:slide={{ duration: 300 }}
		>
			{#each navItems as item}
				<a
					href={href(item)}
					class="py-2 text-lg font-medium opacity-80 transition-opacity hover:opacity-100"
					onclick={() => (isMenuOpen = false)}
				>
					{item.text}
				</a>
			{/each}
		</div>
	{/if}
</header>

<div class="h-20 lg:h-24"></div>

<!-- Spacer -->

<style>
	header {
		/* Subtle glow for tech-savvy look */
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
	}
</style>
