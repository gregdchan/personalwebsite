<!-- src/lib/Header.svelte -->
<script lang="ts">
  import type { Navigation, NavItem } from '$lib/types/navigation'
  import DesktopNav from './DesktopNav.svelte'
  import MobileNav  from './MobileNav.svelte'

  export let navigation: Navigation | null = null
  // if no menu found, we’ll render nothing
  const navItems: NavItem[] = navigation?.items ?? []
</script>

<header class="fixed top-0 left-0 w-full bg-background shadow z-50">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center uppercase">
    <a href="/" class="flex-shrink-0">
      <img src="/images/logo.webp" alt="G.D. Chan Logo" class="h-8 w-auto" />
    </a>

    <DesktopNav {navItems} />
    <MobileNav  {navItems} />
  </div>
</header>
