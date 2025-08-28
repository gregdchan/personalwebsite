<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg';
  const widths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl'
  } as const;
</script>

<div class="{widths[size]} mx-auto px-4 sm:px-6 lg:px-8">
  <slot />
</div>