<script lang="ts">
	export let heading = '';
	export let subheading = '';
	export let backgroundType = 'image';
	// other props
</script>

<section class="hero-section {backgroundType}">
	<!-- Hero content -->
	<h1>{heading}</h1>
	{#if subheading}<p>{subheading}</p>{/if}
</section>
