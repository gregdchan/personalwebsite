<script lang="ts">
	import { optimizedUrl } from '$lib/sanity';
	let { data } = $props();

	const page = data?.page;
	const posts = data?.posts ?? [];

	const title = page?.title || 'Play';
	const description =
		page?.description ||
		'Writing about process, experimentation, design systems, and creative technology.';
</script>

<svelte:head>
	<title>{title} — Greg D. Chan</title>
	<meta name="description" content={description} />
</svelte:head>

<section class="play-shell" aria-labelledby="play-heading">
	<div class="play-hero">
		<p class="label">Writing and Notes</p>
		<h1 id="play-heading">{title}</h1>
		<p class="intro-text">{description}</p>
	</div>

	{#if posts.length === 0}
		<div class="empty-state" role="status">
			<h2>No posts published yet.</h2>
			<p>Publish `post` or `blogPost` documents in Sanity to populate this page.</p>
		</div>
	{:else}
		<div class="post-grid">
			{#each posts as post}
				{@const cover = post?.cover || post?.mainImage}
				<a
					class="post-card"
					href={`/play/${post?.slug?.current || post?.slug}`}
					aria-label={`Read post: ${post.title}`}
				>
					{#if cover?.asset?.url}
						<div class="media-wrap">
							<img
								src={optimizedUrl(cover, 600)}
								alt={cover?.alt || ''}
								loading="lazy"
								decoding="async"
								width="400"
								height="225"
							/>
						</div>
					{/if}
					<div class="card-meta">
						<div class="meta-top">
							{#if post.publishedAt}
								<time datetime={post.publishedAt}>
									{new Date(post.publishedAt).toLocaleDateString(undefined, {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}
								</time>
							{:else}
								<span>Draft</span>
							{/if}
						</div>
						<h2>{post.title}</h2>
						{#if post.excerpt}
							<p class="excerpt">{post.excerpt}</p>
						{/if}
						{#if post.tags?.length}
							<div class="tags" role="list" aria-label="Post tags">
								{#each post.tags.slice(0, 3) as tag}
									<small role="listitem">{tag}</small>
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
	.play-shell {
		max-width: 1120px;
		margin: 0 auto;
		padding: clamp(2rem, 5vw, 4rem) clamp(0.75rem, 3vw, 1.25rem) clamp(4rem, 8vw, 6rem);
	}

	.play-hero {
		margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
	}

	.label {
		font-family: var(--font-mono);
		font-size: clamp(0.65rem, 1.2vw, 0.72rem);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
		margin-bottom: 0.8rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.25rem, 7vw, 3.75rem);
		line-height: 1.05;
	}

	.intro-text {
		margin-top: 1rem;
		max-width: 62ch;
		color: var(--color-muted-text);
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.6;
	}

	.post-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.5rem);
		margin-top: clamp(1.5rem, 4vw, 2.5rem);
	}

	.post-card {
		display: flex;
		flex-direction: column;
		border-radius: 1rem;
		border: 1px solid var(--color-edge);
		overflow: hidden;
		text-decoration: none;
		background: var(--color-panel);
		color: inherit;
		transition:
			transform 220ms ease,
			border-color 220ms ease,
			box-shadow 220ms ease;
	}

	.post-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-accent-alt);
		box-shadow: 0 20px 46px rgba(0, 0, 0, 0.15);
	}

	@media (prefers-reduced-motion: reduce) {
		.post-card:hover {
			transform: none;
		}
	}

	.media-wrap {
		aspect-ratio: 16 / 9;
		background: color-mix(in oklab, var(--color-panel) 80%, black);
		overflow: hidden;
	}

	.media-wrap img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 400ms ease;
	}

	.post-card:hover .media-wrap img {
		transform: scale(1.03);
	}

	.card-meta {
		padding: clamp(1rem, 2vw, 1.25rem);
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.meta-top {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-muted-text);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.card-meta h2 {
		font-size: clamp(1.1rem, 1.8vw, 1.35rem);
		margin: 0.6rem 0 0.5rem;
		line-height: 1.3;
	}

	.excerpt {
		margin: 0;
		color: var(--color-muted-text);
		line-height: 1.55;
		font-size: clamp(0.875rem, 1.4vw, 0.95rem);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 1.25rem;
	}

	.tags small {
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		background: var(--color-chip);
		font-size: 0.65rem;
		font-family: var(--font-mono);
		color: var(--color-muted-text);
	}

	.empty-state {
		border: 1px dashed var(--color-edge);
		border-radius: 1rem;
		padding: 3rem 1.5rem;
		text-align: center;
		background: var(--color-panel);
		margin-top: 2rem;
	}

	.empty-state h2 {
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		color: var(--color-muted-text);
	}

	/* Responsive Grid */
	@media (min-width: 640px) {
		.post-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 960px) {
		.post-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
