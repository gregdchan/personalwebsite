<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { GameScene } from './GameScene';
  import { GameConfig } from './config/GameConfig';
  import { fade } from 'svelte/transition';

  let canvas: HTMLCanvasElement;
  let gameScene: GameScene | null = null;
  let showInstructions = $state(true);
  let gameStarted = $state(false);
  let fadeOut = $state(false);
  let timeRemaining = $state(GameConfig.DURATION / 1000);

  let isMobile = $state(false);

  onMount(() => {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Hide instructions after 3 seconds
    setTimeout(() => {
      showInstructions = false;
      startGame();
    }, 3000);
  });

  function startGame() {
    if (!canvas) return;

    gameStarted = true;
    gameScene = new GameScene(canvas);

    // Set completion callback
    gameScene.onComplete = () => {
      handleGameComplete();
    };

    // Start the game
    gameScene.start();

    // Update timer
    const interval = setInterval(() => {
      if (gameScene && gameScene.phase === 'playing') {
        const remaining = Math.max(0, (GameConfig.DURATION - gameScene.elapsedTime) / 1000);
        timeRemaining = Math.ceil(remaining);
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  function handleGameComplete() {
    // Fade out screen
    fadeOut = true;

    // Navigate to home after fade
    setTimeout(() => {
      // Set session flag so game doesn't replay
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('gameCompleted', 'true');
      }
      goto('/');
    }, 2000);
  }

  function handleSkip() {
    if (gameScene) {
      gameScene.cleanup();
    }
    fadeOut = true;
    setTimeout(() => {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('gameCompleted', 'true');
      }
      goto('/');
    }, 500);
  }

  onDestroy(() => {
    if (gameScene) {
      gameScene.cleanup();
    }
  });
</script>

<div class="game-container">
  <!-- Canvas -->
  <canvas bind:this={canvas} class="game-canvas"></canvas>

  <!-- Instructions Overlay -->
  {#if showInstructions}
    <div class="instructions-overlay" in:fade out:fade>
      <div class="instructions-box">
        <h1 class="pixel-text title">ASTEROIDS</h1>
        <p class="pixel-text instructions">
          {isMobile ? GameConfig.INSTRUCTIONS.mobile : GameConfig.INSTRUCTIONS.desktop}
        </p>
        <p class="pixel-text loading">LOADING<span class="dots">...</span></p>
      </div>
    </div>
  {/if}

  <!-- HUD -->
  {#if gameStarted && !showInstructions}
    <div class="hud" in:fade>
      <!-- Timer -->
      <div class="timer pixel-text">
        TIME: {timeRemaining}s
      </div>

      <!-- Skip Button -->
      {#if GameConfig.SKIP_ENABLED}
        <button class="skip-button pixel-text" onclick={handleSkip}>
          PRESS ESC TO SKIP
        </button>
      {/if}
    </div>
  {/if}

  <!-- Fade Out Overlay -->
  {#if fadeOut}
    <div class="fade-overlay" in:fade={{ duration: 2000 }}></div>
  {/if}
</div>

<style>
  .game-container {
    position: fixed;
    inset: 0;
    background: var(--color-screen-black, #000814);
    overflow: hidden;
  }

  .game-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .instructions-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 8, 20, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .instructions-box {
    text-align: center;
    padding: 48px;
    border: 4px solid var(--color-arcade-cyan, #00bcd4);
    background: rgba(26, 31, 58, 0.8);
    max-width: 600px;
  }

  .title {
    font-size: clamp(32px, 6vw, 48px);
    color: var(--color-arcade-yellow, #ffd700);
    margin-bottom: 32px;
    text-shadow: 3px 3px 0 var(--color-warning-red, #ff3333);
  }

  .instructions {
    font-size: clamp(10px, 2vw, 14px);
    color: var(--color-gray-1, #e8dfd0);
    line-height: 2;
    margin-bottom: 32px;
    white-space: pre-line;
  }

  .loading {
    font-size: 16px;
    color: var(--color-arcade-cyan, #00bcd4);
  }

  .dots {
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%, 33% { opacity: 0; }
    34%, 66% { opacity: 0.5; }
    67%, 100% { opacity: 1; }
  }

  .hud {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    pointer-events: none;
    z-index: 5;
  }

  .timer {
    font-size: clamp(14px, 3vw, 20px);
    color: var(--color-arcade-yellow, #ffd700);
    background: rgba(0, 8, 20, 0.7);
    padding: 12px 24px;
    border: 2px solid var(--color-arcade-yellow, #ffd700);
  }

  .skip-button {
    font-size: clamp(10px, 2vw, 12px);
    color: var(--color-gray-1, #e8dfd0);
    background: rgba(0, 8, 20, 0.7);
    padding: 12px 24px;
    border: 2px solid var(--color-gray-3, #665544);
    cursor: pointer;
    pointer-events: all;
    transition: all 0.2s;
  }

  .skip-button:hover {
    background: rgba(102, 85, 68, 0.3);
    border-color: var(--color-arcade-cyan, #00bcd4);
    color: var(--color-arcade-cyan, #00bcd4);
  }

  .fade-overlay {
    position: absolute;
    inset: 0;
    background: var(--color-screen-black, #000814);
    z-index: 20;
  }

  .pixel-text {
    font-family: 'Press Start 2P', monospace;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .instructions-box {
      padding: 32px 24px;
    }

    .hud {
      padding: 16px;
      flex-direction: column;
      gap: 12px;
    }

    .timer,
    .skip-button {
      font-size: 10px;
      padding: 8px 16px;
    }
  }
</style>
