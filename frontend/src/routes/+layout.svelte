<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { browser } from '$app/environment';
	import type { DesignToken } from '$lib/types/designToken';
	import type { Navigation } from '$lib/types/navigation';
  
	// whatever the server returned
        export let data: {
          tokens:       DesignToken | null;
          navigation:   Navigation | null;
        };
  
	// apply tokens on the client
        if (browser && data.tokens) {
          applyTokens(data.tokens);
        }
  
        function applyTokens(token: DesignToken) {
          const root = document.documentElement;
          // Apply color tokens to CSS variables
          if (token.colors) {
                root.style.setProperty('--color-primary', token.colors.primary?.hex ?? '');
                // etc…
          }
	  // dark‐mode
	  document.body.classList.toggle('dark', token.mode === 'dark');
	}
  </script>
  
  <svelte:head>
	<title>Greg D. Chan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
  </svelte:head>
  
  <!-- now `data.navigation` is passed straight in, so Header never has to fetch client-side -->
  <Header navigation={data.navigation} />
  
  <main class="min-h-[90vh] bg-background text-foreground font-custom">
	<slot />
  </main>
  
  <Footer />
  