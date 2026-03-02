<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { urlFor } from '$lib/sanity';

  let { section = null }: { section?: any } = $props();

  // Default data if no section provided
  const profile = section || {
    heading: 'PLAYER 1',
    name: 'Greg D. Chan',
    title: 'Design Technologist',
    level: 'Senior',
    image: null,
    bio: 'Crafting playful, interactive experiences at the intersection of design and code.',
    stats: [
      { label: 'DESIGN', value: 90 },
      { label: 'CODING', value: 85 },
      { label: '3D/WEBGL', value: 80 },
      { label: 'STRATEGY', value: 88 }
    ]
  };

  // Animated stat values
  const statValues = profile.stats?.map((stat: any) =>
    tweened(0, { duration: 1500, easing: cubicOut })
  ) || [];

  const experienceHours = tweened(0, { duration: 2000, easing: cubicOut });

  let visible = $state(false);

  onMount(() => {
    visible = true;

    // Start counting up stats after mount
    setTimeout(() => {
      statValues.forEach((store, i) => {
        store.set(profile.stats[i].value);
      });
      experienceHours.set(5000);
    }, 300);
  });

  const imageUrl = section?.image?.asset
    ? urlFor(section.image).width(400).height(400).url()
    : null;
</script>

{#if visible}
  <section class="player-stats-section">
    <div class="stats-container">
      <div
        class="stats-screen"
        in:fly={{ y: 50, duration: 600, easing: cubicOut }}
      >
        <!-- Header -->
        <h2
          class="stats-header pixel-text"
          in:fly={{ y: -30, delay: 100 }}
        >
          <span class="flashing" in:fade={{ delay: 200 }}>▶</span>
          {profile.heading || 'PLAYER 1 STATS'}
          <span class="flashing" in:fade={{ delay: 200 }}>◀</span>
        </h2>

        <div class="stats-content">
          <!-- Portrait -->
          {#if imageUrl}
            <div
              class="portrait-frame"
              in:scale={{ duration: 500, delay: 300, easing: cubicOut }}
            >
              <img src={imageUrl} alt={profile.name} />
              <div class="portrait-border"></div>
            </div>
          {/if}

          <!-- Stats grid -->
          <div class="stats-grid">
            <div class="stat-row" in:fly={{ x: -50, delay: 400 }}>
              <span class="stat-label">NAME:</span>
              <span class="stat-value">{profile.name || 'PLAYER 1'}</span>
            </div>

            <div class="stat-row" in:fly={{ x: -50, delay: 500 }}>
              <span class="stat-label">CLASS:</span>
              <span class="stat-value">{profile.title || 'DEVELOPER'}</span>
            </div>

            {#if profile.level}
              <div class="stat-row" in:fly={{ x: -50, delay: 600 }}>
                <span class="stat-label">LEVEL:</span>
                <span class="stat-value">{profile.level}</span>
              </div>
            {/if}

            <div class="stat-row" in:fly={{ x: -50, delay: 700 }}>
              <span class="stat-label">EXP:</span>
              <span class="stat-value">
                {Math.floor($experienceHours)}+ HOURS
              </span>
            </div>

            <!-- Animated progress bars -->
            {#each profile.stats || [] as stat, i}
              <div class="stat-bar" in:fly={{ x: -50, delay: 800 + (i * 100) }}>
                <span class="stat-label">{stat.label}:</span>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    style="width: {$statValues[i]}%"
                  ></div>
                </div>
                <span class="stat-number">{Math.floor($statValues[i])}</span>
              </div>
            {/each}
          </div>

          <!-- Bio as dialogue box -->
          {#if section?.blockContent || profile.bio}
            <div
              class="dialogue-box"
              in:fly={{ y: 30, delay: 1100 }}
            >
              <p class="dialogue-text">
                {profile.bio || section?.blockContent}
              </p>
              <div class="dialogue-arrow" in:fade={{ delay: 1500 }}>▼</div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  .player-stats-section {
    background: linear-gradient(135deg, var(--color-screen-glow), var(--color-screen-black));
    padding: 64px 24px;
  }

  .stats-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .stats-screen {
    background: var(--color-screen-glow);
    border: 8px solid var(--color-cabinet-wood);
    padding: 48px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  /* Animated corner brackets */
  .stats-screen::before,
  .stats-screen::after {
    content: '┌───┐';
    position: absolute;
    font-family: monospace;
    color: var(--color-arcade-cyan);
    font-size: 24px;
    animation: corner-pulse 2s ease-in-out infinite;
  }

  .stats-screen::before {
    top: 8px;
    left: 8px;
  }

  .stats-screen::after {
    content: '└───┘';
    bottom: 8px;
    right: 8px;
  }

  @keyframes corner-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .stats-header {
    text-align: center;
    font-size: clamp(18px, 3vw, 24px);
    color: var(--color-arcade-yellow);
    margin-bottom: 32px;
    text-shadow: 2px 2px 0 var(--color-warning-red);
  }

  .flashing {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .stats-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .portrait-frame {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    position: relative;
  }

  .portrait-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 4px solid var(--color-arcade-cyan);
    filter: contrast(1.1);
  }

  .stats-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    font-family: 'Press Start 2P', monospace;
    font-size: clamp(10px, 2vw, 12px);
    color: var(--color-gray-1);
    gap: 16px;
  }

  .stat-label {
    color: var(--color-arcade-green);
    flex-shrink: 0;
  }

  .stat-value {
    color: var(--color-arcade-yellow);
    text-align: right;
  }

  .stat-bar {
    display: grid;
    grid-template-columns: 120px 1fr 50px;
    align-items: center;
    gap: 12px;
    font-family: 'Press Start 2P', monospace;
    font-size: clamp(8px, 1.5vw, 10px);
  }

  .progress-bar {
    height: 24px;
    background: var(--color-gray-4);
    border: 2px solid var(--color-gray-3);
    position: relative;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-arcade-green), var(--color-arcade-yellow));
    transition: width 0.5s ease-out;
    position: relative;
  }

  /* Animated shine effect on progress bars */
  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shine 2s infinite;
  }

  @keyframes shine {
    to { left: 100%; }
  }

  .stat-number {
    color: var(--color-arcade-orange);
    text-align: right;
  }

  .dialogue-box {
    background: var(--color-screen-black);
    border: 4px solid var(--color-arcade-cyan);
    padding: 24px;
    position: relative;
  }

  .dialogue-text {
    font-family: monospace;
    font-size: 14px;
    line-height: 1.8;
    color: var(--color-gray-1);
  }

  .dialogue-arrow {
    position: absolute;
    bottom: 8px;
    right: 8px;
    color: var(--color-arcade-cyan);
    animation: bounce 0.6s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  .pixel-text {
    font-family: 'Press Start 2P', monospace;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .stats-screen {
      padding: 32px 20px;
    }

    .stat-bar {
      grid-template-columns: 100px 1fr 40px;
      gap: 8px;
    }

    .portrait-frame {
      width: 150px;
      height: 150px;
    }
  }
</style>
