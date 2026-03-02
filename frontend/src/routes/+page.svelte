<script lang="ts">
	import { onMount } from 'svelte';
	import type { Page } from '../lib/types/page';
	import TechHero from '$lib/sections/TechHero.svelte';
	import ProjectGrid from '$lib/sections/ProjectGrid.svelte';
	import LogosMarquee from '$lib/sections/LogosMarquee.svelte';
	import { Terminal, Database, Code, Globe, User, BookOpen } from 'lucide-svelte';

	let { data } = $props();

	const sections = data?.page?.sections ?? [];
	const projects = data.projects ?? [];
</script>

<TechHero
	section={sections.find((s: any) => ['hero', 'pictureHero', 'videoHero'].includes(s?._type))}
/>

<!-- About / Bio Section -->
<section
	id="about"
	class="border-y border-white/5 bg-surface-50-950/50 py-24 backdrop-blur-3xl lg:py-32"
>
	<div class="mx-auto grid max-w-7xl items-center gap-16 px-6 px-12 lg:grid-cols-2 lg:px-16">
		<div
			class="relative mx-auto aspect-square max-w-md skew-y-3 overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 hover:skew-y-0 lg:mx-0 lg:skew-y-[-2deg]"
		>
			<img
				src="https://gregdchan.com/wp-content/uploads/2021/08/greg_headshot_bw.jpg"
				alt="Greg D. Chan"
				class="h-full w-full scale-110 object-cover"
			/>
			<div class="absolute inset-0 bg-primary-500/10 mix-blend-overlay"></div>
		</div>

		<div>
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 font-mono text-xs tracking-widest text-primary-500 uppercase"
			>
				<User size={14} /> Background
			</div>
			<h2 class="mb-8 text-4xl font-bold tracking-tight lg:text-5xl">
				Director of Research & Technology at Columbia
			</h2>

			<p class="mb-6 font-sans text-lg text-surface-400">
				With over 14 years in higher education, Greg blends technical leadership with high-craft
				design. Founder of <span class="font-semibold text-white">For Grownups</span>, and an NYU
				Interactive Media graduate, his work spans from VR simulation to inclusive showcase
				platforms.
			</p>

			<div class="mt-12 grid grid-cols-2 gap-8">
				<div>
					<h4 class="mb-2 flex items-center gap-2 font-sans font-bold text-white">
						<Code size={18} class="text-primary-500" /> Tech Stack
					</h4>
					<ul class="space-y-1 font-mono text-sm text-surface-500">
						<li>SvelteKit / React</li>
						<li>Python / Node.js</li>
						<li>Unity / Three.js</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 flex items-center gap-2 font-sans font-bold text-white">
						<BookOpen size={18} class="text-secondary-500" /> Education
					</h4>
					<ul class="space-y-1 font-mono text-sm text-surface-500">
						<li>MA @ NYU Tisch</li>
						<li>BA @ CUNY Hunter</li>
						<li>Unity VR Cert</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects -->
<ProjectGrid items={projects} />

<!-- Skills / Specialties -->
<section class="relative overflow-hidden bg-primary-950 py-24 lg:py-32">
	<div class="bg-grid-white/[0.05] pointer-events-none absolute inset-0 -z-10"></div>
	<div class="relative mx-auto max-w-7xl px-6 px-12 lg:px-16">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-white lg:text-4xl">Core Competencies</h2>
			<p class="text-white/60">
				Cross-functional expertise at the intersection of design and engineering.
			</p>
		</div>

		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each [{ label: 'UI/UX Design', icon: Globe, color: 'text-primary-500' }, { label: 'Full Stack Dev', icon: Code, color: 'text-secondary-500' }, { label: 'Database Arch', icon: Database, color: 'text-amber-500' }, { label: 'Technical Ops', icon: Terminal, color: 'text-emerald-500' }] as skill}
				<div
					class="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all hover:bg-white/10"
				>
					<skill.icon
						size={32}
						class={`${skill.color} mb-4 transition-transform group-hover:scale-110`}
					/>
					<span class="text-xs font-medium tracking-widest text-white uppercase">{skill.label}</span
					>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Contact CTA -->
<section class="bg-surface-50-950 py-24 text-center lg:py-48">
	<div class="mx-auto max-w-2xl px-6">
		<h2 class="mb-8 text-4xl font-bold tracking-tight lg:text-6xl">
			Ready to collaborate on something impactful?
		</h2>
		<p class="mb-12 text-xl text-surface-400">
			I'm always looking for projects that challenge the status quo and push the boundaries of
			design and tech.
		</p>
		<a
			href="/contact"
			class="rounded-2xl bg-white px-12 py-5 text-lg font-bold text-black shadow-2xl transition-all hover:scale-105 active:scale-95"
		>
			Let's work together
		</a>
	</div>
</section>

<style>
	:global(.bg-grid-white\/\[0\.05\]) {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white' stroke-opacity='0.1'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
	}
</style>
