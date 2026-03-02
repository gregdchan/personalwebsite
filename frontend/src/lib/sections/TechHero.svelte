<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, Terminal } from 'lucide-svelte';

	let { section = {} }: { section: any } = $props();

	const heading =
		'Designing delightful, performant experiences at the intersection of tech and society.';
	const subheading =
		section?.subheading ||
		section?.subtitle ||
		section?.description ||
		'Product designer & engineer crafting modern interfaces with SvelteKit, specialized in social impact and inclusive design.';

	const actions = section?.actions || [
		{ text: 'View projects', url: '#projects', primary: true },
		{ text: 'About Greg', url: '/about' }
	];
</script>

<section class="relative isolate overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-48">
	<!-- Dynamic Background Glow -->
	<div
		class="absolute top-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[120px]"
	></div>
	<div
		class="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary-500/10 blur-[100px]"
	></div>

	<div class="mx-auto max-w-7xl px-6 px-12 text-center lg:px-16 lg:text-left">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<div>
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 font-mono text-xs tracking-widest text-primary-500 uppercase"
				>
					<Terminal size={14} /> Design Technologist
				</div>

				<h1 class="mb-8 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-7xl">
					{heading}
				</h1>

				<p class="mb-10 max-w-2xl text-xl text-surface-400">
					{subheading}
				</p>

				<div class="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
					{#each actions as action}
						<a
							href={action.url}
							class="inline-flex items-center gap-2 rounded-xl border px-8 py-4 font-semibold transition-all {action.primary
								? 'border-transparent bg-primary-500 text-white hover:bg-primary-600'
								: 'border-white/10 bg-surface-800 hover:bg-surface-700'}"
						>
							{action.text}
							{#if action.primary}
								<ArrowRight size={18} />
							{/if}
						</a>
					{/each}
				</div>
			</div>

			<div class="relative hidden lg:block">
				<div
					class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-surface-800/50 shadow-2xl backdrop-blur-xl"
				>
					<!-- Geometric Art / Visualization -->
					<div class="absolute inset-0 opacity-20">
						<svg
							viewBox="0 0 400 400"
							xmlns="http://www.w3.org/2000/svg"
							class="h-full w-full scale-110"
						>
							<defs>
								<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
									<path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" />
								</pattern>
							</defs>
							<circle
								cx="200"
								cy="200"
								r="120"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								class="text-primary-500/50"
							/>
							<rect
								x="80"
								y="80"
								width="240"
								height="240"
								stroke="currentColor"
								stroke-width="1"
								fill="none"
								class="text-secondary-500/50"
								transform="rotate(45 200 200)"
							/>
						</svg>
					</div>

					<div class="relative text-center">
						<div class="mb-4 text-6xl leading-none font-black text-white/95">DIR.</div>
						<div class="font-mono text-2xl font-bold tracking-widest text-primary-500 uppercase">
							Research & Tech
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
