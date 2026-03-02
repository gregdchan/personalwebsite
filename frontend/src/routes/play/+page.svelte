<script lang="ts">
	let { data } = $props();

	const page = data?.page;
	const posts = data?.posts ?? [];

	const title = page?.title || 'Play';
	const description =
		page?.description ||
		'Writing about process, experimentation, design systems, and creative technology.';
</script>

<section class="play-shell">
	<div class="play-hero">
		<p class="label">Writing and Notes</p>
		<h1>{title}</h1>
		<p>{description}</p>
	</div>

	{#if posts.length === 0}
		<div class="empty-state">
			<h2>No posts published yet.</h2>
			<p>Publish `post` or `blogPost` documents in Sanity to populate this page.</p>
		</div>
	{:else}
		<div class="post-grid">
			{#each posts as post}
				<a class="post-card" href={`/play/${post?.slug?.current || post?.slug}`}>
					{#if post?.cover?.asset?.url}
						<div class="media-wrap">
							<img
								src={post.cover.asset.url}
								alt={post.cover?.alt || post.title}
								loading="lazy"
								decoding="async"
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
							<p>{post.excerpt}</p>
						{/if}
						{#if post.tags?.length}
							<div class="tags">
								{#each post.tags.slice(0, 3) as tag}
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
	.play-shell {
		max-width: 1120px;
		margin: 0 auto;
		padding: 3rem 1.25rem 6rem;
	}

	.play-hero {
		margin-bottom: 2.2rem;
	}

	.label {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
		margin-bottom: 0.8rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.1rem, 5vw, 3.7rem);
		line-height: 1.05;
	}

	.play-hero p {
		max-width: 64ch;
		color: var(--color-muted-text);
	}

	.post-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
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
		transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
	}

	.post-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-accent-alt);
		box-shadow: 0 20px 46px rgba(2, 8, 20, 0.45);
	}

	.media-wrap {
		aspect-ratio: 16 / 9;
		background: linear-gradient(135deg, #102448, #11233e);
	}

	.media-wrap img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-meta {
		padding: 1rem 1rem 1.2rem;
	}

	.meta-top {
		font-family: var(--font-mono);
		font-size: 0.67rem;
		color: var(--color-muted-text);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h2 {
		font-size: 1.12rem;
		margin: 0.55rem 0 0.45rem;
	}

	.card-meta p {
		margin: 0;
		color: var(--color-muted-text);
		line-height: 1.5;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.85rem;
	}

	.tags small {
		padding: 0.2rem 0.48rem;
		border-radius: 999px;
		background: var(--color-chip);
		font-size: 0.64rem;
		font-family: var(--font-mono);
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
</style>
