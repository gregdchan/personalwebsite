<script lang="ts">
  import { spring } from 'svelte/motion';
  import { fly, blur, fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let { section = null }: { section?: any } = $props();

  // Default skills if no section provided
  const defaultSkills = [
    { name: 'JAVASCRIPT', score: 90 },
    { name: 'SVELTEKIT', score: 88 },
    { name: 'THREE.JS', score: 85 },
    { name: 'DESIGN SYSTEMS', score: 92 },
    { name: 'WEBGL', score: 80 },
    { name: 'TYPESCRIPT', score: 87 },
    { name: 'NODE.JS', score: 83 },
    { name: 'FIGMA', score: 89 }
  ];

  const skills = section?.skills || defaultSkills;
  const title = section?.heading || '🏆 HIGH SCORES 🏆';

  // Spring store for hover effect
  const hoverScale = spring(1, {
    stiffness: 0.3,
    damping: 0.4
  });

  let selectedSkill = $state<string | null>(null);
  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  function handleHover(skill: any) {
    selectedSkill = skill.name;
    hoverScale.set(1.05);
  }

  function handleLeave() {
    selectedSkill = null;
    hoverScale.set(1);
  }
</script>

{#if visible && skills.length > 0}
  <section class="high-scores-section">
    <div class="score-screen" in:blur={{ duration: 400 }}>
      <h2
        class="screen-title pixel-text"
        in:fly={{ y: -50, delay: 100 }}
      >
        {title}
      </h2>

      <div class="score-table">
        <!-- Header -->
        <div class="table-header" in:fly={{ x: -100, delay: 200 }}>
          <span>RANK</span>
          <span>SKILL</span>
          <span>SCORE</span>
          <span>BAR</span>
        </div>

        <!-- Skill rows with flip animation -->
        {#each skills as skill, index (skill.name)}
          <div
            class="score-row"
            class:selected={selectedSkill === skill.name}
            style="transform: scale({selectedSkill === skill.name ? $hoverScale : 1})"
            in:fly={{ x: -100, delay: 300 + (index * 100) }}
            onmouseenter={() => handleHover(skill)}
            onmouseleave={handleLeave}
            role="button"
            tabindex="0"
          >
            <span class="rank">#{index + 1}</span>
            <span class="skill-name">{skill.name}</span>
            <span class="score">{skill.score}</span>

            <div class="score-bar">
              <div
                class="score-fill"
                in:fly={{
                  x: -200,
                  delay: 500 + (index * 100),
                  duration: 800
                }}
                style="width: {skill.score}%"
              ></div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Insert coin message with blink -->
      <div
        class="insert-coin pixel-text"
        in:fade={{ delay: 1500 }}
      >
        PRESS SPACE TO CONTINUE
      </div>
    </div>
  </section>
{/if}

<style>
  .high-scores-section {
    background: var(--color-screen-black);
    padding: 64px 24px;
  }

  .score-screen {
    background: radial-gradient(ellipse at center, var(--color-screen-glow) 0%, var(--color-screen-black) 100%);
    padding: 48px;
    max-width: 1000px;
    margin: 0 auto;
    border: 4px solid var(--color-arcade-cyan);
    box-shadow:
      0 0 20px rgba(0, 188, 212, 0.3),
      inset 0 0 60px rgba(0, 188, 212, 0.05);
  }

  .screen-title {
    text-align: center;
    font-size: clamp(20px, 4vw, 32px);
    color: var(--color-arcade-yellow);
    margin-bottom: 48px;
    text-shadow:
      2px 2px 0 var(--color-warning-red),
      -2px -2px 0 var(--color-arcade-cyan);
    animation: title-glitch 3s infinite;
  }

  @keyframes title-glitch {
    0%, 98% { transform: translate(0); }
    99% { transform: translate(-2px, 2px); }
    100% { transform: translate(2px, -2px); }
  }

  .score-table {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .table-header,
  .score-row {
    display: grid;
    grid-template-columns: 80px 1fr 100px 200px;
    gap: 16px;
    align-items: center;
    font-family: 'Press Start 2P', monospace;
    font-size: clamp(9px, 1.5vw, 12px);
    padding: 12px;
  }

  .table-header {
    color: var(--color-arcade-green);
    border-bottom: 2px solid var(--color-gray-3);
  }

  .score-row {
    color: var(--color-gray-1);
    background: rgba(42, 37, 32, 0.3);
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
  }

  .score-row:hover,
  .score-row.selected {
    background: rgba(91, 155, 213, 0.2);
    border-color: var(--color-arcade-blue);
    transform: translateX(8px);
  }

  .rank {
    color: var(--color-arcade-yellow);
    font-size: clamp(12px, 2vw, 16px);
  }

  .score {
    color: var(--color-arcade-orange);
    text-align: right;
  }

  .score-bar {
    height: 20px;
    background: var(--color-gray-4);
    border: 2px solid var(--color-gray-3);
    position: relative;
    overflow: hidden;
  }

  .score-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-arcade-green), var(--color-arcade-yellow), var(--color-arcade-orange));
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }

  .insert-coin {
    margin-top: 48px;
    text-align: center;
    font-size: clamp(12px, 2vw, 16px);
    color: var(--color-arcade-cyan);
    text-shadow: 0 0 10px rgba(0, 188, 212, 0.8);
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .pixel-text {
    font-family: 'Press Start 2P', monospace;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .score-screen {
      padding: 32px 16px;
    }

    .table-header,
    .score-row {
      grid-template-columns: 60px 1fr 70px 120px;
      gap: 8px;
      padding: 10px 8px;
      font-size: 8px;
    }

    .rank {
      font-size: 10px;
    }

    .score-bar {
      height: 16px;
    }
  }
</style>
