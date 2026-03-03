<script lang="ts">
	import { onDestroy } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import AppIcon from '$lib/components/icons/AppIcon.svelte';

	const email = 'gregdchan@gmail.com';
	const linkedinUrl = 'https://linkedin.com/in/gregdchan';
	const githubUrl = 'https://github.com/gregdchan';

	const primaryMailto = `mailto:${email}?subject=${encodeURIComponent('Project Inquiry')}`;
	const outreachLinks = [
		{
			label: 'New Project',
			href: `mailto:${email}?subject=${encodeURIComponent('New Project Inquiry')}`
		},
		{
			label: 'Consulting',
			href: `mailto:${email}?subject=${encodeURIComponent('Consulting Opportunity')}`
		},
		{
			label: 'Partnership',
			href: `mailto:${email}?subject=${encodeURIComponent('Partnership Idea')}`
		}
	];

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | null = null;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			const input = document.createElement('input');
			input.value = email;
			document.body.append(input);
			input.select();
			document.execCommand('copy');
			input.remove();
		}

		copied = true;
		if (copyTimer) clearTimeout(copyTimer);
		copyTimer = setTimeout(() => {
			copied = false;
		}, 1800);
	}

	onDestroy(() => {
		if (copyTimer) clearTimeout(copyTimer);
	});
</script>

<svelte:head>
	<title>Contact — Greg D. Chan</title>
	<meta
		name="description"
		content="Reach Greg D. Chan directly for product design, engineering, and creative technology collaborations."
	/>
</svelte:head>

<section class="contact-shell" aria-labelledby="contact-heading">
	<div class="shell">
		<header class="hero" use:reveal={{ delay: 30 }}>
			<p class="label">Contact</p>
			<h1 id="contact-heading">Let&apos;s Build Something That Ships.</h1>
			<p class="intro">
				The fastest way to reach me is email. Include a quick summary, timeline, and goals, and I can
				reply with next steps.
			</p>
		</header>

		<div class="primary-contact" use:reveal={{ delay: 90 }}>
			<a class="email-cta" href={primaryMailto} aria-label="Email Greg at gregdchan@gmail.com">
				<div class="cta-copy">
					<span class="eyebrow">Primary Contact</span>
					<strong>{email}</strong>
					<small>Click to open your email client</small>
				</div>
				<AppIcon name="mail" size={22} />
			</a>

			<button class="copy-btn" type="button" onclick={copyEmail} aria-live="polite">
				{copied ? 'Email copied' : 'Copy email'}
			</button>
		</div>

		<div class="quick-links" use:reveal={{ delay: 130 }}>
			{#each outreachLinks as item}
				<a href={item.href}>{item.label}</a>
			{/each}
		</div>

		<div class="channels" use:reveal={{ delay: 170 }}>
			<a class="channel-card" href={linkedinUrl} target="_blank" rel="noopener noreferrer">
				<div class="channel-icon"><AppIcon name="linkedin" size={18} /></div>
				<div>
					<h2>LinkedIn</h2>
					<p>Direct messages for opportunities and collaborations.</p>
				</div>
				<AppIcon name="arrow-up-right" size={16} />
			</a>

			<a class="channel-card" href={githubUrl} target="_blank" rel="noopener noreferrer">
				<div class="channel-icon"><AppIcon name="github" size={18} /></div>
				<div>
					<h2>GitHub</h2>
					<p>Code samples, current projects, and technical work.</p>
				</div>
				<AppIcon name="arrow-up-right" size={16} />
			</a>
		</div>
	</div>
</section>

<style>
	.contact-shell {
		padding: clamp(2.2rem, 6vw, 4.2rem) 0 clamp(4rem, 8vw, 7rem);
	}

	.shell {
		max-width: 980px;
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 3vw, 1.25rem);
	}

	.hero {
		margin-bottom: clamp(1.6rem, 4vw, 2.6rem);
	}

	.label {
		margin: 0 0 0.72rem;
		font-family: var(--font-mono);
		font-size: clamp(0.6rem, 1.2vw, 0.68rem);
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--color-accent-alt);
	}

	.hero h1 {
		margin: 0;
		font-size: clamp(2rem, 6vw, 4.2rem);
		line-height: 0.95;
		max-width: 16ch;
	}

	.intro {
		margin: 1rem 0 0;
		max-width: 64ch;
		line-height: 1.72;
		color: var(--color-muted-text);
		font-size: clamp(0.95rem, 1.7vw, 1.08rem);
	}

	.primary-contact {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.75rem;
		align-items: stretch;
	}

	.email-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: clamp(1rem, 2.2vw, 1.5rem);
		border-radius: 1rem;
		background: linear-gradient(
			135deg,
			color-mix(in oklab, var(--color-accent) 23%, var(--color-panel)),
			var(--color-panel)
		);
		border: 1px solid color-mix(in oklab, var(--color-accent) 34%, var(--color-edge));
		text-decoration: none;
		color: var(--color-body-text);
		transition:
			transform 150ms ease,
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.email-cta:hover,
	.email-cta:focus-visible {
		transform: translateY(-1px);
		border-color: color-mix(in oklab, var(--color-accent) 58%, var(--color-edge));
		box-shadow: 0 14px 30px color-mix(in oklab, var(--color-accent) 12%, transparent);
		outline: none;
	}

	.cta-copy {
		display: grid;
		gap: 0.36rem;
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.cta-copy strong {
		font-family: var(--font-heading);
		font-size: clamp(1.12rem, 2vw, 1.4rem);
		letter-spacing: 0.01em;
		line-height: 1.1;
		word-break: break-word;
	}

	.cta-copy small {
		font-size: 0.82rem;
		color: var(--color-muted-text);
	}

	.copy-btn {
		min-width: 132px;
		border-radius: 1rem;
		border: 1px solid var(--color-edge);
		background: color-mix(in oklab, var(--color-control-bg) 84%, transparent);
		color: var(--color-body-text);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.85rem 1rem;
		cursor: pointer;
		transition:
			background 140ms ease,
			border-color 140ms ease;
	}

	.copy-btn:hover,
	.copy-btn:focus-visible {
		background: color-mix(in oklab, var(--color-accent) 14%, var(--color-control-bg));
		border-color: color-mix(in oklab, var(--color-accent) 40%, var(--color-edge));
		outline: none;
	}

	.quick-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin-top: 0.85rem;
	}

	.quick-links a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 36px;
		padding: 0.45rem 0.85rem;
		border-radius: 999px;
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-body-text);
		border: 1px solid color-mix(in oklab, var(--color-accent-alt) 36%, var(--color-edge));
		background: color-mix(in oklab, var(--color-panel) 90%, transparent);
	}

	.quick-links a:hover,
	.quick-links a:focus-visible {
		background: color-mix(in oklab, var(--color-accent) 12%, var(--color-panel));
		outline: none;
	}

	.channels {
		margin-top: clamp(1rem, 2.8vw, 1.5rem);
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.channel-card {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.8rem;
		align-items: start;
		padding: 0.95rem;
		border-radius: 1rem;
		border: 1px solid var(--color-edge);
		background: color-mix(in oklab, var(--color-control-bg) 88%, transparent);
		text-decoration: none;
		color: var(--color-body-text);
		transition:
			transform 140ms ease,
			border-color 140ms ease,
			background 140ms ease;
	}

	.channel-card:hover,
	.channel-card:focus-visible {
		transform: translateY(-1px);
		border-color: color-mix(in oklab, var(--color-accent) 40%, var(--color-edge));
		background: color-mix(in oklab, var(--color-accent) 8%, var(--color-control-bg));
		outline: none;
	}

	.channel-icon {
		width: 2rem;
		height: 2rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.65rem;
		background: color-mix(in oklab, var(--color-accent) 16%, var(--color-panel));
	}

	.channel-card h2 {
		margin: 0;
		font-size: 1rem;
		letter-spacing: 0.01em;
	}

	.channel-card p {
		margin: 0.2rem 0 0;
		font-size: 0.88rem;
		line-height: 1.45;
		color: var(--color-muted-text);
	}

	@media (max-width: 760px) {
		.primary-contact {
			grid-template-columns: 1fr;
		}

		.copy-btn {
			width: 100%;
		}

		.channels {
			grid-template-columns: 1fr;
		}
	}
</style>
