<script lang="ts">
        import { urlFor } from '$lib/utils/sanityImage';
        import { onMount } from 'svelte';
        import { gsap } from 'gsap';
        import { ScrollTrigger } from 'gsap/ScrollTrigger';
        import PortableText from '$lib/components/PortableText.svelte';
        import Hero from '$lib/components/sections/Hero.svelte';
        import Frame from '$lib/components/Frame.svelte';

	// Define the types for homePage and its nested properties
	interface MainImage {
		asset?: {
			_ref?: string;
		};
		alt?: string;
	}

        interface Section {
                _key: string;
                _type: string;
                backgroundType?: string;
                backgroundImage?: MainImage;
                backgroundVideo?: string;
                heading?: string;
                subheading?: string;
                cta?: {
                        text?: string;
                        url?: string;
                };
                // Additional properties for other section types
                [key: string]: any;
        }

	interface HomePage {
		title?: string;
		description?: string;
		mainImage?: MainImage;
		body?: any;
		sections?: Section[];
	}

	export let data: { homePage: HomePage };
	const { homePage } = data;

	onMount(() => {
		console.log('HomePage data:', homePage);
		
		// Initialize GSAP ScrollTrigger
		gsap.registerPlugin(ScrollTrigger);
		
		// Animate sections on scroll
		gsap.utils.toArray('.content-section').forEach((section: any) => {
			gsap.fromTo(section,
				{ 
					opacity: 0, 
					y: 50 
				},
				{ 
					opacity: 1, 
					y: 0,
					duration: 0.8,
					ease: "power2.out",
					scrollTrigger: {
						trigger: section,
						start: "top 80%",
						end: "bottom 20%",
						toggleActions: "play none none reverse"
					}
				}
			);
		});
	});
</script>

<svelte:head>
	<title>{homePage?.title || 'Greg D. Chan - Personal Website'}</title>
	<meta name="description" content={homePage?.description || 'Personal website and portfolio of Greg D. Chan'} />
</svelte:head>

<!-- Hero Section -->
{#if homePage?.sections && homePage.sections.length > 0}
	{#each homePage.sections as section (section._key)}
		{#if section._type === 'hero'}
			<Hero 
				heading={section.heading}
				subheading={section.subheading}
				backgroundType={section.backgroundType}
				backgroundImage={section.backgroundImage}
				backgroundColor={section.backgroundColor}
				cta={section.cta}
			/>
		{/if}
	{/each}
{/if}

<!-- Main Content -->
<main class="main-content">
	<!-- Page Header -->
	{#if homePage?.title && !homePage?.sections?.some(s => s._type === 'hero')}
		<section class="content-section page-header">
			<div class="container">
				{#if homePage.title}
					<h1 class="page-title">{homePage.title}</h1>
				{/if}

				{#if homePage.description}
					<p class="page-description">{homePage.description}</p>
				{/if}

				{#if homePage?.mainImage?.asset?._ref}
					<div class="featured-image">
						<img
							src={urlFor(homePage.mainImage).width(1200).auto('format').url()}
							alt={homePage.mainImage.alt || homePage.title}
							class="hero-image"
						/>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- Body Content -->
	{#if homePage?.body}
		<section class="content-section body-content">
			<div class="container">
				<PortableText value={homePage.body} />
			</div>
		</section>
	{/if}

	<!-- Render all other section types -->
	{#if homePage?.sections && homePage.sections.length > 0}
		{#each homePage.sections as section (section._key)}
			{#if section._type !== 'hero'}
				<section class="content-section section-{section._type}">
					<div class="container">
						<!-- Three.js Section -->
						{#if section._type === 'threeJsSection'}
							<div class="threejs-container">
								<!-- Three.js content will go here -->
								<div class="threejs-placeholder">
									<h3>Three.js Interactive Section</h3>
									<p>This section will contain interactive 3D content.</p>
								</div>
							</div>
						{/if}

						<!-- Frame Section -->
						{#if section._type === 'frame'}
							<Frame>
								<iframe 
									src={section.url} 
									title={section.title || 'Embedded Content'} 
									class="frame-content"
									style="height: {section.height || 400}px"
								></iframe>
							</Frame>
						{/if}

						<!-- Generic Section -->
						{#if !['threeJsSection', 'frame'].includes(section._type)}
							{#if section.heading}
								<h2 class="section-heading">{section.heading}</h2>
							{/if}
							
							{#if section.subheading}
								<p class="section-subheading">{section.subheading}</p>
							{/if}
							
							{#if section.cta?.text && section.cta?.url}
								<div class="section-cta">
									<a href={section.cta.url} class="btn btn-primary">
										{section.cta.text}
									</a>
								</div>
							{/if}
						{/if}
					</div>
				</section>
			{/if}
		{/each}
	{/if}
</main>

<style>
	.main-content {
		padding-top: 4rem; /* Account for fixed header */
	}

	.content-section {
		padding: var(--space-16) 0;
		opacity: 0; /* Will be animated by GSAP */
	}

	.content-section:nth-child(even) {
		background: var(--color-border-light);
	}

	.page-header {
		text-align: center;
		padding: var(--space-24) 0;
	}

	.page-title {
		font-size: var(--font-size-6xl);
		margin-bottom: var(--space-6);
		color: var(--color-foreground);
	}

	.page-description {
		font-size: var(--font-size-xl);
		color: var(--color-muted);
		max-width: 600px;
		margin: 0 auto var(--space-8) auto;
		line-height: var(--line-height-relaxed);
	}

	.featured-image {
		margin: var(--space-8) 0;
		border-radius: var(--radius-2xl);
		overflow: hidden;
		box-shadow: var(--shadow-xl);
	}

	.hero-image {
		width: 100%;
		height: auto;
		max-height: 600px;
		object-fit: cover;
		transition: transform var(--transition-slow);
	}

	.featured-image:hover .hero-image {
		transform: scale(1.02);
	}

	.body-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.section-heading {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--space-4);
		color: var(--color-foreground);
		text-align: center;
	}

	.section-subheading {
		font-size: var(--font-size-lg);
		color: var(--color-muted);
		text-align: center;
		margin-bottom: var(--space-8);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.section-cta {
		text-align: center;
		margin-top: var(--space-8);
	}

	.threejs-container {
		text-align: center;
		padding: var(--space-16);
		background: var(--color-background);
		border-radius: var(--radius-2xl);
		border: 2px dashed var(--color-border);
	}

	.threejs-placeholder h3 {
		color: var(--color-muted);
		margin-bottom: var(--space-4);
	}

	.threejs-placeholder p {
		color: var(--color-muted-light);
	}

	.frame-content {
		width: 100%;
		border: none;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.content-section {
			padding: var(--space-12) 0;
		}

		.page-header {
			padding: var(--space-16) 0;
		}

		.page-title {
			font-size: var(--font-size-4xl);
		}

		.page-description {
			font-size: var(--font-size-lg);
		}

		.section-heading {
			font-size: var(--font-size-3xl);
		}
	}

	@media (max-width: 640px) {
		.page-title {
			font-size: var(--font-size-3xl);
		}

		.page-description {
			font-size: var(--font-size-base);
		}

		.section-heading {
			font-size: var(--font-size-2xl);
		}
	}
</style>
