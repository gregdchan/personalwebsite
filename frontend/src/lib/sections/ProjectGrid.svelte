<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { ArrowUpRight } from 'lucide-svelte';

	let {
		items = [],
		title = 'Selected Projects',
		section = null
	}: { items?: any[]; title?: string; section?: any } = $props();

	// If passed via SectionRenderer, 'section' will contain the data
	const displayTitle = section?.heading || section?.title || title;
	const displayItems = section?.items || section?.projects || items;
</script>

<section id="projects" class="py-24 lg:py-32">
	<div class="mx-auto max-w-7xl px-6 px-12 lg:px-16">
		<div class="mb-16 flex items-end justify-between">
			<div>
				<div
					class="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-500/20 bg-secondary-500/10 px-3 py-1 font-mono text-xs tracking-widest text-secondary-500 uppercase"
				>
					Portfolio
				</div>
				<h2 class="text-4xl font-bold tracking-tight lg:text-5xl">{displayTitle}</h2>
			</div>

			<div class="hidden md:block">
				<a
					href="/work"
					class="flex items-center gap-2 font-medium text-primary-500 hover:underline"
				>
					View all work <ArrowUpRight size={18} />
				</a>
			</div>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each displayItems as project}
				<a
					href={`/work/${project.slug?.current || project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`}
					class="group relative block overflow-hidden rounded-2xl border border-white/5 bg-surface-800/30 shadow-2xl transition-transform hover:-translate-y-2"
				>
					<!-- Project Image / Mockup Placeholder -->
					<div class="relative aspect-[16/10] overflow-hidden bg-surface-700">
						{#if (project.cover || project.image)?.asset?.url}
							<img
								src={(project.cover || project.image).asset.url}
								alt={project.title}
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
						{:else}
							<div class="absolute inset-0 flex items-center justify-center opacity-20">
								<div
									class="h-full w-full bg-gradient-to-tr from-primary-900 to-secondary-900"
								></div>
							</div>
							<div
								class="absolute inset-0 flex items-center justify-center text-4xl font-bold tracking-widest text-white/10 uppercase"
							>
								{project.title.charAt(0)}
							</div>
						{/if}

						<div
							class="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent opacity-70 transition-opacity group-hover:opacity-10"
						></div>
					</div>

					<!-- Project Details -->
					<div class="p-8">
						<div class="mb-4 flex items-start justify-between">
							<div>
								<span
									class="mb-2 block font-mono text-xs font-bold tracking-widest text-primary-500 uppercase"
									>{project.category || 'Portfolio'}</span
								>
								<h3
									class="text-xl font-semibold text-white transition-colors group-hover:text-primary-400"
								>
									{project.title}
								</h3>
							</div>
							<div
								class="-translate-y-2 rounded-lg bg-white/5 p-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
							>
								<ArrowUpRight size={20} />
							</div>
						</div>
						<p class="line-clamp-2 text-sm text-surface-400">
							{project.excerpt || project.description || 'View project details and outcome.'}
						</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
