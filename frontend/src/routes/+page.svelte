<script lang="ts">
	import SectionRenderer from '$lib/rendering/SectionRenderer.svelte';

	let { data } = $props();

	const sections = data?.page?.sections ?? [];
	const projects = data.projects ?? [];
	const posts = data.posts ?? [];
</script>

<div class="page-content home-shell">
	{#if sections.length > 0}
		<SectionRenderer {sections} />
	{:else}
		<section class="fallback-hero">
			<p class="eyebrow">Greg D. Chan</p>
			<h1>Creative Technologist building high-craft digital products.</h1>
			<p>
				Your homepage sections are not published yet in Sanity, so this fallback is shown. Add sections
				to the index page document to control this screen.
			</p>
			<div class="hero-actions">
				<a href="/work">Explore Work</a>
				<a href="/play">Read Play</a>
			</div>
		</section>
	{/if}

	{#if projects.length > 0}
		<section class="strip">
			<div class="strip-head">
				<h2>Featured Work</h2>
				<a href="/work">View all</a>
			</div>
			<div class="cards-grid">
				{#each projects.slice(0, 3) as project}
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
						<div class="meta">
							<span>{project.category || 'Project'}</span>
							<h3>{project.title}</h3>
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if posts.length > 0}
		<section class="strip">
			<div class="strip-head">
				<h2>Latest From Play</h2>
				<a href="/play">Read all</a>
			</div>
			<div class="cards-grid">
				{#each posts.slice(0, 3) as post}
					<a class="post-card" href={`/play/${post?.slug?.current || post?.slug}`}>
						<div class="meta">
							{#if post.publishedAt}
								<time datetime={post.publishedAt}>
									{new Date(post.publishedAt).toLocaleDateString(undefined, {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}
								</time>
							{/if}
							<h3>{post.title}</h3>
							{#if post.excerpt}
								<p>{post.excerpt}</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.home-shell {
		padding-bottom: 5rem;
	}

	.fallback-hero {
		max-width: 1100px;
		margin: 2.2rem auto 3.5rem;
		padding: 0 1.25rem;
	}

	.eyebrow {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.13em;
		font-size: 0.72rem;
		color: var(--color-accent);
	}

	h1 {
		font-size: clamp(2.2rem, 7vw, 5.4rem);
		line-height: 0.95;
		max-width: 14ch;
		margin: 0.4rem 0 1rem;
	}

	.fallback-hero p {
		max-width: 63ch;
		color: var(--color-muted-text);
	}

	.hero-actions {
		margin-top: 1.4rem;
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.hero-actions a {
		text-decoration: none;
		padding: 0.62rem 1rem;
		border-radius: 999px;
		border: 1px solid var(--color-edge);
		background: var(--color-panel);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--color-body-text);
	}

	.strip {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	.strip + .strip {
		margin-top: 2.2rem;
	}

	.strip-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.8rem;
	}

	.strip-head h2 {
		font-size: clamp(1.35rem, 2vw, 1.8rem);
		margin: 0;
	}

	.strip-head a {
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.09em;
		color: var(--color-muted-text);
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 0.9rem;
	}

	.project-card,
	.post-card {
		border: 1px solid var(--color-edge);
		border-radius: 1rem;
		overflow: hidden;
		background: var(--color-panel);
		color: inherit;
		text-decoration: none;
		transition: transform 180ms ease, border-color 180ms ease;
	}

	.project-card:hover,
	.post-card:hover {
		transform: translateY(-3px);
		border-color: var(--color-accent);
	}

	.media-wrap {
		aspect-ratio: 16 / 10;
		background: linear-gradient(135deg, #12264a, #102138);
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
		font-size: 2.8rem;
		color: rgb(148 163 184 / 0.45);
	}

	.meta {
		padding: 0.95rem 1rem 1.1rem;
	}

	.meta span,
	time {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-muted-text);
	}

	h3 {
		margin: 0.6rem 0 0.3rem;
		font-size: 1.05rem;
		line-height: 1.35;
	}

	.meta p {
		margin: 0;
		color: var(--color-muted-text);
		font-size: 0.95rem;
		line-height: 1.45;
	}
</style>
