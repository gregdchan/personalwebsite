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
		allSections.find((section: any) => section?._type === 'about' && section?.image?.asset?.url) || null
	);

	const portraitUrl = $derived(page?.mainImage?.asset?.url || aboutSection?.image?.asset?.url || null);
	const portraitAlt = $derived(page?.mainImage?.alt || aboutSection?.image?.alt || 'Portrait of Greg D. Chan');

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
		educationFromSections.filter((item: any) => /certificate|certification|unity/i.test(item?.heading || ''))
			.length
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

	const toolkit = $derived(toolkitFromSections.length ? toolkitFromSections : ABOUT_FALLBACK.toolkit);

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

<div class="about-page">
	<section class="about-hero">
		<div class="about-wrap">
			<div class="about-intro-row">
				{#if portraitUrl}
					<figure class="portrait-wrap">
						<img src={portraitUrl} alt={portraitAlt} class="portrait" loading="eager" decoding="async" />
					</figure>
				{/if}
				<div class="intro-copy">
					<h1>Hi, I'm Greg.</h1>
				</div>
			</div>

			{#if body.length > 0}
				<div class="about-copy">
					<PortableText blocks={body} />
				</div>
			{/if}
		</div>
	</section>

	<section class="resume-slab">
		<div class="about-wrap resume-grid">
			<div class="resume-col">
				<h2>Education</h2>
				{#each education as item}
					<div class="resume-item">
						<h3>{item?.heading}</h3>
						{#if renderLine(item)}<p>{renderLine(item)}</p>{/if}
					</div>
				{/each}

				<h2 class="stacked">Certificates</h2>
				{#each certificates as item}
					<div class="resume-item">
						<h3>{item?.heading}</h3>
						{#if renderLine(item)}<p>{renderLine(item)}</p>{/if}
					</div>
				{/each}

				<h2 class="stacked">Toolkit</h2>
				<div class="toolkit-list">
					{#each toolkit as skill}
						<span>{skill}</span>
					{/each}
				</div>
			</div>

			<div class="resume-col experience-col">
				<h2>Experience</h2>
				{#each experience as item}
					<div class="resume-item">
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
		padding: 5.5rem 0 5rem;
	}

	.about-intro-row {
		display: grid;
		grid-template-columns: minmax(130px, 220px) 1fr;
		align-items: center;
		gap: clamp(1.5rem, 4vw, 2.75rem);
		margin-bottom: clamp(2.25rem, 5vw, 3.5rem);
	}

	.portrait-wrap {
		margin: 0;
		max-width: 220px;
	}

	.portrait {
		display: block;
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 999px;
		filter: saturate(0) contrast(1.05);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.intro-copy h1 {
		margin: 0;
		color: rgba(224, 227, 235, 0.94);
		font-family: var(--font-heading);
		font-size: clamp(2.4rem, 7vw, 4.75rem);
		line-height: 0.95;
		font-weight: 900;
		letter-spacing: 0.02em;
	}

	.about-copy {
		max-width: 860px;
		font-family: var(--font-mono);
	}

	.about-copy :global(p) {
		margin: 0 0 1rem;
		font-size: 0.74rem;
		line-height: 1.65;
		letter-spacing: 0.03em;
		color: rgba(229, 231, 235, 0.86);
	}

	.resume-slab {
		background: linear-gradient(180deg, #eceff4 0%, #e6e8ef 100%);
		padding: clamp(2.5rem, 5vw, 4rem) 0;
		color: #161923;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
	}

	.resume-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1.5rem, 4vw, 3.5rem);
	}

	.resume-col h2 {
		margin: 0;
		font-size: 1.95rem;
		line-height: 1;
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.resume-col h2.stacked {
		margin-top: 2rem;
	}

	.resume-item {
		margin-top: 0.85rem;
		padding-top: 0.85rem;
		border-top: 1px solid rgba(22, 25, 35, 0.1);
	}

	.resume-item h3 {
		margin: 0;
		font-size: 0.98rem;
		font-weight: 700;
	}

	.resume-item p {
		margin: 0.3rem 0 0;
		font-size: 0.82rem;
		color: #4b5565;
	}

	.toolkit-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 0.9rem;
	}

	.toolkit-list span {
		display: inline-block;
		padding: 0.3rem 0.5rem;
		border: 1px solid rgba(22, 25, 35, 0.2);
		border-radius: 0.3rem;
		font-size: 0.72rem;
		letter-spacing: 0.02em;
		font-family: var(--font-mono);
	}

	.experience-col {
		padding-left: clamp(0.75rem, 2vw, 1.5rem);
		border-left: 2px solid rgba(94, 161, 97, 0.42);
	}

	.experience-description {
		margin-top: 0.55rem;
	}

	.experience-description :global(p) {
		margin: 0;
		font-size: 0.8rem;
		line-height: 1.5;
		color: #4b5565;
	}

	@media (max-width: 900px) {
		.about-intro-row {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		.portrait-wrap {
			max-width: 160px;
		}

		.resume-grid {
			grid-template-columns: 1fr;
		}

		.experience-col {
			border-left: 0;
			padding-left: 0;
			border-top: 2px solid rgba(94, 161, 97, 0.42);
			padding-top: 1.2rem;
		}
	}
</style>
