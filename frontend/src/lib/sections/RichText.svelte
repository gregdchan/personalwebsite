<script lang="ts">
  export let section: any = {};
  const blocks = section?.body || [];
</script>

<section class="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 prose prose-invert:prose-invert">
  {#if section?.heading}
    <h2 style="color: var(--h2-color,var(--heading-color)); font-family: var(--font-heading); font-size: var(--h2-font-size); line-height: var(--h2-line-height);">
      {section.heading}
    </h2>
  {/if}

  {#each blocks as block}
    {#if block._type === 'block'}
      {#if block.style === 'h2'}
        <h2>{block.children?.[0]?.text}</h2>
      {:else if block.style === 'blockquote'}
        <blockquote>{block.children?.[0]?.text}</blockquote>
      {:else}
        <p>{block.children?.[0]?.text}</p>
      {/if}
    {:else if block._type === 'list' || block.listItem === 'bullet'}
      <!-- Simple bullets -->
      <ul class="list-disc pl-6">
        <li>{block.children?.[0]?.text}</li>
      </ul>
    {/if}
  {/each}
</section>