<script lang="ts">
  import { urlFor } from '$lib/utils/sanityImage';
  
  export let heading = '';
  export let subheading = '';
  export let backgroundType = 'image';
  export let backgroundImage = null;
  export let backgroundColor = null;
  // other props
</script>

<section class="hero-section {backgroundType}">
  <!-- Hero content -->
  <h1>{heading}</h1>
  {#if subheading}<p>{subheading}</p>{/if}
</section>