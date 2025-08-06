<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { NavItem } from '$lib/types/navigation';
  
  export let navItems: NavItem[] = [];
  let open = false;
  
  function toggle() {
    open = !open;
  }
  
  function getHref(item: NavItem): string {
    if (typeof item.link === 'string') return item.link;
    if (item.link?.external) return item.link.external;
    const slug = item.link?.internal?.slug?.current;
    return slug ? `/${slug}` : '#';
  }
</script>

<button
  on:click={toggle}
  class="md:hidden p-2 text-foreground hover:text-accent transition-colors"
  aria-expanded={open}
  aria-label="Toggle menu"
>
  <!-- Hamburger/Close icon that toggles based on state -->
  <div class="w-6 h-6 relative">
    <span class="block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out {open ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'}"></span>
    <span class="block absolute h-0.5 w-6 bg-current transition duration-300 ease-in-out {open ? 'opacity-0' : 'opacity-100'}"></span>
    <span class="block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out {open ? '-rotate-45 translate-y-1.5' : 'translate-y-1.5'}"></span>
  </div>
</button>

{#if open}
  <nav 
    class="md:hidden fixed top-[100px] left-0 right-0 z-50 bg-background border-t border-gray-200 dark:border-gray-700 shadow-lg" 
    transition:slide={{ duration: 300, easing: cubicOut }}
  >
    <div class="max-h-[80vh] overflow-y-auto py-4">
      {#each navItems as item}
        <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-800 last:border-none">
          <a
            href={getHref(item)}
            target={item.newWindow ? "_blank" : undefined}
            rel={item.newWindow ? "noopener noreferrer" : undefined}
            class="block text-foreground hover:text-accent transition-colors font-normal text-base"
            style="font-family: var(--font-family-base);"
          >
            {item.text}
          </a>

          {#if item.children?.length}
            <div class="pl-4 mt-2 space-y-2">
              {#each item.children as child}
                <a
                  href={getHref(child)}
                  target={child.newWindow ? "_blank" : undefined}
                  rel={child.newWindow ? "noopener noreferrer" : undefined}
                  class="block text-foreground hover:text-accent transition-colors font-normal text-base"
                  style="font-family: var(--font-family-base);"
                >
                  {child.text}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </nav>
{/if}

<style>
  /* Ensure mobile menu uses the right fonts and styling */
  nav a {
    font-family: var(--font-family-base, var(--font-family));
    font-size: var(--font-size-base, 16px);
    font-weight: var(--font-weight, 400);
  }
  
  /* Hamburger menu styling */
  button div span {
    margin-top: -1px;
    left: 0;
    top: 50%;
    transition: all 0.25s ease-in-out;
  }

  button div span:nth-child(1) {
    transform: translateY(-6px);
  }

  button div span:nth-child(3) {
    transform: translateY(6px);
  }
</style>
