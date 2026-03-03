<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { optimizedUrl } from '$lib/sanity';

	let { data } = $props();

	const page = data?.page ?? {};
	const projects = Array.isArray(data?.projects) ? data.projects : [];

	const leadProject = projects[0] ?? null;
	const secondaryProjects = projects.slice(1);

	const title = page?.title || 'Work';
	const description =
		page?.description ||
		'Selected case studies in product design, engineering, and creative technology.';
</script>

<svelte:head>
	<title>{title} — Greg D. Chan</title>
	<meta name="description" content={description} />
</svelte:head>

<section class="work-shell" aria-labelledby="work-heading">
	<div class="shell">
		<header class="work-hero" use:reveal={{ delay: 25 }}>
			<p class="label">Case Studies</p>
			<h1 id="work-heading">{title}</h1>
			<p class="intro">{description}</p>
			{#if projects.length > 0}
				<p class="count">{projects.length} published project{projects.length !== 1 ? 's' : ''}</p>
			{/if}
		</header>

		{#if projects.length === 0}
			<div class="empty-state" role="status">
				<h2>No projects published yet.</h2>
				<p>Publish `project` documents in Sanity to populate this page.</p>
			</div>
		{:else}
			{#if leadProject}
				{@const cover = leadProject?.cover || leadProject?.mainImage}
				<a
					class="work-lead"
					href={`/work/${leadProject?.slug?.current || leadProject?.slug}`}
					use:reveal={{ delay: 90 }}
					aria-label={`Featured: ${leadProject?.title}`}
				>
					<div class="work-image-wrap lead-media">
						{#if cover?.asset?.url}
							<img
								src={optimizedUrl(cover, 1200)}
								alt={cover?.alt || leadProject.title}
								loading="eager"
								decoding="async"
								width="700"
								height="394"
								fetchpriority="high"
							/>
						{:else}
							<div class="work-image-fallback" aria-hidden="true">
								{leadProject?.title?.charAt(0) || 'P'}
							</div>
						{/if}
					</div>
					<div class="work-copy">
						<div class="work-meta">
							<span>Featured Case Study</span>
							{#if leadProject?.category}<span>{leadProject.category}</span>{/if}
							{#if leadProject?.year}<span>{leadProject.year}</span>{/if}
						</div>
						<h2>{leadProject?.title}</h2>
						{#if leadProject?.excerpt}
							<p>{leadProject.excerpt}</p>
						{/if}
						{#if leadProject?.tags?.length}
							<div class="tags" role="list" aria-label="Project tags">
								{#each leadProject.tags.slice(0, 4) as tag}
									<small role="listitem">{tag}</small>
								{/each}
							</div>
						{/if}
						<strong>Read full case study →</strong>
					</div>
				</a>
			{/if}

			{#if secondaryProjects.length > 0}
				<div class="work-grid">
					{#each secondaryProjects as project, index}
						{@const cover = project?.cover || project?.mainImage}
						<a
							class="work-card"
							href={`/work/${project?.slug?.current || project?.slug}`}
							use:reveal={{ delay: 130 + index * 50 }}
							aria-label={`Case study: ${project?.title}`}
						>
							<div class="work-image-wrap">
								{#if cover?.asset?.url}
									<img
										src={optimizedUrl(cover, 800)}
										alt={cover?.alt || project.title}
										loading="lazy"
										decoding="async"
										width="600"
										height="338"
									/>
								{:else}
									<div class="work-image-fallback" aria-hidden="true">
										{project?.title?.charAt(0) || 'P'}
									</div>
								{/if}
							</div>
							<div class="work-copy">
								<div class="work-meta">
									<span>Case {String(index + 2).padStart(2, '0')}</span>
									{#if project?.category}<span>{project.category}</span>{/if}
									{#if project?.year}<span>{project.year}</span>{/if}
								</div>
								<h2>{project?.title}</h2>
								{#if project?.excerpt}
									<p>{project.excerpt}</p>
								{/if}
								{#if project?.tags?.length}
									<div class="tags" role="list" aria-label="Project tags">
										{#each project.tags.slice(0, 3) as tag}
											<small role="listitem">{tag}</small>
										{/each}
									</div>
								{/if}
								<strong>Open case study →</strong>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.work-shell {
		padding: clamp(2.2rem, 5vw, 3.6rem) 0 clamp(4rem, 8vw, 7rem);
	}

	.shell {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 3vw, 1.25rem);
	}

	.work-hero {
		margin-bottom: clamp(1.5rem, 3vw, 2.35rem);
	}

	.label {
		margin: 0 0 0.72rem;
		font-family: var(--font-mono);
		font-size: clamp(0.6rem, 1.2vw, 0.68rem);
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
	}

	.work-hero h1 {
		margin: 0;
		font-size: clamp(2.1rem, 5vw, 4rem);
		line-height: 0.98;
		max-width: 12ch;
	}

	.intro {
		margin: 1rem 0 0;
		max-width: 62ch;
		line-height: 1.72;
		color: var(--color-muted-text);
		font-size: clamp(0.9rem, 1.5vw, 1rem);
	}

	.count {
		margin: 1rem 0 0;
		font-family: var(--font-mono);
		font-size: 0.64rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.work-lead {
		display: grid;
		gap: 1.25rem;
		text-decoration: none;
		color: inherit;
		border: 1px solid color-mix(in oklab, var(--color-edge) 84%, transparent);
		border-radius: clamp(0.85rem, 2vw, 1.22rem);
		padding: clamp(0.75rem, 1.5vw, 1.1rem);
		background: color-mix(in oklab, var(--color-panel) 90%, transparent);
		transition:
			border-color 220ms ease,
			transform 220ms ease,
			box-shadow 220ms ease;
	}

	.work-lead:hover {
		transform: translateY(-3px);
		border-color: color-mix(in oklab, var(--color-accent) 66%, transparent);
		box-shadow: 0 18px 38px color-mix(in oklab, black 12%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.work-lead:hover,
		.work-card:hover {
			transform: none;
		}
	}

	.work-grid {
		margin-top: clamp(1.2rem, 2.5vw, 1.6rem);
		display: grid;
		gap: clamp(1rem, 2vw, 1.5rem);
	}

	.work-card {
		display: grid;
		gap: 1rem;
		text-decoration: none;
		color: inherit;
		border: 1px solid color-mix(in oklab, var(--color-edge) 74%, transparent);
		border-radius: clamp(0.85rem, 2vw, 1.12rem);
		padding: clamp(0.75rem, 1.5vw, 1rem);
		background: color-mix(in oklab, var(--color-panel) 86%, transparent);
		transition:
			border-color 180ms ease,
			transform 180ms ease;
	}

	.work-card:hover {
		border-color: color-mix(in oklab, var(--color-accent) 62%, transparent);
		transform: translateY(-2px);
	}

	.work-image-wrap {
		border-radius: clamp(0.65rem, 1.5vw, 1rem);
		overflow: hidden;
		border: 1px solid color-mix(in oklab, var(--color-edge) 70%, transparent);
		background: var(--color-panel);
		aspect-ratio: 16 / 9;
		box-shadow: 0 14px 34px color-mix(in oklab, black 12%, transparent);
	}

	.work-image-wrap img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.98) contrast(1.03);
	}

	.lead-media {
		aspect-ratio: 16 / 9;
	}

	.work-image-fallback {
		display: grid;
		place-items: center;
		height: 100%;
		font-size: clamp(2rem, 5vw, 3rem);
		color: color-mix(in oklab, var(--color-accent) 42%, var(--color-muted-text));
	}

	.work-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.work-meta span {
		font-family: var(--font-mono);
		font-size: 0.63rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.work-copy h2 {
		margin: 0.7rem 0 0.5rem;
		font-size: clamp(1.15rem, 2.1vw, 1.86rem);
		line-height: 1.2;
	}

	.work-copy p {
		margin: 0;
		line-height: 1.72;
		color: var(--color-muted-text);
		max-width: 68ch;
		font-size: clamp(0.85rem, 1.3vw, 1rem);
	}

	.work-copy strong {
		display: inline-block;
		margin-top: 0.95rem;
		font-family: var(--font-mono);
		font-size: 0.67rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.95rem;
	}

	.tags small {
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		background: var(--color-chip);
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.empty-state {
		border: 1px dashed color-mix(in oklab, var(--color-edge) 72%, transparent);
		border-radius: 1rem;
		padding: clamp(1.2rem, 3vw, 1.8rem);
		text-align: center;
		background: color-mix(in oklab, var(--color-panel) 88%, transparent);
	}

	.empty-state h2 {
		margin: 0;
		font-size: 1.2rem;
	}

	.empty-state p {
		margin: 0.6rem 0 0;
		color: var(--color-muted-text);
	}

	/* Tablet layout */
	@media (min-width: 680px) {
		.work-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 920px) {
		.work-lead {
			grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
			align-items: center;
			gap: 1.5rem;
			padding: 1.25rem;
		}

		.work-card {
			padding: 1.22rem;
		}
	}
</style>
