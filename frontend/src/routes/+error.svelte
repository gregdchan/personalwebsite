<script lang="ts">
  import { page } from '$app/stores';
  export let status: number;
  export let error: { message?: string; name?: string } | undefined;

  $: eps = $page.data?.errorPages;
  $: content = status === 404 ? eps?.notFound : eps?.generic;
</script>

<section>
  <h1>{content?.title ?? (status === 404 ? 'Page not found' : 'Something went wrong')}</h1>
  <p>{content?.message ?? (error?.message ?? 'An unexpected error occurred.')}</p>
  {#if content?.ctaHref && content?.ctaLabel}
    <p><a href={content.ctaHref}>{content.ctaLabel}</a></p>
  {:else}
    <p><a href="/">Go home</a></p>
  {/if}
</section>