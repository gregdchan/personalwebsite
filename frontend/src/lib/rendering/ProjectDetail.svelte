<script lang="ts">
	import PortableText from '$lib/rendering/PortableText.svelte';
	import AppIcon from '$lib/components/icons/AppIcon.svelte';
	import ImageGallerySlideshow from '$lib/components/ImageGallerySlideshow.svelte';
	import ProjectPalette from '$lib/components/ProjectPalette.svelte';
	import DesignProcess from '$lib/components/DesignProcess.svelte';
	import DesignPrinciples from '$lib/components/DesignPrinciples.svelte';
	import BeforeAfter from '$lib/components/BeforeAfter.svelte';
	import MetricsGrid from '$lib/components/MetricsGrid.svelte';
	import InfographicBlock from '$lib/components/InfographicBlock.svelte';
	import SanityImage from '$lib/components/SanityImage.svelte';
	import { optimizedUrl } from '$lib/sanity';

	type StoryImage = {
		image: any;
		alt: string;
		caption?: string;
	};

	let { project = {} }: { project: any } = $props();

	const title = $derived(project?.title || 'Project');
	const excerpt = $derived(project?.excerpt || '');
	const year = $derived(project?.year || null);
	const category = $derived(project?.category || null);
	const liveUrl = $derived(project?.externalUrl || project?.liveUrl || project?.url || null);
	const githubUrl = $derived(project?.githubUrl || null);

	const roles = $derived(Array.isArray(project?.roles) ? project.roles : []);
	const collaborators = $derived(
		Array.isArray(project?.collaborators) ? project.collaborators : []
	);
	const technologies = $derived(Array.isArray(project?.technologies) ? project.technologies : []);
	const tags = $derived(Array.isArray(project?.tags) ? project.tags : []);

	const palette = $derived(project?.palette || null);
	const designProcess = $derived(
		Array.isArray(project?.designProcess) ? project.designProcess : []
	);
	const designPrinciples = $derived(
		Array.isArray(project?.designPrinciples) ? project.designPrinciples : []
	);
	const beforeAfterComparisons = $derived(
		Array.isArray(project?.beforeAfterComparisons) ? project.beforeAfterComparisons : []
	);
	const metrics = $derived(Array.isArray(project?.metrics) ? project.metrics : []);
	const infographics = $derived(Array.isArray(project?.infographics) ? project.infographics : []);

	const clientLabel = $derived(
		typeof project?.client === 'string'
			? project.client
			: project?.client?.name || project?.client?.title || null
	);

	function asStoryImage(image: any, fallbackAlt: string, caption?: string): StoryImage | null {
		if (!image?.asset && !image?.url) return null;
		return {
			image,
			alt: image?.alt || fallbackAlt,
			caption
		};
	}

	const coverImage = $derived.by(() =>
		asStoryImage(project?.cover || project?.mainImage, `${title} cover`, project?.cover?.alt)
	);

	const chapters = $derived.by(() => {
		const body = Array.isArray(project?.body) ? project.body : [];
		const intro = Array.isArray(project?.introduction) ? project.introduction : [];
		const challenge = Array.isArray(project?.challenge) ? project.challenge : [];
		const result = Array.isArray(project?.resultDescription) ? project.resultDescription : [];
		const resultTitle = project?.resultTitle || 'Outcome';

		const blocks = [
			{ id: 'overview', heading: 'Overview', content: body },
			{ id: 'introduction', heading: 'Context', content: intro },
			{ id: 'challenge', heading: 'Challenge', content: challenge },
			{ id: 'result', heading: resultTitle, content: result }
		].filter((block) => Array.isArray(block.content) && block.content.length > 0);

		if (!blocks.length && excerpt) {
			return [
				{
					id: 'summary',
					heading: 'Summary',
					content: [
						{
							_type: 'block',
							style: 'normal',
							children: [{ _type: 'span', text: excerpt, marks: [] }],
							markDefs: []
						}
					]
				}
			];
		}

		return blocks;
	});

	const caseSections = $derived.by(() => {
		const raw = Array.isArray(project?.caseStudySections) ? project.caseStudySections : [];
		return raw
			.map((section: any, index: number) => {
				const images = [
					asStoryImage(section?.imageA, `${title} case image ${index + 1}`),
					asStoryImage(section?.imageB, `${title} case image ${index + 1}`)
				].filter(Boolean) as StoryImage[];

				return {
					title: section?.title || `Design move ${index + 1}`,
					description: section?.description || '',
					images
				};
			})
			.filter((section: any) => section.description || section.images.length > 0);
	});

	const galleryImages = $derived.by(() => {
		const raw = Array.isArray(project?.gallery) ? project.gallery : [];
		return raw
			.map((image: any, index: number) =>
				asStoryImage(image, `${title} gallery image ${index + 1}`, image?.caption || image?.alt)
			)
			.filter(Boolean) as StoryImage[];
	});

	const leftoverCaseSections = $derived.by(() => {
		const chapterCount = chapters.length;
		return caseSections.slice(chapterCount);
	});

	const deliverables = $derived.by(() => {
		if (technologies.length > 0) return technologies.slice(0, 4).join(' · ');
		if (roles.length > 0) return roles.slice(0, 4).join(' · ');
		return 'Product design · UI systems · Front-end implementation';
	});

	const projectType = $derived(category || 'Digital product');
	const teamText = $derived.by(() => {
		if (collaborators.length > 0) return collaborators.join(', ');
		if (roles.length > 0) return roles.join(', ');
		return 'Independent lead';
	});

	let lightboxOpen = $state(false);
	let lightboxItems = $state<StoryImage[]>([]);
	let lightboxIndex = $state(0);

	const activeLightboxImage = $derived(lightboxItems[lightboxIndex] ?? null);

	function openLightbox(items: StoryImage[], index = 0) {
		if (!Array.isArray(items) || items.length === 0) return;
		lightboxItems = items;
		lightboxIndex = Math.max(0, Math.min(index, items.length - 1));
		lightboxOpen = true;
	}

	function closeLightbox() {
		lightboxOpen = false;
	}

	function nextLightbox() {
		if (!lightboxItems.length) return;
		lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
	}

	function prevLightbox() {
		if (!lightboxItems.length) return;
		lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (event.key === 'Escape') closeLightbox();
		if (event.key === 'ArrowRight') nextLightbox();
		if (event.key === 'ArrowLeft') prevLightbox();
	}

	function onLightboxBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeLightbox();
		}
	}

	function onPrevLightboxClick(event: MouseEvent) {
		event.stopPropagation();
		prevLightbox();
	}

	function onNextLightboxClick(event: MouseEvent) {
		event.stopPropagation();
		nextLightbox();
	}

	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = lightboxOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

<article class="case-study">
	<header class="hero">
		<div class="shell single-col">
			<a href="/work" class="back-link"><AppIcon name="arrow-left" size={16} /> Back to Work</a>
			<div class="meta-row">
				{#if category}<span>{category}</span>{/if}
				{#if year}<span>{year}</span>{/if}
			</div>
			<h1>{title}</h1>
			{#if excerpt}<p class="lead">{excerpt}</p>{/if}
			<div class="hero-links">
				{#if liveUrl}
					<a href={liveUrl} target="_blank" rel="noopener noreferrer"
						>Live Site <AppIcon name="external-link" size={14} /></a
					>
				{/if}
				{#if githubUrl}
					<a href={githubUrl} target="_blank" rel="noopener noreferrer"
						>Source <AppIcon name="github" size={14} /></a
					>
				{/if}
			</div>

			{#if coverImage}
				<button
					type="button"
					class="hero-media"
					onclick={() => openLightbox([coverImage], 0)}
					aria-label="Open cover image"
				>
					<SanityImage
						image={coverImage.image}
						alt={coverImage.alt}
						width={1600}
						height={900}
						class="hero-image"
						loading="eager"
						fetchpriority="high"
					/>
					<span class="image-open-tag">Open image</span>
				</button>
			{/if}
		</div>
	</header>

	<main class="shell single-col story-flow">
		<section class="glance-panel">
			<h2>At a glance</h2>
			<dl class="glance-grid">
				<div>
					<dt>Deliverables</dt>
					<dd>{deliverables}</dd>
				</div>
				<div>
					<dt>Project Type</dt>
					<dd>{projectType}</dd>
				</div>
				<div>
					<dt>Team</dt>
					<dd>{teamText}</dd>
				</div>
				{#if clientLabel}
					<div>
						<dt>Client</dt>
						<dd>{clientLabel}</dd>
					</div>
				{/if}
			</dl>
		</section>

		{#each chapters as chapter, index (chapter.id)}
			<section class="chapter" id={chapter.id}>
				<h2>{chapter.heading}</h2>
				<PortableText blocks={chapter.content} />

				{#if caseSections[index] && caseSections[index].images.length > 0}
					<div class="chapter-visual-block">
						{#if caseSections[index].title}
							<h3>{caseSections[index].title}</h3>
						{/if}
						{#if caseSections[index].description}
							<p class="visual-copy">{caseSections[index].description}</p>
						{/if}
						{#if caseSections[index].images.length > 1}
							<ImageGallerySlideshow images={caseSections[index].images} {openLightbox} />
						{:else}
							<div class="visual-stack">
								{#each caseSections[index].images as image, imageIndex (`${image.alt}-${imageIndex}`)}
									<button
										type="button"
										class="visual-image"
										onclick={() => openLightbox(caseSections[index].images, imageIndex)}
										aria-label="Open case-study image"
									>
										<SanityImage image={image.image} alt={image.alt} loading="lazy" />
										<span class="image-open-tag">Open image</span>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</section>
		{/each}

		{#if leftoverCaseSections.length > 0}
			<section class="chapter">
				<h2>Design details</h2>
				{#each leftoverCaseSections as section, sectionIndex (`${section.title}-${sectionIndex}`)}
					<article class="chapter-visual-block standalone">
						{#if section.title}<h3>{section.title}</h3>{/if}
						{#if section.description}<p class="visual-copy">{section.description}</p>{/if}
						{#if section.images.length > 1}
							<ImageGallerySlideshow images={section.images} {openLightbox} />
						{:else}
							<div class="visual-stack">
								{#each section.images as image, imageIndex (`${image.alt}-${imageIndex}`)}
									<button
										type="button"
										class="visual-image"
										onclick={() => openLightbox(section.images, imageIndex)}
										aria-label="Open case-study image"
									>
										<SanityImage image={image.image} alt={image.alt} loading="lazy" />
										<span class="image-open-tag">Open image</span>
									</button>
								{/each}
							</div>
						{/if}
					</article>
				{/each}
			</section>
		{/if}

		{#if metrics.length > 0}
			<section class="chapter" id="outcomes">
				<h2>Outcomes</h2>
				<MetricsGrid {metrics} />
			</section>
		{/if}

		{#if designProcess.length > 0}
			<section class="chapter" id="design-process">
				<h2>Design Process</h2>
				<DesignProcess steps={designProcess} />
			</section>
		{/if}

		{#if palette?.swatches?.length}
			<section class="chapter" id="color-palette">
				<h2>Color Palette</h2>
				<ProjectPalette {palette} />
			</section>
		{/if}

		{#if designPrinciples.length > 0}
			<section class="chapter" id="design-principles">
				<h2>Design Principles</h2>
				<DesignPrinciples principles={designPrinciples} />
			</section>
		{/if}

		{#if beforeAfterComparisons.length > 0}
			<section class="chapter" id="before-after">
				<h2>Before & After</h2>
				<BeforeAfter comparisons={beforeAfterComparisons} {openLightbox} />
			</section>
		{/if}

		{#if infographics.length > 0}
			<section class="chapter" id="data-insights">
				<h2>Data & Insights</h2>
				{#each infographics as block (block._key)}
					<InfographicBlock {block} />
				{/each}
			</section>
		{/if}

		{#if galleryImages.length > 0}
			<section class="chapter gallery">
				<h2>Selected screens</h2>
				<ImageGallerySlideshow images={galleryImages} {openLightbox} />
			</section>
		{/if}

		{#if tags.length > 0 || technologies.length > 0}
			<section class="chapter metadata-tail">
				{#if technologies.length > 0}
					<h3>Technology</h3>
					<div class="token-row">
						{#each technologies as tech}
							<span>{tech}</span>
						{/each}
					</div>
				{/if}
				{#if tags.length > 0}
					<h3>Tags</h3>
					<div class="token-row muted">
						{#each tags as tag}
							<a href={`/work?tag=${encodeURIComponent(tag)}`}>{tag}</a>
						{/each}
					</div>
				{/if}
			</section>
		{/if}
	</main>
</article>

{#if lightboxOpen && activeLightboxImage}
	<div
		class="lightbox"
		onkeydown={onLightboxBackdropKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Image lightbox"
		tabindex="-1"
	>
		<button
			type="button"
			class="lightbox-dismiss"
			onclick={closeLightbox}
			aria-label="Dismiss image viewer"
		></button>

		<button
			type="button"
			class="lightbox-close"
			onclick={closeLightbox}
			aria-label="Close image viewer"
		>
			<AppIcon name="x" size={18} />
		</button>

		{#if lightboxItems.length > 1}
			<button
				type="button"
				class="lightbox-nav prev"
				onclick={onPrevLightboxClick}
				aria-label="Previous image"
			>
				<AppIcon name="arrow-left" size={20} />
			</button>
			<button
				type="button"
				class="lightbox-nav next"
				onclick={onNextLightboxClick}
				aria-label="Next image"
			>
				<AppIcon name="arrow-right" size={20} />
			</button>
		{/if}

		<div class="lightbox-content">
			<figure class="lightbox-figure">
				<img
					src={optimizedUrl(activeLightboxImage.image, 1600)}
					alt={activeLightboxImage.alt}
					class="lightbox-image"
				/>
				{#if activeLightboxImage.caption || lightboxItems.length > 1}
					<figcaption>
						{activeLightboxImage.caption || activeLightboxImage.alt}
						{#if lightboxItems.length > 1}
							<span>{lightboxIndex + 1} / {lightboxItems.length}</span>
						{/if}
					</figcaption>
				{/if}
			</figure>
		</div>
	</div>
{/if}

<style>
	.case-study {
		padding-bottom: 4.8rem;
		--story-image-radius: 1rem;
		--story-image-border: 1px solid color-mix(in oklab, var(--color-edge) 82%, transparent);
		--story-image-shadow: 0 12px 34px color-mix(in oklab, black 12%, transparent);
	}

	.shell {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	.single-col {
		max-width: 860px;
	}

	.hero {
		padding: clamp(1.2rem, 2vw, 2rem) 0 1.8rem;
		border-bottom: 1px solid var(--color-edge);
	}

	.hero h1 {
		margin: 0.75rem 0 0.9rem;
		font-size: clamp(2.1rem, 5.2vw, 4.35rem);
		line-height: 0.94;
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
	}

	.back-link:hover {
		color: var(--color-accent);
	}

	.meta-row {
		display: flex;
		gap: 0.42rem;
		flex-wrap: wrap;
	}

	.meta-row span {
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		font-size: 0.65rem;
		font-family: var(--font-mono);
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		background: color-mix(in oklab, var(--color-text) 6%, transparent);
		border: 1px solid color-mix(in oklab, var(--color-text) 15%, transparent);
		color: var(--color-text);
	}

	.lead {
		margin: 0;
		max-width: 64ch;
		font-size: clamp(1rem, 1.4vw, 1.15rem);
		line-height: 1.7;
		color: var(--color-muted-text);
	}

	.hero-links {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.hero-links a {
		display: inline-flex;
		align-items: center;
		gap: 0.38rem;
		padding: 0.55rem 0.85rem;
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		border-radius: 999px;
		color: var(--color-text);
		border: 1px solid color-mix(in oklab, var(--color-text) 18%, transparent);
		background: color-mix(in oklab, var(--color-text) 4%, transparent);
		transition: all 180ms ease;
	}

	.hero-links a:hover {
		border-color: var(--color-text);
		background: color-mix(in oklab, var(--color-text) 8%, transparent);
	}

	.hero-media,
	.visual-image {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		margin: 1.1rem 0 0;
		font-size: 0;
		line-height: 0;
		overflow: hidden;
		border-radius: var(--story-image-radius);
		border: var(--story-image-border);
		background: color-mix(in oklab, var(--color-panel) 84%, transparent);
		box-shadow: var(--story-image-shadow);
		cursor: zoom-in;
		transition:
			transform 220ms ease,
			border-color 220ms ease;
	}

	.hero-media:hover,
	.visual-image:hover {
		transform: translateY(-2px);
		border-color: color-mix(in oklab, var(--color-accent) 54%, var(--color-edge));
	}

	:global(.hero-image .main-image),
	:global(.visual-image .main-image) {
		display: block;
		width: 100%;
		height: 100%;
		max-height: 72vh;
		object-fit: cover;
		filter: saturate(0.99) contrast(1.03);
	}

	.image-open-tag {
		position: absolute;
		right: 0.64rem;
		bottom: 0.64rem;
		padding: 0.28rem 0.52rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.58rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		background: color-mix(in oklab, var(--color-panel) 78%, black 22%);
		color: color-mix(in oklab, var(--color-text) 92%, white 8%);
		border: 1px solid color-mix(in oklab, white 26%, transparent);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		box-shadow: 0 4px 14px color-mix(in oklab, black 18%, transparent);
	}

	.story-flow {
		padding-top: 1.3rem;
		display: grid;
		gap: 1.8rem;
	}

	.glance-panel {
		padding: 0 0 1rem;
		border-bottom: 1px solid color-mix(in oklab, var(--color-edge) 58%, transparent);
	}

	.glance-panel h2 {
		margin: 0 0 0.7rem;
		font-size: clamp(1rem, 1.8vw, 1.3rem);
	}

	.glance-grid {
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.7rem 0.9rem;
	}

	dt {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
	}

	dd {
		margin: 0.2rem 0 0;
		line-height: 1.55;
		color: var(--color-muted-text);
	}

	.chapter {
		padding-top: 1.2rem;
		border-top: 1px solid color-mix(in oklab, var(--color-edge) 56%, transparent);
	}

	.chapter:first-of-type {
		padding-top: 0;
		border-top: 0;
	}

	.chapter h2 {
		margin: 0 0 0.9rem;
		font-size: clamp(1.2rem, 2.1vw, 1.65rem);
	}

	.chapter-visual-block {
		margin-top: 0.95rem;
	}

	.chapter-visual-block h3 {
		margin: 0;
		font-size: 1.05rem;
	}

	.visual-copy {
		margin: 0.45rem 0 0;
		line-height: 1.65;
		color: var(--color-muted-text);
	}

	.visual-stack {
		display: grid;
		gap: 0.8rem;
	}

	.visual-stack .visual-image {
		margin-top: 0.8rem;
	}

	.metadata-tail h3 {
		margin: 0.15rem 0 0.55rem;
		font-size: 0.95rem;
	}

	.metadata-tail h3 + .token-row {
		margin-bottom: 1rem;
	}

	.token-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.38rem;
	}

	.token-row span {
		padding: 0.3rem 0.65rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		color: var(--color-text);
		background: color-mix(in oklab, var(--color-accent) 15%, transparent);
		border: 1px solid color-mix(in oklab, var(--color-accent) 30%, transparent);
	}

	.token-row a {
		padding: 0.3rem 0.65rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		color: var(--color-text);
		background: color-mix(in oklab, var(--color-accent) 15%, transparent);
		border: 1px solid color-mix(in oklab, var(--color-accent) 30%, transparent);
		text-decoration: none;
		transition:
			border-color 140ms ease,
			color 140ms ease,
			background-color 140ms ease;
	}

	.token-row a:hover {
		border-color: color-mix(in oklab, var(--color-accent) 62%, transparent);
		color: var(--color-accent);
	}

	.token-row.muted a {
		background: color-mix(in oklab, var(--color-text) 5%, transparent);
		border-color: color-mix(in oklab, var(--color-text) 12%, transparent);
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 150;
		background: rgba(0, 0, 0, 0.88);
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.lightbox-dismiss {
		position: absolute;
		inset: 0;
		padding: 0;
		margin: 0;
		border: 0;
		background: transparent;
		cursor: zoom-out;
	}

	.lightbox-close,
	.lightbox-nav {
		position: absolute;
		z-index: 3;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.24);
		background: rgba(12, 12, 12, 0.55);
		color: white;
		display: grid;
		place-items: center;
	}

	.lightbox-close {
		top: 1rem;
		right: 1rem;
	}

	.lightbox-nav.prev {
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.lightbox-nav.next {
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.lightbox-content {
		position: relative;
		z-index: 2;
		max-width: min(1200px, 94vw);
	}

	.lightbox-figure {
		margin: 0;
		display: grid;
		gap: 0.5rem;
	}

	.lightbox-image {
		display: block;
		max-width: 100%;
		max-height: calc(90vh - 3.2rem);
		object-fit: contain;
		border-radius: 0.85rem;
	}

	figcaption {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: rgba(248, 248, 248, 0.88);
		font-size: 0.85rem;
	}
</style>
