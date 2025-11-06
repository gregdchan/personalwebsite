<script lang="ts">
  import { spring, tweened } from 'svelte/motion';
  import { scale, fly, fade } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';
  import { urlFor } from '$lib/sanity';

  export let project: any;
  export let index: number = 0;

  const dispatch = createEventDispatcher();

  // Spring for hover scale
  const hoverScale = spring(1, {
    stiffness: 0.4,
    damping: 0.5
  });

  // Tweened for marquee light animation
  const lightIntensity = tweened(0.3, {
    duration: 300
  });

  let isHovered = $state(false);

  function handleMouseEnter() {
    isHovered = true;
    hoverScale.set(1.05);
    lightIntensity.set(1);
  }

  function handleMouseLeave() {
    isHovered = false;
    hoverScale.set(1);
    lightIntensity.set(0.3);
  }

  function handleClick() {
    dispatch('open', { project });
  }

  // Get cover image URL
  const coverImageUrl = project?.cover?.asset ? urlFor(project.cover).width(600).height(450).url() : '/placeholder-project.png';

  // Handle technologies array (legacy tags support)
  const technologies = project?.technologies || project?.tags || [];
</script>

<article
  class="arcade-cabinet"
  style="transform: scale({$hoverScale})"
  in:scale={{
    duration: 500,
    delay: index * 80,
    easing: elasticOut
  }}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onclick={handleClick}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === 'Enter' && handleClick()}
>
  <!-- Marquee with project name -->
  <div class="cabinet-marquee">
    <div
      class="marquee-lights"
      style="opacity: {$lightIntensity}"
    ></div>
    <h3 class="pixel-text cabinet-title">
      {project.title}
    </h3>
  </div>

  <!-- Screen showing project image -->
  <div class="cabinet-screen">
    <img
      src={coverImageUrl}
      alt={project.title}
      class="screen-image"
    />

    <!-- Hover overlay with content -->
    {#if isHovered}
      <div
        class="screen-overlay"
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 150 }}
      >
        {#if project.excerpt}
          <p class="description" in:fly={{ y: 20, delay: 100 }}>
            {project.excerpt}
          </p>
        {/if}

        <!-- Tech tags with staggered entrance -->
        {#if technologies.length > 0}
          <div class="tech-tags">
            {#each technologies.slice(0, 5) as tech, i}
              <span
                class="tech-tag pixel-text"
                in:fly={{ x: -20, delay: 150 + (i * 50) }}
              >
                {tech}
              </span>
            {/each}
          </div>
        {/if}

        <!-- CTA button -->
        <button
          class="play-button pixel-text"
          in:scale={{ delay: 300, easing: elasticOut }}
        >
          ▶ VIEW PROJECT
        </button>
      </div>
    {/if}

    <!-- Scanlines (always visible) -->
    <div class="scanlines"></div>
    <div class="crt-glow"></div>
  </div>

  <!-- Cabinet body with controls -->
  <div class="cabinet-body">
    <div class="control-panel">
      <div class="joystick">
        <div class="joystick-ball"></div>
      </div>
      <div class="button-group">
        <div class="arcade-button red"></div>
        <div class="arcade-button blue"></div>
        <div class="arcade-button yellow"></div>
      </div>
    </div>
  </div>

  <!-- Tech stack as coin slots -->
  {#if technologies.length > 0}
    <div class="tech-slots">
      {#each technologies.slice(0, 4) as tech}
        <span class="coin-slot pixel-text">{tech}</span>
      {/each}
    </div>
  {/if}
</article>

<style>
  .arcade-cabinet {
    position: relative;
    cursor: pointer;
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  .cabinet-marquee {
    background: linear-gradient(135deg, #ff9933, #ff6b9d);
    border: 4px solid #2a2520;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 -4px 0 rgba(0, 0, 0, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.2);
  }

  .marquee-lights {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: repeating-linear-gradient(
      90deg,
      #ffd700 0px,
      #ffd700 12px,
      #ff3333 12px,
      #ff3333 24px,
      #00bcd4 24px,
      #00bcd4 36px
    );
    animation: marquee-scroll 0.8s linear infinite;
    transition: opacity 0.3s;
  }

  @keyframes marquee-scroll {
    to { transform: translateX(-36px); }
  }

  .cabinet-title {
    font-size: 14px;
    color: #000814;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 2.6em;
  }

  .cabinet-screen {
    position: relative;
    background: #000814;
    border: 8px solid #8b4513;
    border-top: none;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.8);
  }

  .screen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: contrast(1.2) saturate(1.3);
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .arcade-cabinet:hover .screen-image {
    transform: scale(1.05);
  }

  .screen-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 8, 20, 0.8), rgba(0, 8, 20, 0.95));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 12px;
  }

  .description {
    color: #e8dfd0;
    font-size: 12px;
    text-align: center;
    line-height: 1.5;
    max-height: 4.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }

  .tech-tag {
    font-size: 8px;
    padding: 3px 6px;
    background: rgba(91, 155, 213, 0.8);
    color: #fff;
    border: 1px solid #5b9bd5;
    border-radius: 2px;
  }

  .play-button {
    font-size: 10px;
    padding: 8px 16px;
    background: #ffd700;
    color: #000814;
    border: 2px solid #000814;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .play-button:hover {
    background: #ffee00;
    transform: scale(1.1);
  }

  .scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0px,
      rgba(0, 0, 0, 0.15) 2px,
      transparent 2px,
      transparent 4px
    );
    pointer-events: none;
  }

  .crt-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 30%,
      rgba(0, 8, 20, 0.4) 100%
    );
    pointer-events: none;
  }

  .cabinet-body {
    background: linear-gradient(180deg, #665544, #2a2520);
    border: 4px solid #2a2520;
    border-top: none;
    padding: 20px 24px;
  }

  .control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .joystick {
    position: relative;
    width: 48px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .joystick::before {
    content: '';
    position: absolute;
    width: 48px;
    height: 20px;
    background: #2a2520;
    border-radius: 50%;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  .joystick-ball {
    width: 28px;
    height: 40px;
    background: linear-gradient(180deg, #ff3333, #cc0000);
    border-radius: 14px 14px 0 0;
    position: relative;
    z-index: 1;
    box-shadow:
      inset -2px 0 4px rgba(0, 0, 0, 0.3),
      2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .button-group {
    display: flex;
    gap: 10px;
  }

  .arcade-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid #2a2520;
    box-shadow:
      inset 0 -3px 0 rgba(0, 0, 0, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .arcade-button.red {
    background: radial-gradient(circle at 30% 30%, #ff6666, #ff3333);
  }

  .arcade-button.blue {
    background: radial-gradient(circle at 30% 30%, #33ddff, #00bcd4);
  }

  .arcade-button.yellow {
    background: radial-gradient(circle at 30% 30%, #ffee00, #ffd700);
  }

  .tech-slots {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 16px;
    background: #000814;
    border: 4px solid #2a2520;
    border-top: none;
    border-radius: 0 0 12px 12px;
    min-height: 56px;
    align-items: center;
    justify-content: center;
  }

  .coin-slot {
    font-size: 9px;
    padding: 4px 10px;
    background: linear-gradient(180deg, #665544, #4a3322);
    color: #ffd700;
    border: 2px solid #8b4513;
    border-radius: 4px;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.3);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  /* Hover effects */
  .arcade-cabinet:hover .cabinet-marquee {
    background: linear-gradient(135deg, #ffaa44, #ff7bae);
  }

  .arcade-cabinet:hover .marquee-lights {
    animation-duration: 0.4s;
  }

  .arcade-cabinet:hover {
    transform: translateY(-8px);
  }

  .arcade-cabinet:hover::after {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(255, 153, 51, 0.3),
      transparent 60%
    );
    pointer-events: none;
    animation: glow-pulse 1s ease-in-out infinite;
    z-index: -1;
  }

  @keyframes glow-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  /* Pixel font */
  .pixel-text {
    font-family: 'Press Start 2P', monospace;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .cabinet-title {
      font-size: 12px;
    }

    .description {
      font-size: 11px;
    }
  }
</style>
