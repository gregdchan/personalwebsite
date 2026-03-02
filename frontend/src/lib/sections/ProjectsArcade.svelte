<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import ArcadeCabinet from '$lib/components/ArcadeCabinet.svelte';

  let { items = [], title = '🎮 FEATURED PROJECTS 🎮' }: { items: any[]; title: string } = $props();

  let filterTag = $state('all');

  // Get unique categories from projects
  const categories = $derived(() => {
    const cats = new Set(['all']);
    items.forEach(item => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  });

  // Filter projects based on selected tag
  const filteredProjects = $derived(() => {
    if (filterTag === 'all') return items;
    return items.filter(item => item.category === filterTag);
  });

  function handleProjectOpen(detail: { project: any }) {
    const project = detail.project;
    window.location.href = `/${project.slug?.current || project.slug}`;
  }
</script>

{#if items.length > 0}
  <section class="projects-arcade">
    <div class="arcade-header">
      <h2 class="pixel-text arcade-title">
        {title}
      </h2>

      <!-- Filter pills -->
      {#if categories().length > 1}
        <div class="filter-pills" in:fly={{ y: -20, delay: 200 }}>
          {#each categories() as tag, i}
            <button
              class="pill-button pixel-text"
              class:active={filterTag === tag}
              onclick={() => filterTag = tag}
              in:fly={{ y: -20, delay: 300 + (i * 50) }}
            >
              {tag.toUpperCase()}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Projects as arcade cabinets -->
    <div class="arcade-floor">
      {#each filteredProjects() as project, index (project.slug?.current || project.slug || project.title)}
        <div
          animate:flip={{ duration: 400, easing: quintOut }}
        >
          <ArcadeCabinet
            {project}
            {index}
            onopen={handleProjectOpen}
          />
        </div>
      {/each}
    </div>

    {#if filteredProjects().length === 0}
      <div class="no-results" in:fly={{ y: 20 }}>
        <p class="pixel-text">NO GAMES FOUND</p>
        <p class="pixel-text subtitle">TRY A DIFFERENT CATEGORY</p>
      </div>
    {/if}
  </section>
{/if}

<style>
  .projects-arcade {
    padding: 64px 24px;
    background: linear-gradient(180deg, #000814 0%, #1a1f3a 50%, #000814 100%);
    position: relative;
  }

  .arcade-header {
    max-width: 1200px;
    margin: 0 auto 48px;
    text-align: center;
  }

  .arcade-title {
    font-size: clamp(20px, 4vw, 32px);
    color: #ffd700;
    margin-bottom: 32px;
    text-shadow:
      2px 2px 0 #ff3333,
      -2px -2px 0 #00bcd4;
    animation: title-glitch 5s infinite;
  }

  @keyframes title-glitch {
    0%, 98% { transform: translate(0); }
    99% { transform: translate(-2px, 2px); }
    100% { transform: translate(2px, -2px); }
  }

  .filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }

  .pill-button {
    font-size: 10px;
    padding: 8px 16px;
    background: #2a2520;
    color: #e8dfd0;
    border: 2px solid #665544;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pill-button:hover {
    background: #665544;
    border-color: #ffd700;
    transform: scale(1.05);
  }

  .pill-button.active {
    background: #ffd700;
    color: #000814;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }

  .arcade-floor {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 48px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .no-results {
    text-align: center;
    padding: 80px 20px;
    color: #7cb342;
  }

  .no-results .pixel-text {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .no-results .subtitle {
    font-size: 10px;
    color: #e8dfd0;
  }

  .pixel-text {
    font-family: 'Press Start 2P', monospace;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .projects-arcade {
      padding: 48px 16px;
    }

    .arcade-floor {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .arcade-title {
      font-size: 18px;
    }

    .pill-button {
      font-size: 9px;
      padding: 6px 12px;
    }
  }
</style>
