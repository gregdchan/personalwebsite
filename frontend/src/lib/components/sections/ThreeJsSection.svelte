<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  export let modelUrl: string | null = null;
  export let backgroundColor: { hex: string } | null = null;
  export let height: number = 50;

  let container: HTMLDivElement;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    camera.position.z = 2;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  });
</script>

<div
  bind:this={container}
  class="w-full"
  style={`height:${height}vh; background:${backgroundColor?.hex || 'transparent'}`}
></div>
