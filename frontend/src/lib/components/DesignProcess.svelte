<script lang="ts">
	let { steps = [] }: { steps: any[] } = $props();

	function phaseLabel(step: any): string {
		if (step.phase === 'custom') return step.customPhase || 'Custom';
		return (step.phase || 'Step').charAt(0).toUpperCase() + (step.phase || 'step').slice(1);
	}
</script>

{#if steps.length > 0}
	<div class="process-stepper">
		{#each steps as step, index (step._key || index)}
			<div class="step">
				<div class="step-marker">
					<span class="step-number">{index + 1}</span>
					{#if index < steps.length - 1}
						<span class="step-connector"></span>
					{/if}
				</div>
				<div class="step-body">
					<h4 class="step-phase">{phaseLabel(step)}</h4>
					<p class="step-summary">{step.summary}</p>
					{#if Array.isArray(step.methods) && step.methods.length > 0}
						<div class="method-tags">
							{#each step.methods as method}
								<span class="method-tag">{method}</span>
							{/each}
						</div>
					{/if}
					{#if step.image?.asset?.url}
						<img
							src={step.image.asset.url}
							alt={step.image.alt || `${phaseLabel(step)} image`}
							class="step-image"
							loading="lazy"
							decoding="async"
						/>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.process-stepper {
		display: grid;
		gap: 0;
	}

	@media (min-width: 768px) {
		.process-stepper {
			display: flex;
			gap: 0;
		}

		.step {
			flex: 1;
			flex-direction: column;
		}

		.step-marker {
			flex-direction: row;
			align-items: center;
			margin-bottom: 0.6rem;
		}

		.step-connector {
			width: 100% !important;
			height: 2px !important;
		}
	}

	.step {
		display: flex;
		gap: 0.75rem;
	}

	.step-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		flex-shrink: 0;
	}

	.step-number {
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 999px;
		background: color-mix(in oklab, var(--color-accent) 22%, transparent);
		border: 1px solid color-mix(in oklab, var(--color-accent) 45%, transparent);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--color-accent);
	}

	.step-connector {
		width: 2px;
		height: 100%;
		background: color-mix(in oklab, var(--color-edge) 60%, transparent);
	}

	.step-body {
		padding-bottom: 1.2rem;
	}

	.step-phase {
		margin: 0 0 0.25rem;
		font-size: 0.88rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-family: var(--font-mono);
		color: var(--color-accent);
	}

	.step-summary {
		margin: 0;
		line-height: 1.6;
		color: var(--color-muted-text);
		font-size: 0.92rem;
	}

	.method-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.5rem;
	}

	.method-tag {
		padding: 0.18rem 0.42rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.05em;
		background: var(--color-chip);
		border: 1px solid var(--color-edge);
	}

	.step-image {
		margin-top: 0.65rem;
		width: 100%;
		border-radius: 0.6rem;
		border: 1px solid var(--color-edge);
	}
</style>
