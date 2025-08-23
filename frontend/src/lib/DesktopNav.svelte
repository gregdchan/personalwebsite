<script lang="ts">
  import type { NavigationItem } from '$lib/types/navigation'
  export let navItems: NavigationItem[] = []
</script>

<nav class="hidden md:flex space-x-8">
  {#each navItems as item}
    {#if item.children?.length}
      <div class="relative group">
        <a
          href={item.link}
          target={item.target}
          class="text-foreground hover:text-accent"
        >{item.text}</a>

        <div
          class="absolute left-0 mt-2 hidden group-hover:block bg-background shadow-lg py-2"
        >
          {#each item.children as c}
            <a
              href={c.link}
              target={c.target}
              class="block px-4 py-2 text-foreground hover:text-accent"
            >{c.text}</a>
          {/each}
        </div>
      </div>
    {:else}
      <a
        href={item.link}
        target={item.target}
        class="text-foreground hover:text-accent"
      >{item.text}</a>
    {/if}
  {/each}
</nav>
