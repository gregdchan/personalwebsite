<script lang="ts">
  export let section: any = {};
</script>

<section class="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
  <div class="rounded-lg p-6 ring-1 ring-black/5 dark:ring-white/10">
    <h3 class="font-semibold">{section.heading}</h3>
    {#if section.subheading}<p class="text-sm text-[var(--color-body-text)]/70">{section.subheading}</p>{/if}
    {#if section.description}
      <div class="prose prose-invert:prose-invert mt-3">
        {#each section.description as blk}
          {#if blk._type === 'block'}
            <p>{blk.children?.[0]?.text}</p>
          {/if}
        {/each}
      </div>
    {/if}
    <div class="mt-3 text-xs text-[var(--color-body-text)]/60">
      {#if section.startDate}<span>Start: {section.startDate}</span>{/if}
      {#if section.current}<span class="ml-3">Current</span>{:else if section.endDate}<span class="ml-3">End: {section.endDate}</span>{/if}
    </div>
  </div>
</section>