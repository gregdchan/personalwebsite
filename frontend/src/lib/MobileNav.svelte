<script lang="ts">
  import type { NavItem } from '$lib/types/navigation'
  export let navItems: NavItem[] = []
  let open = false
  function toggle() {
    open = !open
  }
</script>

<button
  on:click={toggle}
  class="md:hidden p-2 text-foreground"
  aria-expanded={open}
  aria-label="Toggle menu"
>
  <!-- your hamburger icon here -->
</button>

{#if open}
  <nav class="md:hidden bg-background px-4 py-4 space-y-2">
    {#each navItems as item}
      <a
        href={item.link}
        target={item.target}
        class="block text-foreground hover:text-accent"
      >{item.text}</a>

      {#if item.children?.length}
        <div class="pl-4 space-y-1">
          {#each item.children as c}
            <a
              href={c.link}
              target={c.target}
              class="block text-foreground hover:text-accent"
            >{c.text}</a>
          {/each}
        </div>
      {/if}
    {/each}
  </nav>
{/if}
