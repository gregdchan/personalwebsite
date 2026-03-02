<script lang="ts">
  import '../app.css';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import { onMount } from 'svelte';
  
  // Skeleton UI components
  import { AppBar } from '@skeletonlabs/skeleton-svelte';

  let { data, children } = $props();

  const navigation = data?.navigation;
</script>

<div class="flex flex-col min-h-screen bg-surface-50-950">
  <Header {navigation} />

  <main class="flex-grow">
    {@render children()}
  </main>

  <Footer />
</div>

<style>
  :global(body) {
    @apply bg-surface-50-950 text-surface-900-100;
  }
</style>
