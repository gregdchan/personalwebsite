<script lang="ts">
  import type { Page } from '../lib/types/page';
  export let data: { page: Page | null };
</script>
<section class="prose max-w-none">
  <h1 class="text-3xl font-bold">{data.page?.title ?? 'Home'}</h1>
  {#if data.page?.description}
    <p class="text-gray-600 dark:text-gray-300">{data.page.description}</p>
  {/if}
</section>
