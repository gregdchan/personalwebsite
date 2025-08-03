<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let gsap: any;

	onMount(async () => {
		if (!browser) return;

		// Dynamically import GSAP only on the client
		const importedGsap = await import('gsap');
		const importedScrollTrigger = await import('gsap/ScrollTrigger');
		importedGsap.default.registerPlugin(importedScrollTrigger.default);

		gsap = importedGsap.default;

		// Animate photo and text
		const intro = gsap.timeline();
		intro
			.from('.hero-photo img', {
				opacity: 0,
				scale: 0.9,
				duration: 1.5,
				ease: 'power2.out'
			})
			.from(
				'.hero-text',
				{
					opacity: 0,
					y: 50,
					duration: 1.2,
					ease: 'power2.out'
				},
				'-=0.5'
			);

		gsap
			.timeline({
				scrollTrigger: {
					trigger: '.hero',
					start: 'top top',
					end: 'bottom top',
					pin: true,
					scrub: 1,
					pinSpacing: true
				}
			})
			.to('.hero-photo img', {
				scale: 0.5,
				opacity: 0,
				duration: 1.5,
				ease: 'power1.inOut'
			})
			.to(
				'.hero-text',
				{
					y: -50,
					opacity: 0,
					duration: 1.5,
					ease: 'power1.inOut'
				},
				'<+0.2'
			);
	});
</script>

<section
	class="hero relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
>
	<div class="flex flex-col items-center justify-center text-center md:flex-row md:text-left">
		<div class="hero-photo mb-8 w-64 md:mr-12 md:mb-0 md:w-96">
			<img
				src="/images/headshot.webp"
				alt="Greg Headshot"
				class="h-auto w-full rounded-full object-cover shadow-2xl"
			/>
		</div>
		<h1
			class="shine-text hero-text animate-shine relative inline-block bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl"
		>
			Hi, I'm Greg
		</h1>
	</div>
</section>

<style>
	.hero-photo img {
		transition: all 0.3s ease;
	}
</style>
