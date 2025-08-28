<script lang="ts">
  export let section: any = {};
  export let index: number = 0;
</script>

<section class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
  <div class="rounded-md border border-dashed border-[var(--color-body-text)]/20 p-4">
    <p class="mb-2 font-medium">Unsupported section type: <code>{section?._type}</code> at index {index}</p>
    <pre class="overflow-auto whitespace-pre-wrap text-xs opacity-70">{JSON.stringify(section, null, 2)}</pre>
  </div>
</section>