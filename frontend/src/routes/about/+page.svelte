<script lang="ts">
	import SectionRenderer from '$lib/rendering/SectionRenderer.svelte';
	import PortableText from '$lib/rendering/PortableText.svelte';
	import { ABOUT_FALLBACK } from '$lib/constants/aboutFallback';

	type AboutDoc = {
		title?: string;
		description?: string | null;
		mainImage?: any;
		body?: any[];
		sections?: any[];
	};

	let { data }: { data: { page: AboutDoc } } = $props();

	const page = $derived((data?.page ?? {}) as AboutDoc);
	const allSections = $derived(Array.isArray(page.sections) ? page.sections : []);
	const body = $derived(Array.isArray(page.body) ? page.body : []);

	const aboutSection = $derived(
		allSections.find((section: any) => section?._type === 'about' && section?.image?.asset?.url) ||
			null
	);

	const portraitUrl = $derived(
		page?.mainImage?.asset?.url || aboutSection?.image?.asset?.url || null
	);
	const portraitAlt = $derived(
		page?.mainImage?.alt || aboutSection?.image?.alt || 'Portrait of Greg D. Chan'
	);

	const educationFromSections = $derived(
		allSections.filter((section: any) => section?._type === 'education')
	);

	const experience = $derived(
		allSections.filter((section: any) => section?._type === 'experience').length
			? allSections.filter((section: any) => section?._type === 'experience')
			: ABOUT_FALLBACK.experience
	);

	const education = $derived(
		educationFromSections.length ? educationFromSections : ABOUT_FALLBACK.education
	);

	const certificates = $derived(
		educationFromSections.filter((item: any) =>
			/certificate|certification|unity/i.test(item?.heading || '')
		).length
			? educationFromSections.filter((item: any) =>
					/certificate|certification|unity/i.test(item?.heading || '')
				)
			: ABOUT_FALLBACK.certificates
	);

	const toolkitFromSections = $derived(
		allSections
			.filter((section: any) => section?._type === 'skills')
			.flatMap((section: any) =>
				Array.isArray(section?.skillsList)
					? section.skillsList.map((entry: any) => entry?.skill).filter(Boolean)
					: []
			)
	);

	const baseToolkit = $derived(
		toolkitFromSections.length ? toolkitFromSections : ABOUT_FALLBACK.toolkit
	);

	const toolkit = $derived.by(() => {
		const newSkills = ['Design Thinking', 'Software Development', 'Data Science & Visualization'];
		const combined = [...baseToolkit];
		for (const skill of newSkills) {
			if (!combined.includes(skill)) combined.push(skill);
		}
		return combined;
	});

	const extraSections = $derived(
		allSections.filter((section: any) => {
			if (!section?._type) return false;
			if (['about', 'education', 'experience', 'skills'].includes(section._type)) return false;
			if (section._type === 'featureGrid' && !Array.isArray(section?.features)) return false;
			return true;
		})
	);

	function renderLine(item: any) {
		return item?.subheading || item?.title || item?.description || '';
	}
</script>

<svelte:head>
	<title>About Greg D. Chan — Product Design & Creative Technologist</title>
	<meta
		name="description"
		content="Learn about Greg D. Chan's experience, education, and approach to product design and creative technology."
	/>
</svelte:head>

<div class="about-page">
	<section class="about-hero" aria-labelledby="about-heading">
		<div class="about-wrap">
			<div class="about-intro-row">
				{#if portraitUrl}
					<figure class="portrait-wrap">
						<img
							src={portraitUrl}
							alt={portraitAlt}
							class="portrait"
							loading="eager"
							decoding="async"
							width="220"
							height="220"
							fetchpriority="high"
						/>
					</figure>
				{/if}
				<div class="intro-copy">
					<h1 id="about-heading">Hi, I'm Greg.</h1>
				</div>
			</div>

			{#if body.length > 0}
				<div class="about-copy">
					<PortableText blocks={body} />
				</div>
			{/if}
		</div>
	</section>

	<section class="resume-slab" aria-label="Resume and Toolkit">
		<div class="about-wrap resume-grid">
			<div class="resume-col">
				<h2 id="education-heading">Education</h2>
				<div role="list" aria-labelledby="education-heading">
					{#each education as item}
						<div class="resume-item" role="listitem">
							<h3>{item?.heading}</h3>
							{#if renderLine(item)}<p>{renderLine(item)}</p>{/if}
						</div>
					{/each}
				</div>

				<h2 class="stacked" id="certificates-heading">Certificates</h2>
				<div role="list" aria-labelledby="certificates-heading">
					{#each certificates as item}
						<div class="resume-item" role="listitem">
							<h3>{item?.heading}</h3>
							{#if renderLine(item)}<p>{renderLine(item)}</p>{/if}
						</div>
					{/each}
				</div>

				<h2 class="stacked" id="toolkit-heading">Toolkit</h2>
				<div class="toolkit-list" role="list" aria-labelledby="toolkit-heading">
					{#each toolkit as skill}
						<span role="listitem">{skill}</span>
					{/each}
				</div>
			</div>

			<div class="resume-col experience-col">
				<h2 id="experience-heading">Experience</h2>
				<div role="list" aria-labelledby="experience-heading">
					{#each experience as item}
						<div class="resume-item" role="listitem">
							<h3>{item?.heading}</h3>
							{#if renderLine(item)}<p>{renderLine(item)}</p>{/if}
							{#if Array.isArray(item?.description) && item.description.length}
								<div class="experience-description">
									<PortableText blocks={item.description} />
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	{#if extraSections.length > 0}
		<SectionRenderer sections={extraSections} />
	{/if}
</div>

<style>
	.about-page {
		width: 100%;
		overflow-x: hidden;
	}

	.about-wrap {
		width: min(1080px, calc(100% - 2.5rem));
		margin: 0 auto;
	}

	.about-hero {
		padding: clamp(3rem, 7vw, 5.5rem) 0 clamp(2.5rem, 5vw, 5rem);
	}

	.about-intro-row {
		display: grid;
		grid-template-columns: minmax(130px, 220px) 1fr;
		align-items: center;
		gap: clamp(1.5rem, 4vw, 2.75rem);
		margin-bottom: clamp(1.5rem, 5vw, 3.5rem);
	}

	.portrait-wrap {
		margin: 0;
		max-width: 220px;
		width: 100%;
	}

	.portrait {
		display: block;
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 999px;
		filter: saturate(0) contrast(1.05);
		border: 1px solid color-mix(in oklab, var(--color-edge) 50%, transparent);
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
	}

	.intro-copy h1 {
		margin: 0;
		color: var(--color-body-text);
		font-family: var(--font-heading);
		font-size: clamp(2.4rem, 8vw, 4.75rem);
		line-height: 0.95;
		font-weight: 900;
		letter-spacing: 0.02em;
	}

	.about-copy {
		max-width: 860px;
		font-family: var(--font-mono);
	}

	.about-copy :global(p) {
		margin: 0 0 1.25rem;
		font-size: clamp(0.875rem, 1.5vw, 1.05rem);
		line-height: 1.65;
		letter-spacing: 0.01em;
		color: var(--color-muted-text);
	}

	.resume-slab {
		background:
			linear-gradient(180deg, var(--about-slab-top) 0%, var(--about-slab-bottom) 100%),
			radial-gradient(
				circle at 10% 20%,
				color-mix(in oklab, var(--color-accent) 18%, transparent),
				transparent 42%
			);
		padding: clamp(2.5rem, 6vw, 4.5rem) 0;
		color: var(--color-body-text);
		border-top: 1px solid color-mix(in oklab, var(--color-accent-alt) 40%, transparent);
	}

	.resume-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 6vw, 4.5rem);
	}

	.resume-col h2 {
		margin: 0 0 1.5rem;
		font-size: clamp(1.5rem, 3.5vw, 1.95rem);
		line-height: 1;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--color-accent-alt);
		text-shadow: none;
	}

	.resume-col h2.stacked {
		margin-top: 3rem;
	}

	.resume-item {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid color-mix(in oklab, var(--color-accent-alt) 22%, transparent);
	}

	.resume-item:first-child {
		border-top: none;
		margin-top: 0;
		padding-top: 0;
	}

	.resume-item h3 {
		margin: 0;
		font-size: clamp(1rem, 1.8vw, 1.15rem);
		font-weight: 700;
		color: var(--heading-color);
	}

	.resume-item p {
		margin: 0.4rem 0 0;
		font-size: clamp(0.8rem, 1.4vw, 0.92rem);
		color: var(--color-muted-text);
		line-height: 1.5;
	}

	.toolkit-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.toolkit-list span {
		display: inline-block;
		padding: 0.4rem 0.75rem;
		border: 1px solid color-mix(in oklab, var(--color-accent) 38%, transparent);
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-family: var(--font-mono);
		background: var(--color-control-bg);
		color: var(--color-accent-alt);
	}

	.experience-description {
		margin-top: 0.75rem;
	}

	.experience-description :global(p) {
		margin: 0 0 0.5rem;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-muted-text);
	}

	@media (min-width: 768px) {
		.resume-grid {
			grid-template-columns: 0.8fr 1.2fr;
		}

		.experience-col {
			padding-left: 2.5rem;
			border-left: 1px solid color-mix(in oklab, var(--color-accent-alt) 25%, transparent);
		}
	}

	@media (max-width: 640px) {
		.about-intro-row {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.portrait-wrap {
			max-width: 140px;
		}
	}
</style>
