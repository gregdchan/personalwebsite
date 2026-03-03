<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { optimizedUrl } from '$lib/sanity';
	import SanityImage from '$lib/components/SanityImage.svelte';

	let { data } = $props();

	const page = data?.page ?? {};
	const projects = Array.isArray(data?.projects) ? data.projects : [];
	const featuredProjects = projects.slice(0, 6);

	const portraitSource = page?.mainImage || '/images/headshot.webp';
	const portraitAlt = page?.mainImage?.alt || 'Portrait of Greg D. Chan';

	const profileTitle = 'Product Design & Creative Technology';
	const introLine =
		'Design technologist building AI-powered tools, product experiences, and creative systems that turn ideas into useful software.';

	const practicePoints = [
		{
			title: 'Design Practice',
			copy: 'I combine design thinking with modern innovation to move from ambiguity to clear product direction, useful features, and high-craft execution.'
		},
		{
			title: 'Perspective',
			copy: 'My perspective blends systems thinking, interaction design, and emerging AI capabilities to create products that feel human while performing at scale.'
		},
		{
			title: 'Approach',
			copy: 'I work across strategy, design, and implementation so ideas are not just imagined, but shipped with clarity, quality, and measurable outcomes.'
		}
	];
</script>

<svelte:head>
	<title>Greg D. Chan — Product Design & Creative Technology</title>
	<meta name="description" content={introLine} />
</svelte:head>

<div class="home-page">
	<section class="intro" aria-labelledby="intro-heading">
		<div class="shell intro-wrap">
			<div class="intro-row">
				<figure class="portrait-wrap" use:reveal={{ delay: 25 }}>
					<SanityImage
						image={portraitSource}
						alt={portraitAlt}
						class="portrait"
						loading="eager"
						width={600}
						fetchpriority="high"
					/>
				</figure>
				<div class="intro-copy" use:reveal={{ delay: 70 }}>
					<p class="eyebrow">{profileTitle}</p>
					<h1 id="intro-heading">Hi, I'm Greg.</h1>
					<p class="intro-line">{introLine}</p>
					<div class="hero-cta" role="group" aria-label="Quick navigation">
						<a href="/work">View case studies</a>
						<a href="/about">About</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="case-studies" aria-labelledby="case-studies-heading">
		<div class="shell">
			<div class="practice" use:reveal={{ delay: 25 }}>
				<div class="practice-head">
					<p>Practice & Perspective</p>
					<h2>Design thinking grounded in modern innovation.</h2>
				</div>
				<div class="practice-grid" role="list">
					{#each practicePoints as item, index}
						<article class="practice-card" use:reveal={{ delay: 70 + index * 55 }} role="listitem">
							<h3>{item.title}</h3>
							<p>{item.copy}</p>
						</article>
					{/each}
				</div>
			</div>

			<div class="section-head work-head" use:reveal={{ delay: 20 }}>
				<div>
					<p>Case Studies</p>
					<h2 id="case-studies-heading">Check out my latest work.</h2>
				</div>
				<a href="/work" aria-label="View all case studies">View case studies</a>
			</div>
			{#if featuredProjects.length === 0}
				<div class="empty-state" use:reveal={{ delay: 90 }}>
					<h3>No case studies published yet.</h3>
					<p>
						Publish `project` documents in Sanity to populate this section.
					</p>
				</div>
			{:else}
				<div class="case-grid">
					{#each featuredProjects as project, index}
						{@const cover = project?.cover || project?.mainImage}
						<a
							class="case-card"
							href={`/work/${project?.slug?.current || project?.slug}`}
							use:reveal={{ delay: 70 + index * 40 }}
							aria-label={`Read case study: ${project?.title}`}
						>
							<div class="case-media">
								{#if cover?.asset?.url}
									<SanityImage
										image={cover}
										alt={cover?.alt || project.title}
										loading="lazy"
										width={800}
										height={450}
									/>
								{:else}
									<div class="case-image-fallback" aria-hidden="true">
										{project?.title?.charAt(0) || 'P'}
									</div>
								{/if}
							</div>
							<div class="case-copy">
								<div class="case-meta">
									<span>Case Study</span>
									{#if project?.category}<span>{project.category}</span>{/if}
									{#if project?.year}<span>{project.year}</span>{/if}
								</div>
								<h3>{project?.title}</h3>
								{#if project?.excerpt}
									<p>{project.excerpt}</p>
								{/if}
								<strong>Read individual case study →</strong>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>
</div>

<style>
	.home-page {
		padding-bottom: clamp(3rem, 6vw, 5rem);
	}

	.shell {
		max-width: 1180px;
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 3vw, 1.25rem);
	}

	section {
		padding: clamp(1.8rem, 4vw, 2.8rem) 0;
	}

	section + section {
		border-top: 1px solid color-mix(in oklab, var(--color-edge) 58%, transparent);
	}

	.intro {
		padding-top: clamp(3rem, 7vw, 5.5rem);
		padding-bottom: clamp(2.5rem, 5vw, 4.25rem);
		min-height: clamp(400px, 60vh, 860px);
		display: grid;
		align-items: center;
	}

	.eyebrow,
	.section-head p {
		margin: 0;
		font-family: var(--font-mono);
		font-size: clamp(0.6rem, 1.2vw, 0.68rem);
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
	}

	.intro-row {
		display: grid;
		grid-template-columns: minmax(130px, 260px) minmax(0, 1fr);
		align-items: center;
		gap: clamp(1.5rem, 5vw, 4.25rem);
	}

	.portrait-wrap {
		margin: 0;
		max-width: 300px;
		width: 100%;
	}

	:global(.portrait) {
		display: block;
		width: 100%;
		border-radius: 999px;
		border: 1px solid color-mix(in oklab, var(--color-edge) 70%, transparent);
		box-shadow: 0 16px 36px color-mix(in oklab, black 14%, transparent);
	}

	:global(.portrait .main-image) {
		filter: saturate(0) contrast(1.05);
	}

	.intro-copy h1 {
		margin: 0.65rem 0 0;
		color: var(--color-body-text);
		font-family: var(--font-heading);
		font-size: clamp(2.4rem, 8vw, 6.4rem);
		line-height: 0.9;
		font-weight: 900;
		letter-spacing: 0.02em;
		max-width: 12ch;
	}

	.intro-line {
		margin: 1.35rem 0 0;
		max-width: 64ch;
		font-size: clamp(0.95rem, 1.8vw, 1.38rem);
		line-height: 1.74;
		color: var(--color-muted-text);
	}

	.hero-cta {
		margin-top: 1.8rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.72rem;
	}

	.hero-cta a,
	.work-head a {
		text-decoration: none;
		padding: 0.62rem 1rem;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		border-radius: 0.76rem;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		font-family: var(--font-mono);
		font-size: clamp(0.62rem, 1.2vw, 0.68rem);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		transition:
			border-color 140ms ease,
			color 140ms ease;
	}

	.hero-cta a:hover,
	.work-head a:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.case-studies {
		padding-top: clamp(2rem, 4vw, 3.1rem);
	}

	.practice {
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.practice-head h2 {
		margin: 0.48rem 0 0;
		font-size: clamp(1.2rem, 2.5vw, 2.15rem);
		line-height: 1.18;
		max-width: 28ch;
	}

	.practice-grid {
		margin-top: 1rem;
		display: grid;
		gap: 0.85rem;
	}

	.practice-card {
		padding: clamp(0.85rem, 2vw, 1rem);
		border-radius: 0.9rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 65%, transparent);
		background: linear-gradient(
			145deg,
			color-mix(in oklab, var(--color-panel) 95%, transparent),
			color-mix(in oklab, var(--color-control-bg) 70%, transparent)
		);
	}

	.practice-card h3 {
		margin: 0;
		font-size: clamp(0.8rem, 1.4vw, 0.92rem);
		font-family: var(--font-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
	}

	.practice-card p {
		margin: 0.58rem 0 0;
		line-height: 1.65;
		color: var(--color-muted-text);
		font-size: clamp(0.85rem, 1.4vw, 1rem);
	}

	.work-head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: end;
		flex-wrap: wrap;
	}

	.section-head h2 {
		margin: 0.45rem 0 0;
		font-size: clamp(1.2rem, 2.5vw, 2.2rem);
		max-width: 24ch;
		line-height: 1.18;
	}

	.case-grid {
		margin-top: 1.65rem;
		display: grid;
		gap: clamp(1rem, 2vw, 1.45rem);
	}

	.case-card {
		display: block;
		text-decoration: none;
		color: inherit;
		border: 1px solid color-mix(in oklab, var(--color-edge) 76%, transparent);
		border-radius: 1.15rem;
		padding: clamp(0.65rem, 1.5vw, 0.9rem);
		background: color-mix(in oklab, var(--color-panel) 88%, transparent);
		transition:
			border-color 200ms ease,
			transform 200ms ease,
			box-shadow 200ms ease;
	}

	.case-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in oklab, var(--color-accent) 65%, transparent);
		box-shadow: 0 18px 38px color-mix(in oklab, black 12%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.case-card:hover {
			transform: none;
		}
	}

	.case-media {
		border-radius: 0.94rem;
		overflow: hidden;
		border: 1px solid color-mix(in oklab, var(--color-edge) 70%, transparent);
		background: var(--color-panel);
		aspect-ratio: 4 / 3;
		min-height: clamp(180px, 42vw, 390px);
		box-shadow: 0 16px 36px color-mix(in oklab, black 12%, transparent);
	}

	:global(.case-media .main-image) {
		filter: saturate(0.98) contrast(1.03);
	}

	.case-image-fallback {
		display: grid;
		place-items: center;
		height: 100%;
		font-size: clamp(2rem, 5vw, 3.2rem);
		color: color-mix(in oklab, var(--color-accent) 42%, var(--color-muted-text));
	}

	.case-copy {
		padding: clamp(0.6rem, 1.5vw, 0.95rem) 0.2rem 0.25rem;
	}

	.case-meta {
		display: flex;
		gap: 0.45rem;
		flex-wrap: wrap;
	}

	.case-meta span {
		font-family: var(--font-mono);
		font-size: 0.63rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.case-copy h3 {
		margin: 0.62rem 0 0.46rem;
		font-size: clamp(1.15rem, 2.2vw, 2.05rem);
		line-height: 1.2;
	}

	.case-copy p {
		margin: 0;
		line-height: 1.68;
		color: var(--color-muted-text);
		max-width: 62ch;
		font-size: clamp(0.85rem, 1.3vw, 1rem);
	}

	.case-copy strong {
		display: inline-block;
		margin-top: 0.72rem;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.empty-state {
		margin-top: 1.5rem;
		padding: 1.1rem;
		border-radius: 0.9rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 64%, transparent);
		background: color-mix(in oklab, var(--color-panel) 86%, transparent);
	}

	.empty-state h3 {
		margin: 0;
		font-size: 1.05rem;
	}

	.empty-state p {
		margin: 0.55rem 0 0;
		font-size: 0.9rem;
		color: var(--color-muted-text);
		line-height: 1.6;
	}

	/* Tablet */
	@media (min-width: 560px) {
		.practice-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	/* Desktop */
	@media (min-width: 900px) {
		.practice-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.case-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.case-card:first-child {
			grid-column: 1 / -1;
		}

		.case-card:first-child .case-media {
			aspect-ratio: 16 / 9;
			min-height: clamp(320px, 36vw, 560px);
		}

		.case-card:not(:first-child) .case-media {
			min-height: clamp(250px, 20vw, 360px);
		}

		.case-card:first-child .case-copy h3 {
			font-size: clamp(1.55rem, 2.5vw, 2.35rem);
		}
	}

	/* Small screens */
	@media (max-width: 620px) {
		.intro-row {
			grid-template-columns: 1fr;
			align-items: start;
		}

		.portrait-wrap {
			max-width: 160px;
		}

		.intro {
			min-height: auto;
		}
	}

	@media (max-width: 480px) {
		.work-head {
			display: grid;
			gap: 0.5rem;
			align-items: start;
		}

		.work-head a {
			width: fit-content;
		}
	}
</style>
