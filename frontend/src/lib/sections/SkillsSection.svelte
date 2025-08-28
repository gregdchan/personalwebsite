<script lang="ts">
  export let section: any = {};
  const list = section?.skillsList || [];
</script>

<section class="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
  <div class="rounded-lg p-6 ring-1 ring-black/5 dark:ring-white/10">
    <h3 class="font-semibold">{section.heading}</h3>
    {#if section.subheading}<p class="text-sm text-[var(--color-body-text)]/70">{section.subheading}</p>{/if}
    <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {#each list as item}
        <li class="flex items-center justify-between rounded bg-[var(--color-surface,transparent)] px-3 py-2">
          <span>{item.skill}</span>
          {#if item.proficiency !== undefined}
            <span class="text-sm text-[var(--color-body-text)]/70">{item.proficiency}%</span>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</section>