<script lang="ts">
	import TechHero from '$lib/sections/TechHero.svelte';
	import PictureHero from '$lib/sections/PictureHero.svelte';
	import VideoHero from '$lib/sections/VideoHero.svelte';
	import AboutMe from '$lib/sections/AboutMe.svelte';
	import RichText from '$lib/sections/RichText.svelte';
	import FeatureGrid from '$lib/sections/FeatureGrid.svelte';
	import ProjectGrid from '$lib/sections/ProjectGrid.svelte';
	import FAQ from '$lib/sections/FAQ.svelte';
	import ImageCarousel from '$lib/sections/ImageCarousel.svelte';
	import TestimonialCarousel from '$lib/sections/TestimonialCarousel.svelte';
	import LogosMarquee from '$lib/sections/LogosMarquee.svelte';
	import ContactCTA from '$lib/sections/ContactCTA.svelte';
	import SkillsSection from '$lib/sections/SkillsSection.svelte';
	import SkillsCloud from '$lib/sections/SkillsCloud.svelte';
	import EducationSection from '$lib/sections/EducationSection.svelte';
	import ExperienceSection from '$lib/sections/ExperienceSection.svelte';
	import ThreeJsSection from '$lib/sections/ThreeJsSection.svelte';
	import FrameSection from '$lib/sections/FrameSection.svelte';
	import UnknownSection from '$lib/sections/UnknownSection.svelte';

	let { sections = [] }: { sections: any[] } = $props();

	// Map of section types to components
	const sectionMap: Record<string, any> = {
		hero: TechHero,
		pictureHero: PictureHero,
		videoHero: VideoHero,
		about: AboutMe,
		richText: RichText,
		featureGrid: FeatureGrid,
		projectGrid: ProjectGrid,
		faq: FAQ,
		imageCarousel: ImageCarousel,
		testimonialCarousel: TestimonialCarousel,
		logosMarquee: LogosMarquee,
		contactCta: ContactCTA,
		skills: SkillsSection,
		skillsCloud: SkillsCloud,
		education: EducationSection,
		experience: ExperienceSection,
		threeJsSection: ThreeJsSection,
		frame: FrameSection
	};
</script>

{#each sections as section, index (section._key || `${section._type}-${index}`)}
	{@const Component = sectionMap[section._type] || UnknownSection}
	<div id={section._type}>
		<Component {section} />
	</div>
{/each}
