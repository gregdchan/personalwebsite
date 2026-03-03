<script lang="ts">
	import type { Navigation, NavigationItem } from '$lib/types/navigation';
	import AppIcon from '$lib/components/icons/AppIcon.svelte';
	import { page } from '$app/state';

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

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

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

	function canonicalizePath(path: string) {
		if (!path || path === '#') return path;
		if (path === '/about-me' || path === 'about-me') return '/about';
		return path;
	}

	function routeHref(item: NavigationItem) {
		const label = (item?.text || '').toLowerCase().trim();
		if (label === 'work') return '/work';
		if (label === 'play') return '/play';
		if (label === 'about' || label === 'about me') return '/about';
		if (label === 'contact') return '/contact';
		return canonicalizePath(href(item));
	}

	const navItems = $derived(
		navigation?.items?.length
			? navigation.items
			: [
					{ text: 'Work', link: '/work', href: '/work' },
					{ text: 'Play', link: '/play', href: '/play' },
					{ text: 'About', link: '/about', href: '/about' },
					{ text: 'Contact', link: '/contact', href: '/contact' }
				]
	);

	function isActive(item: NavigationItem) {
		const target = routeHref(item);
		if (!target || target === '#') return false;
		if (target === '/') return page.url.pathname === '/';
		return page.url.pathname === target || page.url.pathname.startsWith(`${target}/`);
	}

	function onMobileNavKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
	}
</script>

<header class="site-header">
	<div class="header-inner">
		<a href="/" class="brand" aria-label="Greg D. Chan — Home">
			{#if logoUrl}
				<img
					src={logoUrl}
					alt="Greg D. Chan"
					class="brand-logo"
					width="180"
					height="26"
					loading="eager"
					decoding="async"
				/>
			{:else}
				<div class="brand-mark" aria-hidden="true">GC</div>
			{/if}
			{#if !logoUrl}
				<div class="brand-copy">
					<strong>Greg D. Chan</strong>
					<span>Design + Creative Technology</span>
				</div>
			{/if}
		</a>

		<nav class="desktop-nav" aria-label="Main navigation">
			{#each navItems as item}
				<a
					href={routeHref(item)}
					target={(item as any)?.target || '_self'}
					rel={(item as any)?.target === '_blank' ? 'noopener noreferrer' : undefined}
					class:active={isActive(item)}
					aria-current={isActive(item) ? 'page' : undefined}
				>
					{item.text}
				</a>
			{/each}
		</nav>

		<div class="header-actions">
			<button
				onclick={onToggleTheme}
				aria-label={currentMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
				class="theme-btn"
				type="button"
			>
				{#if currentMode === 'dark'}
					<AppIcon name="sun" size={17} />
				{:else}
					<AppIcon name="moon" size={17} />
				{/if}
			</button>
			<button
				class="menu-btn"
				onclick={toggleMenu}
				aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={isMenuOpen}
				aria-controls="mobile-nav"
				type="button"
			>
				{#if isMenuOpen}
					<AppIcon name="x" size={20} />
				{:else}
					<AppIcon name="menu" size={20} />
				{/if}
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<nav
			id="mobile-nav"
			class="mobile-nav"
			aria-label="Mobile navigation"
			onkeydown={onMobileNavKeydown}
		>
			{#each navItems as item}
				<a
					href={routeHref(item)}
					target={(item as any)?.target || '_self'}
					rel={(item as any)?.target === '_blank' ? 'noopener noreferrer' : undefined}
					onclick={closeMenu}
					aria-current={isActive(item) ? 'page' : undefined}
				>
					{item.text}
				</a>
			{/each}
		</nav>
	{/if}
</header>

<div class="header-spacer" aria-hidden="true"></div>

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		background: var(--color-header-surface);
		border-bottom: 1px solid var(--color-edge);
	}

	.header-inner {
		height: clamp(56px, 9vw, 72px);
		max-width: 1160px;
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 3vw, 1.25rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		text-decoration: none;
		color: inherit;
		min-height: 44px;
	}

	.brand-mark {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: linear-gradient(140deg, var(--color-accent), var(--color-accent-alt));
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.07em;
		color: white;
		box-shadow: 0 10px 28px color-mix(in oklab, var(--color-accent) 32%, transparent);
	}

	.brand-logo {
		display: block;
		width: auto;
		height: clamp(20px, 3.5vw, 26px);
		max-width: min(42vw, 180px);
		object-fit: contain;
		filter: grayscale(1) brightness(0);
	}

	:global(:root[data-theme-mode='dark']) .brand-logo,
	:global(:root.dark) .brand-logo {
		filter: grayscale(1) brightness(0) invert(1);
	}

	.brand-copy {
		display: none;
		line-height: 1.1;
	}

	.brand-copy strong {
		font-size: 0.92rem;
		font-weight: 600;
	}

	.brand-copy span {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.63rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted-text);
		margin-top: 0.2rem;
	}

	.desktop-nav {
		display: none;
		align-items: center;
		gap: 0.3rem;
	}

	.desktop-nav a {
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.52rem 0.72rem;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		border-radius: 999px;
		color: var(--color-muted-text);
		border: 1px solid transparent;
		transition:
			color 140ms ease,
			border-color 140ms ease,
			background 140ms ease;
	}

	.desktop-nav a:hover {
		color: var(--color-body-text);
		border-color: var(--color-edge);
		background: rgba(148, 163, 184, 0.08);
	}

	.desktop-nav a.active {
		color: var(--color-on-accent);
		border-color: color-mix(in oklab, var(--color-accent-alt) 55%, transparent);
		background: color-mix(in oklab, var(--color-accent) 56%, transparent);
	}

	.header-actions {
		display: flex;
		gap: 0.45rem;
	}

	.theme-btn,
	.menu-btn {
		width: 44px;
		height: 44px;
		border-radius: 9px;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		color: inherit;
		display: grid;
		place-items: center;
		cursor: pointer;
		transition:
			border-color 140ms ease,
			background 140ms ease;
	}

	.theme-btn:hover,
	.menu-btn:hover {
		border-color: var(--color-accent);
	}

	.mobile-nav {
		display: grid;
		padding: 0.4rem clamp(0.75rem, 3vw, 1.25rem) 1rem;
		max-width: 1160px;
		margin: 0 auto;
		gap: 0.4rem;
		animation: menuSlideIn 200ms ease;
	}

	@keyframes menuSlideIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-nav {
			animation: none;
		}
	}

	.mobile-nav a {
		text-decoration: none;
		color: var(--color-body-text);
		padding: 0.75rem 0.9rem;
		min-height: 44px;
		display: flex;
		align-items: center;
		border-radius: 0.75rem;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		transition: border-color 140ms ease;
	}

	.mobile-nav a:hover,
	.mobile-nav a[aria-current='page'] {
		border-color: var(--color-accent);
	}

	.header-spacer {
		height: clamp(56px, 9vw, 72px);
	}

	@media (min-width: 760px) {
		.brand-copy {
			display: block;
		}

		.desktop-nav {
			display: flex;
		}

		.menu-btn {
			display: none;
		}
	}
</style>
