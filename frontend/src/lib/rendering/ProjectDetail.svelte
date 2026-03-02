<script lang="ts">
	import PortableText from '$lib/rendering/PortableText.svelte';
	import { ArrowLeft, ExternalLink, Github } from 'lucide-svelte';

	let { project = {} }: { project: any } = $props();

	const title = project?.title || 'Project';
	const excerpt = project?.excerpt || '';
	const cover = project?.cover?.asset?.url;
	const body = project?.body || [];
	const intro = project?.introduction || [];
	const challenge = project?.challenge || [];
	const resultDescription = project?.resultDescription || [];
	const tags = project?.tags || [];
	const year = project?.year;
	const gallery = project?.gallery || [];
	const caseStudySections = project?.caseStudySections || [];
	const technologies = project?.technologies || [];
	const roles = project?.roles || [];
	const collaborators = project?.collaborators || [];
	const liveUrl = project?.externalUrl || project?.liveUrl || project?.url;

	const clientLabel =
		typeof project?.client === 'string'
			? project.client
			: project?.client?.name || project?.client?.title || null;

	const contentBlocks =
		intro.length > 0 || challenge.length > 0 || resultDescription.length > 0
			? [
					{ heading: 'Introduction', blocks: intro },
					{ heading: 'Challenge', blocks: challenge },
					{ heading: project?.resultTitle || 'Result', blocks: resultDescription }
				].filter((section) => section.blocks?.length > 0)
			: [];
</script>

<article class="project-detail">
	<header class="hero">
		{#if cover}
			<img src={cover} alt={title} class="hero-image" />
		{/if}
		<div class="hero-overlay"></div>
		<div class="hero-copy">
			<a href="/work" class="back-link"><ArrowLeft size={16} /> Back to Work</a>
			<div class="meta-line">
				{#if project?.category}
					<span>{project.category}</span>
				{/if}
				{#if year}
					<span>{year}</span>
				{/if}
			</div>
			<h1>{title}</h1>
			{#if excerpt}
				<p>{excerpt}</p>
			{/if}
		</div>
	</header>

	<div class="content-shell">
		<div class="content-main">
			{#if body.length > 0}
				<section class="content-block">
					<PortableText blocks={body} />
				</section>
			{/if}

			{#each contentBlocks as block}
				<section class="content-block">
					<h2>{block.heading}</h2>
					<PortableText blocks={block.blocks} />
				</section>
			{/each}

			{#if caseStudySections.length > 0}
				<section class="content-block">
					<h2>Case Study</h2>
					<div class="split-gallery">
						{#each caseStudySections as section}
							<article class="case-card">
								<h3>{section.title}</h3>
								{#if section.description}
									<p>{section.description}</p>
								{/if}
								<div class="case-media">
									{#if section.imageA?.asset?.url}
										<img src={section.imageA.asset.url} alt={section.imageA?.alt || section.title} />
									{/if}
									{#if section.imageB?.asset?.url}
										<img src={section.imageB.asset.url} alt={section.imageB?.alt || section.title} />
									{/if}
								</div>
							</article>
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<aside class="content-aside">
			<section>
				<h3>Overview</h3>
				{#if clientLabel}
					<p><strong>Client</strong> {clientLabel}</p>
				{/if}
				{#if roles.length > 0}
					<p><strong>Roles</strong> {roles.join(', ')}</p>
				{/if}
				{#if collaborators.length > 0}
					<p><strong>Collaborators</strong> {collaborators.join(', ')}</p>
				{/if}
			</section>

			{#if technologies.length > 0}
				<section>
					<h3>Stack</h3>
					<div class="tag-row">
						{#each technologies as tech}
							<small>{tech}</small>
						{/each}
					</div>
				</section>
			{/if}

			{#if tags.length > 0}
				<section>
					<h3>Tags</h3>
					<div class="tag-row">
						{#each tags as tag}
							<small>{tag}</small>
						{/each}
					</div>
				</section>
			{/if}

			<section>
				<h3>Links</h3>
				<div class="link-row">
					{#if liveUrl}
						<a href={liveUrl} target="_blank" rel="noopener noreferrer"
							>Live Site <ExternalLink size={14} /></a
						>
					{/if}
					{#if project?.githubUrl}
						<a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
							>Source <Github size={14} /></a
						>
					{/if}
				</div>
			</section>
		</aside>
	</div>

	{#if gallery.length > 0}
		<section class="gallery-strip">
			<h2>Gallery</h2>
			<div class="gallery-grid">
				{#each gallery as image}
					{#if image?.asset?.url}
						<img
							src={image.asset.url}
							alt={image.alt || title}
							loading="lazy"
							decoding="async"
						/>
					{/if}
				{/each}
			</div>
		</section>
	{/if}
</article>

<style>
	.project-detail {
		padding-bottom: 4.5rem;
	}

	.hero {
		position: relative;
		min-height: min(70vh, 680px);
		overflow: hidden;
		border-bottom: 1px solid var(--color-edge);
	}

	.hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.42;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(3, 7, 18, 0.18) 0%, rgba(3, 7, 18, 0.9) 78%);
	}

	.hero-copy {
		position: relative;
		z-index: 1;
		max-width: 1100px;
		margin: 0 auto;
		padding: 2.4rem 1.25rem 2.4rem;
		display: grid;
		align-content: end;
		min-height: min(70vh, 680px);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--color-muted-text);
		width: fit-content;
	}

	.back-link:hover {
		color: var(--color-accent);
	}

	.meta-line {
		display: flex;
		gap: 0.5rem;
		margin-top: 1.2rem;
	}

	.meta-line span {
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		font-size: 0.65rem;
		font-family: var(--font-mono);
		letter-spacing: 0.07em;
		text-transform: uppercase;
		background: rgba(15, 23, 42, 0.5);
		border: 1px solid rgba(148, 163, 184, 0.24);
	}

	h1 {
		margin: 0.8rem 0 0.65rem;
		font-size: clamp(2.2rem, 6vw, 4.8rem);
		line-height: 0.96;
		max-width: 16ch;
	}

	.hero-copy p {
		margin: 0;
		max-width: 62ch;
		font-size: clamp(1rem, 1.4vw, 1.2rem);
		color: var(--color-muted-text);
		line-height: 1.6;
	}

	.content-shell {
		max-width: 1100px;
		margin: 0 auto;
		padding: 1.8rem 1.25rem 0;
		display: grid;
		gap: 1rem;
	}

	.content-block {
		padding: 1.1rem;
		border: 1px solid var(--color-edge);
		border-radius: 1rem;
		background: var(--color-panel);
	}

	.content-block h2 {
		font-size: 1.16rem;
		margin: 0 0 0.85rem;
	}

	.content-aside {
		display: grid;
		gap: 0.75rem;
	}

	.content-aside section {
		padding: 1rem;
		border-radius: 1rem;
		background: var(--color-panel);
		border: 1px solid var(--color-edge);
	}

	.content-aside h3 {
		margin: 0 0 0.6rem;
		font-size: 0.93rem;
	}

	.content-aside p {
		margin: 0.35rem 0;
		line-height: 1.5;
		font-size: 0.95rem;
		color: var(--color-muted-text);
	}

	.content-aside strong {
		font-size: 0.68rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		font-family: var(--font-mono);
		margin-right: 0.35rem;
		color: var(--color-body-text);
	}

	.tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tag-row small {
		padding: 0.2rem 0.45rem;
		background: var(--color-chip);
		border-radius: 999px;
		font-size: 0.64rem;
		font-family: var(--font-mono);
	}

	.link-row {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.link-row a {
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.88rem;
		color: var(--color-body-text);
	}

	.link-row a:hover {
		color: var(--color-accent);
	}

	.split-gallery {
		display: grid;
		gap: 0.8rem;
	}

	.case-card {
		padding: 0.85rem;
		border-radius: 0.8rem;
		border: 1px solid var(--color-edge);
		background: rgba(15, 23, 42, 0.35);
	}

	.case-card h3 {
		margin: 0;
		font-size: 1rem;
	}

	.case-card p {
		margin: 0.45rem 0 0.7rem;
		line-height: 1.5;
		color: var(--color-muted-text);
	}

	.case-media {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;
	}

	.case-media img {
		width: 100%;
		height: 140px;
		object-fit: cover;
		border-radius: 0.6rem;
		border: 1px solid var(--color-edge);
	}

	.gallery-strip {
		max-width: 1100px;
		margin: 1.6rem auto 0;
		padding: 0 1.25rem;
	}

	.gallery-strip h2 {
		font-size: 1.15rem;
		margin: 0 0 0.7rem;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 0.8rem;
	}

	.gallery-grid img {
		width: 100%;
		height: 220px;
		object-fit: cover;
		border-radius: 0.9rem;
		border: 1px solid var(--color-edge);
		background: var(--color-panel);
	}

	@media (min-width: 960px) {
		.content-shell {
			grid-template-columns: minmax(0, 1fr) 290px;
		}

		.content-main {
			display: grid;
			gap: 1rem;
		}
	}
</style>
