<script lang="ts">
	import PortableText from '$lib/rendering/PortableText.svelte';

	let { data } = $props();
	const post = data?.post;

	const publishedAt = post?.publishedAt
		? new Date(post.publishedAt).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		: null;
</script>

<article class="post-detail">
	<div class="back-link-wrap">
		<a href="/play" class="back-link">Back to Play</a>
	</div>

	<header class="post-header">
		{#if publishedAt}
			<time datetime={post.publishedAt}>{publishedAt}</time>
		{/if}
		<h1>{post?.title}</h1>
		{#if post?.excerpt}
			<p>{post.excerpt}</p>
		{/if}
		{#if post?.tags?.length}
			<div class="tags">
				{#each post.tags as tag}
					<a href={`/play?tag=${encodeURIComponent(tag)}`}>{tag}</a>
				{/each}
			</div>
		{/if}
	</header>

	{#if post?.cover?.asset?.url}
		<div class="cover-wrap">
			<img src={post.cover.asset.url} alt={post.cover?.alt || post.title} />
		</div>
	{/if}

	<div class="body-wrap">
		<PortableText blocks={post?.body || []} />
	</div>
</article>

<style>
	.post-detail {
		max-width: 860px;
		margin: 0 auto;
		padding: 2.7rem 1.25rem 5.2rem;
	}

	.back-link-wrap {
		margin-bottom: 1.2rem;
	}

	.back-link {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-muted-text);
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--color-accent-alt);
	}

	.post-header time {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-muted-text);
	}

	.post-header h1 {
		margin: 0.55rem 0 0.8rem;
		font-size: clamp(2rem, 5vw, 3.2rem);
		line-height: 1.08;
	}

	.post-header p {
		color: var(--color-muted-text);
		font-size: 1.04rem;
		line-height: 1.65;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 0.9rem;
	}

	.tags a {
		display: inline-flex;
		align-items: center;
		padding: 0.2rem 0.55rem;
		background: var(--color-chip);
		border-radius: 999px;
		font-size: 0.66rem;
		font-family: var(--font-mono);
		color: var(--color-muted-text);
		text-decoration: none;
		border: 1px solid transparent;
		transition:
			border-color 140ms ease,
			color 140ms ease,
			background-color 140ms ease;
	}

	.tags a:hover {
		border-color: color-mix(in oklab, var(--color-accent) 54%, transparent);
		color: var(--color-text);
	}

	.cover-wrap {
		margin: 1.7rem 0;
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid var(--color-edge);
		background: var(--color-panel);
	}

	.cover-wrap img {
		display: block;
		width: 100%;
		height: auto;
	}

	.body-wrap {
		background: var(--color-panel);
		border: 1px solid var(--color-edge);
		border-radius: 1rem;
		padding: 1.35rem;
	}

	@media (min-width: 760px) {
		.body-wrap {
			padding: 1.8rem;
		}
	}
</style>
