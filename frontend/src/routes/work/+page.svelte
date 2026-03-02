<script lang="ts">
	let { data } = $props();

	const page = data?.page;
	const projects = data?.projects ?? [];

	const title = page?.title || 'Work';
	const description =
		page?.description ||
		'Selected case studies in product design, engineering, and creative technology.';
</script>

<section class="work-shell">
	<div class="work-hero">
		<p class="label">Case Studies</p>
		<h1>{title}</h1>
		<p>{description}</p>
	</div>

	{#if projects.length === 0}
		<div class="empty-state">
			<h2>No projects published yet.</h2>
			<p>Publish `project` or `portfolioProject` docs in Sanity to populate this page.</p>
		</div>
	{:else}
		<div class="project-grid">
			{#each projects as project}
				<a class="project-card" href={`/work/${project?.slug?.current || project?.slug}`}>
					<div class="media-wrap">
						{#if project?.cover?.asset?.url}
							<img
								src={project.cover.asset.url}
								alt={project.cover?.alt || project.title}
								loading="lazy"
								decoding="async"
							/>
						{:else}
							<div class="media-fallback">{project.title?.charAt(0)}</div>
						{/if}
					</div>
					<div class="card-meta">
						<div class="meta-top">
							<span>{project.category || 'Project'}</span>
							{#if project.year}
								<span>{project.year}</span>
							{/if}
						</div>
						<h2>{project.title}</h2>
						{#if project.excerpt}
							<p>{project.excerpt}</p>
						{/if}
						{#if project.tags?.length}
							<div class="tags">
								{#each project.tags.slice(0, 3) as tag}
									<small>{tag}</small>
								{/each}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</section>

<style>
	.work-shell {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 1.25rem 6rem;
	}

	.work-hero {
		margin-bottom: 2.5rem;
	}

	.label {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 0.8rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.1rem, 5vw, 3.7rem);
		line-height: 1.05;
	}

	.work-hero p {
		max-width: 60ch;
		color: var(--color-muted-text);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 1rem;
	}

	.project-card {
		grid-column: span 12;
		display: grid;
		grid-template-columns: 1fr;
		border: 1px solid var(--color-edge);
		border-radius: 1.25rem;
		overflow: hidden;
		background: var(--color-panel);
		text-decoration: none;
		color: inherit;
		transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
	}

	.project-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-accent);
		box-shadow: 0 24px 60px rgba(3, 7, 18, 0.4);
	}

	.media-wrap {
		aspect-ratio: 16 / 10;
		background: linear-gradient(140deg, #0f172a, #111827);
	}

	.media-wrap img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.media-fallback {
		display: grid;
		place-items: center;
		height: 100%;
		font-size: 3rem;
		font-weight: 700;
		color: rgb(148 163 184 / 0.45);
	}

	.card-meta {
		padding: 1.05rem 1.1rem 1.2rem;
	}

	.meta-top {
		display: flex;
		justify-content: space-between;
		gap: 0.8rem;
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-family: var(--font-mono);
		color: var(--color-muted-text);
	}

	h2 {
		font-size: 1.2rem;
		margin: 0.65rem 0 0.45rem;
	}

	.card-meta p {
		margin: 0;
		color: var(--color-muted-text);
		line-height: 1.5;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.9rem;
	}

	.tags small {
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		background: var(--color-chip);
		font-family: var(--font-mono);
		font-size: 0.64rem;
		letter-spacing: 0.04em;
	}

	.empty-state {
		border: 1px dashed var(--color-edge);
		border-radius: 1rem;
		padding: 2rem;
		text-align: center;
		background: var(--color-panel);
	}

	.empty-state p {
		color: var(--color-muted-text);
	}

	@media (min-width: 820px) {
		.project-card {
			grid-column: span 6;
		}
	}

	@media (min-width: 1100px) {
		.project-card {
			grid-column: span 4;
		}
	}
</style>
