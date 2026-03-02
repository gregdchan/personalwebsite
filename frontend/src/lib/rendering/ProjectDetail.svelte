<script lang="ts">
	import PortableText from '$lib/rendering/PortableText.svelte';
	import { ArrowLeft, ExternalLink, Github } from 'lucide-svelte';

	let { project = {} }: { project: any } = $props();

	const title = project?.title || 'Project';
	const excerpt = project?.excerpt || '';
	const cover = project?.cover?.asset?.url;
	const body = project?.body || [];
	const tags = project?.tags || [];
	const year = project?.year;
	const client = project?.client;
	const results = project?.results || [];
	const gallery = project?.gallery || [];
</script>

<div class="project-detail animate-fade-in pb-20">
	<!-- Hero Section -->
	<header class="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-surface-900">
		{#if cover}
			<img
				src={cover}
				alt={title}
				class="h-full w-full object-cover opacity-50 grayscale transition-all duration-1000 hover:grayscale-0"
			/>
		{/if}
		<div
			class="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent"
		></div>

		<div class="absolute inset-0 flex items-end">
			<div class="container mx-auto max-w-7xl px-6 pb-16 lg:px-16">
				<a
					href="/work"
					class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-surface-400 transition-colors hover:text-primary-500"
				>
					<ArrowLeft size={16} /> Back to Work
				</a>
				<div class="mb-4 flex flex-wrap items-center gap-3">
					{#each tags as tag}
						<span
							class="rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 font-mono text-xs tracking-widest text-primary-400 uppercase"
							>{tag}</span
						>
					{/each}
					{#if year}
						<span class="font-mono text-xs tracking-widest text-surface-500 uppercase">{year}</span>
					{/if}
				</div>
				<h1 class="mb-4 text-5xl font-black tracking-tighter text-white lg:text-7xl">{title}</h1>
				{#if excerpt}
					<p class="max-w-2xl text-xl leading-relaxed font-medium text-surface-300">{excerpt}</p>
				{/if}
			</div>
		</div>
	</header>

	<!-- Main Content Info -->
	<div class="container mx-auto max-w-7xl px-6 pt-16 lg:px-16">
		<div class="grid gap-16 lg:grid-cols-[1fr_350px]">
			<!-- Body Content -->
			<div>
				{#if body.length > 0}
					<div class="prose prose-invert prose-lg max-w-none">
						<PortableText blocks={body} />
					</div>
				{:else}
					<div class="rounded-2xl border border-white/5 bg-white/5 p-12 text-center">
						<p class="text-surface-500">Case study content coming soon...</p>
					</div>
				{/if}

				<!-- Results/KPIs -->
				{#if results.length > 0}
					<div class="mt-16 grid gap-6 sm:grid-cols-2">
						{#each results as res}
							<div class="rounded-2xl border border-white/5 bg-white/5 p-6">
								<div
									class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500"
								>
									{#if res.icon?.asset?.url}
										<img src={res.icon.asset.url} alt="" class="h-6 w-6" />
									{:else}
										<div class="h-2 w-2 rounded-full bg-current"></div>
									{/if}
								</div>
								<h4 class="mb-2 text-lg font-bold text-white">{res.title}</h4>
								<p class="text-sm leading-relaxed text-surface-400">{res.text}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Sidebar Info -->
			<aside class="space-y-12">
				<!-- Project Meta -->
				<div class="space-y-8 rounded-2xl border border-white/5 bg-surface-800/30 p-8 pt-6">
					{#if client}
						<div>
							<h4
								class="mb-3 font-mono text-xs font-bold tracking-widest text-surface-500 uppercase"
							>
								Client
							</h4>
							<div class="flex items-center gap-3">
								{#if client.logo?.asset?.url}
									<img src={client.logo.asset.url} alt={client.name} class="h-8 w-auto grayscale" />
								{/if}
								<span class="text-lg font-semibold text-white">{client.name}</span>
							</div>
						</div>
					{/if}

					<div>
						<h4 class="mb-3 font-mono text-xs font-bold tracking-widest text-surface-500 uppercase">
							Links
						</h4>
						<div class="flex flex-col gap-3">
							{#if project.externalUrl}
								<a
									href={project.externalUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-primary-400 hover:text-primary-300"
								>
									Visit Live Site <ExternalLink size={16} />
								</a>
							{/if}
							{#if project.githubUrl}
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-surface-300 hover:text-white"
								>
									View Source on GitHub <Github size={16} />
								</a>
							{/if}
						</div>
					</div>

					{#if project.technologies}
						<div>
							<h4
								class="mb-3 font-mono text-xs font-bold tracking-widest text-surface-500 uppercase"
							>
								Stack
							</h4>
							<div class="flex flex-wrap gap-2">
								{#each project.technologies as tech}
									<span class="rounded bg-white/5 px-2 py-1 text-xs text-surface-300">{tech}</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- Gallery -->
				{#if gallery.length > 0}
					<div class="space-y-4">
						<h4 class="px-2 font-mono text-xs font-bold tracking-widest text-surface-500 uppercase">
							Gallery
						</h4>
						<div class="grid gap-4">
							{#each gallery as img}
								<img
									src={img.asset.url}
									alt={img.alt || title}
									class="w-full rounded-xl border border-white/5 shadow-lg"
								/>
							{/each}
						</div>
					</div>
				{/if}
			</aside>
		</div>
	</div>
</div>

<style>
	.project-detail {
		width: 100%;
	}
	:global(.prose h2) {
		@apply mt-12 mb-6 text-3xl font-bold text-white;
	}
	:global(.prose p) {
		@apply mb-6 leading-relaxed text-surface-300;
	}
</style>
