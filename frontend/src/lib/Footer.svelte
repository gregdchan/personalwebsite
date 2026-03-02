<script lang="ts">
	import { Github, Twitter, Linkedin, Mail } from 'lucide-svelte';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-white/5 bg-surface-900 py-12 lg:py-16">
	<div class="mx-auto flex max-w-7xl flex-col items-center px-6 px-12 lg:px-16">
		<div class="mb-12 flex w-full flex-col items-center justify-between md:flex-row">
			<div class="mb-8 text-center md:mb-0 md:text-left">
				<h3 class="mb-2 font-sans text-2xl font-bold tracking-tight">Greg D. Chan</h3>
				<p class="max-w-sm text-surface-400">
					Designing inclusive, culturally rich digital experiences at the intersection of tech and
					society.
				</p>
			</div>

			<div class="flex gap-4">
				<a
					href="https://github.com/gregdchan"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-white/5 bg-white/5 p-3 transition-all hover:bg-primary-500/20 hover:text-primary-500"
				>
					<Github size={20} />
				</a>
				<a
					href="https://linkedin.com/in/gregdchan"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-white/5 bg-white/5 p-3 transition-all hover:bg-primary-500/20 hover:text-primary-500"
				>
					<Linkedin size={20} />
				</a>
				<a
					href="mailto:gdc@example.com"
					class="rounded-full border border-white/5 bg-white/5 p-3 transition-all hover:bg-primary-500/20 hover:text-primary-500"
				>
					<Mail size={20} />
				</a>
			</div>
		</div>

		<div
			class="flex w-full flex-col items-center justify-between border-t border-white/5 pt-8 text-sm text-surface-500 md:flex-row"
		>
			<p>&copy; {year} Greg D. Chan. All rights reserved.</p>
			<div class="mt-4 flex gap-6 md:mt-0">
				<a href="/privacy" class="hover:text-surface-300">Privacy Policy</a>
				<a href="/terms" class="hover:text-surface-300">Terms of Service</a>
			</div>
		</div>
	</div>
</footer>
