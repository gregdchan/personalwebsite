<script lang="ts">
	import ProjectDetail from '$lib/rendering/ProjectDetail.svelte';

	let { data } = $props();
</script>

<ProjectDetail project={data.project} />
