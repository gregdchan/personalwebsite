<script lang="ts">
  export let section: any = {};
  const items = section?.items || [];
</script>

<section class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
  <div class="divide-y divide-[var(--color-body-text)]/10">
    {#each items as q, idx}
      <details class="group py-4">
        <summary class="flex cursor-pointer list-none items-center justify-between">
          <span class="font-medium">{q.question}</span>
          <span class="ml-4 text-xl transition-transform group-open:rotate-45">+</span>
        </summary>
        {#if q.answer}<p class="mt-2 text-[var(--color-body-text)]/80">{q.answer}</p>{/if}
      </details>
    {/each}
  </div>
</section>