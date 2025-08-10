<script lang="ts">
	import type { Navigation, NavItem } from '$lib/types/navigation';
	export let navigation: Navigation | null;
	export let logoUrl: string | null = null;

	let resolvedLogoUrl = '';
	$: if (!resolvedLogoUrl && logoUrl) resolvedLogoUrl = logoUrl;

	function href(item: NavItem) {
		if (typeof item.link === 'string') return item.link;
		if (item.link?.external) return item.link.external;
		const slug = item.link?.internal?.slug?.current;
		return slug ? `/${slug}` : '#';
	}
</script>

<header class="bg-header text-header border-b">
	<nav class="site-container w-full">
		<div class="flex h-16 items-center justify-between">
			<a href="/" aria-label="Home" class="flex items-center space-x-2">
				{#if resolvedLogoUrl}
					<img
						src={resolvedLogoUrl}
						alt="Site Logo"
						width="160"
						height="40"
						decoding="async"
						loading="eager"
						fetchpriority="high"
						style="display:block"
					/>
				{:else}
					<span class="text-xl font-bold">Greg D. Chan</span>
				{/if}
			</a>

			{#if navigation?.items}
				<div class="hidden items-baseline space-x-4 md:flex">
					{#each navigation.items as item}
						<a
							href={href(item)}
							class="hover:text-primary px-3 py-2 text-sm"
							target={item.target || '_self'}
						>
							{item.text}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</nav>
</header>
