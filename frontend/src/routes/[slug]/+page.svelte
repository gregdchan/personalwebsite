<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.page?.title || 'Page'}</title>
</svelte:head>

<div class="simple-page">
  <h1>{data.page?.title}</h1>
  <!-- Content intentionally minimized; all components removed -->
</div>

<style>
  .simple-page {
    max-width: 900px;
    margin: 6rem auto 4rem;
    padding: 0 1.25rem;
  }
  h1 {
    font-size: clamp(2.2rem, 6vw, 4.5rem);
    line-height: 1.05;
    margin: 0 0 2rem;
  }
</style>
