<script lang="ts">
	import AppIcon from '$lib/components/icons/AppIcon.svelte';

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

			<nav class="footer-links" aria-label="Footer navigation">
				<a href="/work">Work</a>
				<a href="/play">Play</a>
				<a href="/about">About</a>
				<a href="/contact">Contact</a>
			</nav>
		</div>

		<div class="footer-bottom">
			<p>© {year} Greg D. Chan</p>
			<ul class="socials" aria-label="Social media links">
				<li>
					<a
						href="https://github.com/gregdchan"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub profile"
					>
						<AppIcon name="github" size={17} />
					</a>
				</li>
				<li>
					<a
						href="https://linkedin.com/in/gregdchan"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn profile"
					>
						<AppIcon name="linkedin" size={17} />
					</a>
				</li>
				<li>
					<a href="mailto:gdc@example.com" aria-label="Send email">
						<AppIcon name="mail" size={17} />
					</a>
				</li>
			</ul>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--color-edge);
		padding: clamp(2rem, 5vw, 3rem) 0 clamp(1.25rem, 3vw, 2rem);
		margin-top: auto;
		background:
			linear-gradient(
				180deg,
				color-mix(in oklab, var(--color-panel) 35%, transparent) 0%,
				var(--color-panel) 100%
			),
			radial-gradient(
				circle at 12% 120%,
				color-mix(in oklab, var(--color-accent) 22%, transparent),
				transparent 48%
			);
	}

	.footer-inner {
		max-width: 1160px;
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 3vw, 1.25rem);
	}

	.footer-top {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		padding-bottom: clamp(1.25rem, 3vw, 1.8rem);
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
		font-size: clamp(1.2rem, 3vw, 2rem);
		max-width: 26ch;
		line-height: 1.12;
	}

	.signature p {
		margin: 0;
		max-width: 64ch;
		color: var(--color-muted-text);
		line-height: 1.55;
		font-size: clamp(0.875rem, 1.5vw, 1rem);
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
		padding: 0.6rem 0.75rem;
		min-height: 44px;
		display: flex;
		align-items: center;
		border-radius: 0.65rem;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		color: var(--color-muted-text);
		transition:
			color 140ms ease,
			border-color 140ms ease;
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
		flex-wrap: wrap;
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
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.socials a {
		width: 44px;
		height: 44px;
		border-radius: 0.65rem;
		display: grid;
		place-items: center;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		color: var(--color-muted-text);
		transition:
			color 140ms ease,
			border-color 140ms ease;
	}

	.socials a:hover {
		color: var(--color-accent);
		border-color: var(--color-accent-alt);
	}

	@media (min-width: 680px) {
		.footer-links {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
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
