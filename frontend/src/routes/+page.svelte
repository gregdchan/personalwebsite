<script lang="ts">
        import { urlFor } from '$lib/utils/sanityImage';
        import { onMount } from 'svelte';
        import PortableText from '$lib/components/PortableText.svelte';
        import ThreeJsSection from '$lib/components/sections/ThreeJsSection.svelte';
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
	});
</script>

<svelte:head>
	<title>{homePage?.title || 'Home'}</title>
	<meta name="description" content={homePage?.description || ''} />
</svelte:head>

<!-- Page content -->
<div class="container mx-auto px-4 py-8">
  
	{#if homePage?.title}
		<h1 class="text-4xl font-bold mb-4">{homePage.title}</h1>
	{/if}

	{#if homePage?.description}
		<div class="text-lg mb-4">{homePage.description}</div>
	{/if}

	{#if homePage?.mainImage?.asset?._ref}
		<div class="featured-image">
			<img
				src={urlFor(homePage.mainImage).width(1200).auto('format').url()}
				alt={homePage.mainImage.alt || homePage.title}
			/>
		</div>
	{/if}

	<!-- Render body content if available -->
	{#if homePage?.body}
		<div class="body-content">
			<PortableText value={homePage.body} />
		</div>
	{/if}

	<!-- Render all section types -->
	{#if homePage?.sections && homePage.sections.length > 0}
		<div class="sections">
			{#each homePage.sections as section (section._key)}
				<!-- Hero Section -->
				{#if section._type === 'hero'}
					<section class="hero-section {section.backgroundType || 'color'}">
						{#if section.backgroundType === 'image' && section.backgroundImage?.asset?._ref}
							<div class="background">
								<img
									src={urlFor(section.backgroundImage).width(1600).auto('format').url()}
									alt=""
									class="bg-image"
								/>
							</div>
						{/if}

						{#if section.backgroundType === 'video' && section.backgroundVideo}
							<div class="background">
								<video autoplay muted loop playsinline class="bg-video">
									<source src={section.backgroundVideo} type="video/mp4" />
								</video>
							</div>
						{/if}

						<div class="content">
							{#if section.heading}
								<h2>{section.heading}</h2>
							{/if}

							{#if section.subheading}
								<p class="subheading">{section.subheading}</p>
							{/if}

							{#if section.cta?.text && section.cta?.url}
								<a href={section.cta.url} class="cta-button">{section.cta.text}</a>
							{/if}
						</div>
					</section>
				{/if}

                                <!-- Add other section types here -->
                                <!-- For example:
        {#if section._type === 'textSection'}
          <section class="text-section">
            {#if section.heading}<h2>{section.heading}</h2>{/if}
            {#if section.text}<div class="text">{section.text}</div>{/if}
          </section>
        {/if}
        -->

                                {#if section._type === 'threeJsSection'}
                                        <div class="my-8">
                                                <ThreeJsSection {...section} />
                                        </div>
                                {/if}

                                {#if section._type === 'frame'}
                                        <div class="my-8">
                                                <Frame>
                                                        <iframe src={section.url} title={section.title} class="w-full" style={`height:${section.height || 400}px`}></iframe>
                                                </Frame>
                                        </div>
                                {/if}
                        {/each}
                </div>
        {/if}
</div>

<style>
	/* Basic styling */
	.page-content {
		padding: 2rem 0;
	}

	.page-description {
		font-size: 1.25rem;
		margin-bottom: 2rem;
		max-width: 60ch;
		font-family: var(--font-family);
	}

	.featured-image {
		margin-bottom: 2rem;
	}

	.featured-image img {
		width: 100%;
		height: auto;
		max-height: 500px;
		object-fit: cover;
	}

	/* Hero section styling */
	.hero-section {
		position: relative;
		min-height: 60vh;
		display: flex;
		align-items: center;
		margin-bottom: 2rem;
		padding: 2rem;
		overflow: hidden;
	}

	.hero-section .background {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-section .bg-image,
	.hero-section .bg-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-section .content {
		position: relative;
		z-index: 1;
		max-width: 800px;
	}

	.hero-section h2 {
		font-size: 3rem;
		margin-bottom: 1rem;
		font-family: var(--font-family-heading);
	}

	.hero-section .subheading {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		font-family: var(--font-family);
	}

	.hero-section .cta-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background-color: var(--primary, #1a73e8);
		color: white;
		text-decoration: none;
		border-radius: 4px;
		font-weight: bold;
	}

	/* Background types */
	.hero-section.color {
		background-color: #f5f5f5;
	}

	.hero-section.image .content {
		color: white;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
