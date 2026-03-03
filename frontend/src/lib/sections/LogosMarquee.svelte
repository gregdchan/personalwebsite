<script lang="ts">
	import { optimizedUrl } from '$lib/sanity';
	let { logos = [] }: { logos?: any[] } = $props();
	const list = (Array.isArray(logos) ? logos : []).filter(Boolean);
</script>

{#if list.length}
	<section
		class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
		aria-label="Brands I've worked with"
	>
		<div class="relative overflow-hidden">
			<div
				class="animate-marquee flex gap-16 [animation-duration:40s] hover:[animation-play-state:paused]"
			>
				{#each list as l}
					<a
						href={l?.url || '#'}
						target={l?.url ? '_blank' : undefined}
						rel="noopener"
						class="opacity-60 transition-opacity hover:opacity-100"
					>
						{#if l?.image}
							<img
								src={optimizedUrl(l.image, 200)}
								alt={l.image?.alt || 'Partner logo'}
								class="h-8 w-auto object-contain grayscale"
								loading="lazy"
								decoding="async"
							/>
						{/if}
					</a>
				{/each}
				<!-- Duplicate for continuous scroll -->
				{#each list as l}
					<div aria-hidden="true" class="opacity-60 grayscale">
						{#if l?.image}
							<img
								src={optimizedUrl(l.image, 200)}
								alt=""
								class="h-8 w-auto object-contain"
								loading="lazy"
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
	.animate-marquee {
		animation: marquee linear infinite;
	}
	@media (prefers-reduced-motion: reduce) {
		.animate-marquee {
			animation: none;
		}
	}
</style>
