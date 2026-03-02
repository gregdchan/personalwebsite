<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let { data } = $props();

	const page = data?.page ?? {};
	const projects = Array.isArray(data?.projects) ? data.projects : [];
	const posts = Array.isArray(data?.posts) ? data.posts : [];

	const featuredProjects = projects.slice(0, 5);
	const leadProject = featuredProjects[0] ?? null;
	const secondaryProjects = featuredProjects.slice(1);
	const latestPosts = posts.slice(0, 3);

	const heroTitle = page?.title || 'Designing digital products with clarity, soul, and measurable impact.';
	const heroDescription =
		page?.description ||
		'I help teams shape product direction, craft polished interfaces, and ship resilient front-end experiences.';

	const capabilities = [
		{
			title: 'Product Strategy',
			description:
				'Clarifying priorities, framing opportunities, and translating business goals into user-centered product decisions.'
		},
		{
			title: 'Experience Design',
			description:
				'Designing information architecture, user flows, and interfaces that feel intentional from first click to completion.'
		},
		{
			title: 'Creative Technology',
			description:
				'Building modern, performant front-ends with design systems and thoughtful interaction patterns that scale.'
		}
	];

	const process = [
		{
			title: 'Discover',
			copy: 'Audit the current state, identify friction, and align around what success should look like.'
		},
		{
			title: 'Design',
			copy: 'Prototype and iterate rapidly, balancing visual polish with feasibility and accessibility.'
		},
		{
			title: 'Deliver',
			copy: 'Ship intentionally with strong implementation quality, clear QA, and measurable post-launch outcomes.'
		}
	];

	const timeline = [
		'14+ years building digital experiences across higher education, startups, and creative teams.',
		'Founded and launched initiatives blending design, technology, and social impact.',
		'Focused today on product storytelling, scalable systems, and high-craft interaction design.'
	];
</script>

<div class="home-structure">
	<section class="hero">
		<div class="shell hero-grid">
			<p class="eyebrow">Greg D. Chan · Product Design & Creative Technology</p>
			<h1>{heroTitle}</h1>
			<p class="lead">{heroDescription}</p>
			<div class="hero-cta">
				<a href="/work">View case studies</a>
				<a href="/about">About</a>
			</div>
		</div>
	</section>

	<section class="featured-work">
		<div class="shell">
			<div class="section-head work-head" use:reveal={{ delay: 20 }}>
				<div>
					<p>Selected Work</p>
					<h2>Case studies designed for outcomes, not decoration.</h2>
				</div>
				<a class="work-all-link" href="/work">All case studies</a>
			</div>

			{#if leadProject}
				<a
					class="work-lead"
					href={`/work/${leadProject?.slug?.current || leadProject?.slug}`}
					use:reveal={{ delay: 90 }}
				>
					<div class="work-image-wrap lead-media">
						{#if leadProject?.cover?.asset?.url}
							<img
								src={leadProject.cover.asset.url}
								alt={leadProject.cover?.alt || leadProject.title}
								loading="lazy"
								decoding="async"
							/>
						{:else}
							<div class="work-image-fallback">{leadProject?.title?.charAt(0) || 'P'}</div>
						{/if}
					</div>
					<div class="work-copy lead-copy">
						<div class="work-meta">
							<span>Featured Case Study</span>
							{#if leadProject?.category}<span>{leadProject.category}</span>{/if}
							{#if leadProject?.year}<span>{leadProject.year}</span>{/if}
						</div>
						<h3>{leadProject?.title}</h3>
						{#if leadProject?.excerpt}
							<p>{leadProject.excerpt}</p>
						{/if}
						<div class="work-cta-row">
							<strong>Read full case study →</strong>
						</div>
					</div>
				</a>
			{/if}

			{#if secondaryProjects.length > 0}
				<div class="work-grid">
					{#each secondaryProjects as project, index}
						<a
							class="work-card"
							href={`/work/${project?.slug?.current || project?.slug}`}
							use:reveal={{ delay: 150 + index * 60 }}
						>
							<div class="work-image-wrap">
								{#if project?.cover?.asset?.url}
									<img
										src={project.cover.asset.url}
										alt={project.cover?.alt || project.title}
										loading="lazy"
										decoding="async"
									/>
								{:else}
									<div class="work-image-fallback">{project?.title?.charAt(0) || 'P'}</div>
								{/if}
							</div>
							<div class="work-copy">
								<div class="work-meta">
									<span>Case {String(index + 2).padStart(2, '0')}</span>
									{#if project?.category}<span>{project.category}</span>{/if}
								</div>
								<h3>{project?.title}</h3>
								{#if project?.excerpt}
									<p>{project.excerpt}</p>
								{/if}
								<strong>Open project →</strong>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<section class="capabilities">
		<div class="shell">
			<div class="section-head compact">
				<p>Capabilities</p>
				<h2>How I help teams move from ambiguity to shipped product.</h2>
			</div>
			<div class="cap-grid">
				{#each capabilities as item}
					<article>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="process">
		<div class="shell process-grid">
			<div>
				<p class="eyebrow">Approach</p>
				<h2>A practical process rooted in craft and collaboration.</h2>
			</div>
			<div class="steps">
				{#each process as step}
					<article>
						<h3>{step.title}</h3>
						<p>{step.copy}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="timeline">
		<div class="shell">
			<div class="section-head compact">
				<p>Experience</p>
				<h2>Context that shapes the work.</h2>
			</div>
			<ul>
				{#each timeline as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	</section>

	{#if latestPosts.length > 0}
		<section class="writing">
			<div class="shell">
				<div class="section-head compact">
					<p>From Play</p>
					<h2>Thoughts on process, systems, and design execution.</h2>
				</div>
				<div class="post-grid">
					{#each latestPosts as post}
						<a class="post" href={`/play/${post?.slug?.current || post?.slug}`}>
							<h3>{post?.title}</h3>
							{#if post?.excerpt}<p>{post.excerpt}</p>{/if}
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	.home-structure {
		padding-bottom: 5rem;
	}

	.reveal-in {
		opacity: 0;
		translate: 0 18px;
		transition: opacity 480ms ease, translate 560ms cubic-bezier(0.22, 1, 0.36, 1);
		will-change: opacity, translate;
	}

	.reveal-in.is-visible {
		opacity: 1;
		translate: 0 0;
	}

	.shell {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	section {
		padding: 2.6rem 0;
	}

	section + section {
		border-top: 1px solid color-mix(in oklab, var(--color-edge) 58%, transparent);
	}

	.hero {
		padding-top: 3.2rem;
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

	.hero h1 {
		margin: 0.75rem 0 0.95rem;
		font-size: clamp(2.35rem, 6.2vw, 5.2rem);
		line-height: 0.93;
		max-width: 13ch;
	}

	.lead {
		margin: 0;
		max-width: 60ch;
		font-size: clamp(1rem, 1.5vw, 1.16rem);
		line-height: 1.7;
		color: var(--color-muted-text);
	}

	.hero-cta {
		margin-top: 1.35rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.hero-cta a {
		text-decoration: none;
		padding: 0.54rem 0.86rem;
		border-radius: 0.74rem;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.hero-cta a:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.section-head h2 {
		margin: 0.48rem 0 0;
		font-size: clamp(1.35rem, 2.2vw, 2rem);
		max-width: 26ch;
		line-height: 1.2;
	}

	.section-head.compact h2 {
		max-width: 36ch;
	}

	.work-head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: end;
	}

	.work-all-link {
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted-text);
		padding-bottom: 0.35rem;
	}

	.work-all-link:hover {
		color: var(--color-accent);
	}

	.work-lead {
		margin-top: 1.2rem;
		display: grid;
		gap: 1rem;
		text-decoration: none;
		color: inherit;
		border: 1px solid color-mix(in oklab, var(--color-edge) 82%, transparent);
		border-radius: 1rem;
		padding: 0.8rem;
		background: color-mix(in oklab, var(--color-panel) 88%, transparent);
		transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
	}

	.work-lead:hover {
		transform: translateY(-3px);
		border-color: color-mix(in oklab, var(--color-accent) 68%, transparent);
		box-shadow: 0 16px 38px color-mix(in oklab, black 12%, transparent);
	}

	.work-grid {
		margin-top: 0.95rem;
		display: grid;
		gap: 0.8rem;
	}

	.work-card {
		display: grid;
		gap: 0.75rem;
		text-decoration: none;
		color: inherit;
		border: 1px solid color-mix(in oklab, var(--color-edge) 74%, transparent);
		border-radius: 0.9rem;
		padding: 0.68rem;
		background: color-mix(in oklab, var(--color-panel) 84%, transparent);
		transition: border-color 180ms ease, transform 180ms ease;
	}

	.work-card:hover {
		border-color: color-mix(in oklab, var(--color-accent) 62%, transparent);
		transform: translateY(-2px);
	}

	.work-image-wrap {
		border-radius: 0.8rem;
		overflow: hidden;
		border: 1px solid color-mix(in oklab, var(--color-edge) 70%, transparent);
		background: var(--color-panel);
		aspect-ratio: 16 / 10;
		box-shadow: 0 10px 28px color-mix(in oklab, black 11%, transparent);
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
		font-size: 3rem;
		color: color-mix(in oklab, var(--color-accent) 42%, var(--color-muted-text));
	}

	.work-meta {
		display: flex;
		gap: 0.45rem;
		flex-wrap: wrap;
	}

	.work-meta span {
		font-family: var(--font-mono);
		font-size: 0.63rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.work-copy h3 {
		margin: 0.45rem 0 0.35rem;
		font-size: clamp(1.18rem, 2vw, 1.55rem);
		line-height: 1.2;
	}

	.work-copy p {
		margin: 0;
		line-height: 1.65;
		color: var(--color-muted-text);
		max-width: 62ch;
	}

	.work-copy strong {
		display: inline-block;
		margin-top: 0.6rem;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.work-cta-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cap-grid {
		margin-top: 1rem;
		display: grid;
		gap: 0.7rem;
	}

	.cap-grid article {
		padding: 0.95rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 60%, transparent);
		border-radius: 0.8rem;
		background: color-mix(in oklab, var(--color-panel) 86%, transparent);
	}

	.cap-grid h3 {
		margin: 0;
		font-size: 1rem;
	}

	.cap-grid p {
		margin: 0.45rem 0 0;
		color: var(--color-muted-text);
		line-height: 1.6;
	}

	.process-grid {
		display: grid;
		gap: 1rem;
	}

	.process h2 {
		margin: 0.6rem 0 0;
		font-size: clamp(1.35rem, 2.2vw, 2rem);
		max-width: 26ch;
		line-height: 1.2;
	}

	.steps {
		display: grid;
		gap: 0.7rem;
	}

	.steps article {
		padding: 0.95rem;
		border-radius: 0.8rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 60%, transparent);
		background: color-mix(in oklab, var(--color-panel) 86%, transparent);
	}

	.steps h3 {
		margin: 0;
		font-size: 1rem;
	}

	.steps p {
		margin: 0.42rem 0 0;
		color: var(--color-muted-text);
		line-height: 1.6;
	}

	.timeline ul {
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.6rem;
	}

	.timeline li {
		padding: 0.85rem 0.95rem;
		border-radius: 0.7rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 58%, transparent);
		background: color-mix(in oklab, var(--color-panel) 84%, transparent);
		line-height: 1.6;
	}

	.post-grid {
		margin-top: 1rem;
		display: grid;
		gap: 0.7rem;
	}

	.post {
		text-decoration: none;
		color: inherit;
		padding: 0.95rem;
		border-radius: 0.8rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 60%, transparent);
		background: color-mix(in oklab, var(--color-panel) 86%, transparent);
	}

	.post:hover {
		border-color: var(--color-accent);
	}

	.post h3 {
		margin: 0;
		font-size: 1.02rem;
	}

	.post p {
		margin: 0.45rem 0 0;
		color: var(--color-muted-text);
		line-height: 1.55;
	}

	@media (min-width: 900px) {
		.work-lead {
			grid-template-columns: 320px minmax(0, 1fr);
			align-items: center;
			padding: 0.95rem;
		}

		.work-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.work-card {
			grid-template-columns: 160px minmax(0, 1fr);
			align-items: center;
			padding: 0.7rem;
		}

		.work-card .work-image-wrap {
			aspect-ratio: 4 / 3;
		}

		.cap-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.process-grid {
			grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
			align-items: start;
		}

		.post-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (max-width: 740px) {
		.work-head {
			display: grid;
			gap: 0.45rem;
			align-items: start;
		}

		.work-all-link {
			padding-bottom: 0;
		}
	}
</style>
