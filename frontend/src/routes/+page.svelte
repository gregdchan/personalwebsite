<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let { data } = $props();

	const page = data?.page ?? {};
	const projects = Array.isArray(data?.projects) ? data.projects : [];
	const featuredProjects = projects.slice(0, 6);

	const portraitUrl = page?.mainImage?.asset?.url || '/images/headshot.webp';
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

<div class="home-page">
	<section class="intro">
		<div class="shell intro-wrap">
			<div class="intro-row">
				<figure class="portrait-wrap" use:reveal={{ delay: 25 }}>
					<img src={portraitUrl} alt={portraitAlt} class="portrait" loading="eager" decoding="async" />
				</figure>
				<div class="intro-copy" use:reveal={{ delay: 70 }}>
					<p class="eyebrow">{profileTitle}</p>
					<h1>Hi, I'm Greg.</h1>
					<p class="intro-line">{introLine}</p>
					<div class="hero-cta">
						<a href="/work">View case studies</a>
						<a href="/about">About</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="case-studies">
		<div class="shell">
			<div class="practice" use:reveal={{ delay: 25 }}>
				<div class="practice-head">
					<p>Practice & Perspective</p>
					<h2>Design thinking grounded in modern innovation.</h2>
				</div>
				<div class="practice-grid">
					{#each practicePoints as item, index}
						<article class="practice-card" use:reveal={{ delay: 70 + index * 55 }}>
							<h3>{item.title}</h3>
							<p>{item.copy}</p>
						</article>
					{/each}
				</div>
			</div>

			<div class="section-head work-head" use:reveal={{ delay: 20 }}>
				<div>
					<p>Case Studies</p>
					<h2>Bold, image-first work with clear outcomes.</h2>
				</div>
				<a href="/work">View case studies</a>
			</div>
			{#if featuredProjects.length === 0}
				<div class="empty-state" use:reveal={{ delay: 90 }}>
					<h3>No case studies published yet.</h3>
					<p>Publish `project` or `portfolioProject` documents in Sanity to populate this section.</p>
				</div>
			{:else}
				<div class="case-grid">
					{#each featuredProjects as project, index}
						<a
							class="case-card"
							href={`/work/${project?.slug?.current || project?.slug}`}
							use:reveal={{ delay: 90 + index * 50 }}
						>
							<div class="case-media">
								{#if project?.cover?.asset?.url}
									<img
										src={project.cover.asset.url}
										alt={project.cover?.alt || project.title}
										loading="lazy"
										decoding="async"
									/>
								{:else}
									<div class="case-image-fallback">{project?.title?.charAt(0) || 'P'}</div>
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
								<strong>Read individual case study -></strong>
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
		padding-bottom: 5rem;
	}

	.shell {
		max-width: 1180px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	section {
		padding: 2.8rem 0;
	}

	section + section {
		border-top: 1px solid color-mix(in oklab, var(--color-edge) 58%, transparent);
	}

	.intro {
		padding-top: 5.5rem;
		padding-bottom: 4.25rem;
		min-height: clamp(560px, 78vh, 860px);
		display: grid;
		align-items: center;
	}

	.eyebrow,
	.section-head p {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
	}

	.intro-row {
		display: grid;
		grid-template-columns: minmax(170px, 300px) minmax(0, 1fr);
		align-items: center;
		gap: clamp(2rem, 5vw, 4.25rem);
	}

	.portrait-wrap {
		margin: 0;
		max-width: 300px;
	}

	.portrait {
		display: block;
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 999px;
		filter: saturate(0) contrast(1.05);
		border: 1px solid color-mix(in oklab, var(--color-edge) 70%, transparent);
		box-shadow: 0 16px 36px color-mix(in oklab, black 14%, transparent);
	}

	.intro-copy h1 {
		margin: 0.65rem 0 0;
		color: var(--color-body-text);
		font-family: var(--font-heading);
		font-size: clamp(3rem, 9vw, 6.4rem);
		line-height: 0.9;
		font-weight: 900;
		letter-spacing: 0.02em;
		max-width: 12ch;
	}

	.intro-line {
		margin: 1.35rem 0 0;
		max-width: 64ch;
		font-size: clamp(1.08rem, 1.85vw, 1.38rem);
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
		padding: 0.56rem 0.9rem;
		border-radius: 0.76rem;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.hero-cta a:hover,
	.work-head a:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.case-studies {
		padding-top: 3.1rem;
	}

	.practice {
		margin-bottom: 2.2rem;
	}

	.practice-head h2 {
		margin: 0.48rem 0 0;
		font-size: clamp(1.42rem, 2.35vw, 2.15rem);
		line-height: 1.18;
		max-width: 28ch;
	}

	.practice-grid {
		margin-top: 1rem;
		display: grid;
		gap: 0.85rem;
	}

	.practice-card {
		padding: 1rem;
		border-radius: 0.9rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 65%, transparent);
		background:
			linear-gradient(
				145deg,
				color-mix(in oklab, var(--color-panel) 95%, transparent),
				color-mix(in oklab, var(--color-control-bg) 70%, transparent)
			);
	}

	.practice-card h3 {
		margin: 0;
		font-size: 0.92rem;
		font-family: var(--font-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
	}

	.practice-card p {
		margin: 0.58rem 0 0;
		line-height: 1.65;
		color: var(--color-muted-text);
	}

	.work-head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: end;
	}

	.section-head h2 {
		margin: 0.45rem 0 0;
		font-size: clamp(1.42rem, 2.35vw, 2.2rem);
		max-width: 24ch;
		line-height: 1.18;
	}

	.case-grid {
		margin-top: 1.65rem;
		display: grid;
		gap: 1.45rem;
	}

	.case-card {
		display: block;
		text-decoration: none;
		color: inherit;
		border: 1px solid color-mix(in oklab, var(--color-edge) 76%, transparent);
		border-radius: 1.15rem;
		padding: 0.9rem;
		background: color-mix(in oklab, var(--color-panel) 88%, transparent);
		transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
	}

	.case-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in oklab, var(--color-accent) 65%, transparent);
		box-shadow: 0 18px 38px color-mix(in oklab, black 12%, transparent);
	}

	.case-media {
		border-radius: 0.94rem;
		overflow: hidden;
		border: 1px solid color-mix(in oklab, var(--color-edge) 70%, transparent);
		background: var(--color-panel);
		aspect-ratio: 4 / 3;
		min-height: clamp(240px, 52vw, 390px);
		box-shadow: 0 16px 36px color-mix(in oklab, black 12%, transparent);
	}

	.case-media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.98) contrast(1.03);
	}

	.case-image-fallback {
		display: grid;
		place-items: center;
		height: 100%;
		font-size: 3.2rem;
		color: color-mix(in oklab, var(--color-accent) 42%, var(--color-muted-text));
	}

	.case-copy {
		padding: 0.95rem 0.2rem 0.25rem;
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
		font-size: clamp(1.4rem, 2.2vw, 2.05rem);
		line-height: 1.2;
	}

	.case-copy p {
		margin: 0;
		line-height: 1.68;
		color: var(--color-muted-text);
		max-width: 62ch;
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
			min-height: clamp(320px, 46vw, 560px);
		}

		.case-card:not(:first-child) .case-media {
			min-height: clamp(250px, 24vw, 360px);
		}

		.case-card:first-child .case-copy h3 {
			font-size: clamp(1.55rem, 2.5vw, 2.35rem);
		}
	}

	@media (max-width: 900px) {
		.intro-row {
			grid-template-columns: 1fr;
			align-items: start;
		}

		.portrait-wrap {
			max-width: 190px;
		}

		.case-media {
			aspect-ratio: 16 / 11;
			min-height: clamp(250px, 56vw, 430px);
		}
	}

	@media (max-width: 740px) {
		.intro {
			padding-top: 3.6rem;
			padding-bottom: 2.6rem;
			min-height: auto;
		}

		.work-head {
			display: grid;
			gap: 0.5rem;
			align-items: start;
		}

		.work-head a {
			width: fit-content;
		}
	}

	@media (max-width: 620px) {
		.intro-copy h1 {
			font-size: clamp(2.35rem, 13vw, 3.4rem);
			line-height: 0.95;
		}

		.case-copy h3 {
			font-size: 1.45rem;
		}
	}

	@media (max-width: 480px) {
		.home-page {
			padding-bottom: 4rem;
		}

		.shell {
			padding: 0 1rem;
		}

		.hero-cta {
			gap: 0.45rem;
		}

		.hero-cta a,
		.work-head a {
			padding: 0.5rem 0.74rem;
			font-size: 0.62rem;
		}
	}
</style>
