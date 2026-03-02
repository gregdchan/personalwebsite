<script lang="ts">
	import { Github, Linkedin, Mail } from 'lucide-svelte';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="footer-inner">
		<div class="footer-top">
			<div class="signature">
				<p class="eyebrow">Available for select collaborations</p>
				<h2>Designing products people actually feel.</h2>
				<p>
					I work across product strategy, interface design, and frontend systems with a focus on
					clarity, craft, and measurable outcomes.
				</p>
			</div>

			<div class="footer-links">
				<a href="/work">Work</a>
				<a href="/play">Play</a>
				<a href="/about">About</a>
				<a href="/contact">Contact</a>
			</div>
		</div>

		<div class="footer-bottom">
			<p>© {year} Greg D. Chan</p>
			<div class="socials">
				<a href="https://github.com/gregdchan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<Github size={17} />
				</a>
				<a
					href="https://linkedin.com/in/gregdchan"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
				>
					<Linkedin size={17} />
				</a>
				<a href="mailto:gdc@example.com" aria-label="Email">
					<Mail size={17} />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--color-edge);
		padding: 3rem 0 2rem;
		margin-top: auto;
		background:
			linear-gradient(180deg, color-mix(in oklab, var(--color-panel) 35%, transparent) 0%, var(--color-panel) 100%),
			radial-gradient(circle at 12% 120%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 48%);
	}

	.footer-inner {
		max-width: 1160px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	.footer-top {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		padding-bottom: 1.8rem;
		border-bottom: 1px solid var(--color-edge);
	}

	.eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-accent-alt);
	}

	.signature h2 {
		margin: 0.55rem 0;
		font-size: clamp(1.4rem, 3vw, 2rem);
		max-width: 26ch;
		line-height: 1.12;
	}

	.signature p {
		margin: 0;
		max-width: 64ch;
		color: var(--color-muted-text);
		line-height: 1.55;
	}

	.footer-links {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;
	}

	.footer-links a {
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		padding: 0.5rem 0.65rem;
		border-radius: 0.65rem;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		color: var(--color-muted-text);
	}

	.footer-links a:hover {
		color: var(--color-body-text);
		border-color: var(--color-accent);
	}

	.footer-bottom {
		padding-top: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.footer-bottom p {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.socials {
		display: flex;
		gap: 0.45rem;
	}

	.socials a {
		width: 33px;
		height: 33px;
		border-radius: 0.65rem;
		display: grid;
		place-items: center;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		color: var(--color-muted-text);
	}

	.socials a:hover {
		color: white;
		border-color: var(--color-accent-alt);
	}

	@media (min-width: 900px) {
		.footer-top {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}

		.footer-links {
			grid-template-columns: 1fr;
			min-width: 170px;
		}
	}
</style>
