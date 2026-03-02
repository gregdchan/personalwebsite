<script lang="ts">
	let { section = {} }: { section?: any } = $props();

	const heading = section?.heading || 'Skills';
	const subheading = section?.subheading || '';
	const skillsList: { skill: string; proficiency: number }[] = section?.skillsList || [];
</script>

<div class="rounded-2xl border border-white/5 bg-surface-800/30 p-6">
	{#if heading}
		<h3 class="mb-1 text-base font-bold text-white">{heading}</h3>
	{/if}
	{#if subheading}
		<p class="mb-4 text-sm text-surface-400">{subheading}</p>
	{/if}

	{#if skillsList.length > 0}
		<ul class="space-y-3">
			{#each skillsList as item}
				<li>
					<div class="mb-1 flex justify-between text-xs">
						<span class="font-medium text-surface-200">{item.skill}</span>
						{#if item.proficiency}
							<span class="text-surface-500">{item.proficiency}%</span>
						{/if}
					</div>
					{#if item.proficiency}
						<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
							<div
								class="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-700"
								style="width: {item.proficiency}%"
							></div>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-sm text-surface-500">No skills listed yet.</p>
	{/if}
</div>
