<script lang="ts">
  export let data: { page: { title?: string; description?: string } };
</script>

<section>
  <h1 class="text-3xl font-bold">{data.page?.title ?? 'Page'}</h1>
  {#if data.page?.description}
    <p>{data.page.description}</p>
  {/if}
</section>