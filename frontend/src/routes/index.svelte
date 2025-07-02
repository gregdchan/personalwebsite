<script>
    import { onMount } from 'svelte';
    import { getBlogPosts } from '$lib/sanity';
    
    /**
	 * @type {string | any[]}
	 */
    let posts = [];
    
    onMount(async () => {
      posts = await getBlogPosts();
    });
  </script>
  
  <h1>My Blog</h1>
  
  {#if posts.length > 0}
    <ul>
      {#each posts as post}
        <li>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading posts...</p>
  {/if}