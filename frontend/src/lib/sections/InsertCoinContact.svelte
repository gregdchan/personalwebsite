<script lang="ts">
  import { spring } from 'svelte/motion';
  import { scale, fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  export let contacts = [
    { type: 'email', icon: '📧', label: 'EMAIL', url: 'mailto:hello@gregdchan.com' },
    { type: 'linkedin', icon: '💼', label: 'LINKEDIN', url: 'https://linkedin.com' },
    { type: 'github', icon: '💻', label: 'GITHUB', url: 'https://github.com' },
    { type: 'twitter', icon: '🐦', label: 'TWITTER', url: 'https://twitter.com' }
  ];

  export let title = 'INSERT COIN TO START';

  // Spring physics for button press
  const buttonPress = spring(
    { y: 0, shadow: 6 },
    {
      stiffness: 0.4,
      damping: 0.3
    }
  );

  let activeButton = $state<string | null>(null);

  function pressButton(contact: any) {
    activeButton = contact.type;
    buttonPress.set({ y: 4, shadow: 2 });

    // Release after delay and navigate
    setTimeout(() => {
      buttonPress.set({ y: 0, shadow: 6 });
      activeButton = null;

      // Open link
      if (contact.url) {
        window.open(contact.url, '_blank');
      }
    }, 150);
  }
</script>

<section class="contact-arcade">
  <div class="coin-slot-screen" in:scale={{ duration: 500, easing: elasticOut }}>
    <div class="coin-slot-top">
      <h2 class="pixel-text flashing" in:fly={{ y: -30, delay: 100 }}>
        {title}
      </h2>

      <div class="coin-slot-visual" in:scale={{ delay: 200, easing: elasticOut }}>
        <div class="slot-opening"></div>
      </div>
    </div>

    <div class="contact-grid">
      {#each contacts as contact, i}
        <button
          class="arcade-contact-btn"
          in:scale={{ delay: 300 + (i * 100), duration: 400, easing: elasticOut }}
          onclick={() => pressButton(contact)}
        >
          <div
            class="btn-top"
            style="
              transform: translateY({activeButton === contact.type ? $buttonPress.y : 0}px);
            "
          >
            {contact.icon}
          </div>
          <div class="btn-label pixel-text">{contact.label}</div>
          <div
            class="btn-shadow"
            style="height: {activeButton === contact.type ? $buttonPress.shadow : 6}px"
          ></div>
        </button>
      {/each}
    </div>

    <div class="credits-counter" in:fly={{ y: 30, delay: 700 }}>
      <span class="pixel-text">CREDITS: ∞</span>
    </div>
  </div>
</section>

<style>
  .contact-arcade {
    background: linear-gradient(180deg, var(--color-gray-4), var(--color-screen-black));
    padding: 64px 32px;
    text-align: center;
  }

  .coin-slot-screen {
    max-width: 600px;
    margin: 0 auto;
    background: var(--color-screen-glow);
    border: 8px solid var(--color-cabinet-wood);
    padding: 48px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  .coin-slot-top h2 {
    font-size: clamp(16px, 3vw, 24px);
    color: var(--color-arcade-yellow);
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .flashing {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .coin-slot-visual {
    width: 120px;
    height: 40px;
    background: var(--color-screen-black);
    border: 4px solid var(--color-gray-3);
    margin: 0 auto 48px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
  }

  .slot-opening {
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, transparent, var(--color-arcade-cyan), transparent);
    animation: slot-glow 2s ease-in-out infinite;
  }

  @keyframes slot-glow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }

  .arcade-contact-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.1s;
  }

  .arcade-contact-btn:active {
    transform: translateY(2px);
  }

  .btn-top {
    background: linear-gradient(180deg, var(--color-arcade-orange), var(--color-arcade-pink));
    border: 4px solid var(--color-gray-4);
    border-radius: 12px;
    padding: 24px;
    font-size: 48px;
    box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.2s;
  }

  .btn-label {
    font-size: clamp(10px, 1.5vw, 12px);
    color: var(--color-gray-1);
    margin-top: 12px;
  }

  .btn-shadow {
    position: absolute;
    bottom: -6px;
    left: 4px;
    right: 4px;
    background: var(--color-screen-black);
    border-radius: 0 0 8px 8px;
    transition: height 0.1s;
    z-index: -1;
  }

  .arcade-contact-btn:hover .btn-top {
    background: linear-gradient(180deg, #ffaa44, #ff7bae);
    box-shadow:
      inset 0 -4px 0 rgba(0, 0, 0, 0.2),
      0 0 20px rgba(255, 153, 51, 0.5);
    transform: scale(1.05);
  }

  .credits-counter {
    font-family: 'Press Start 2P', monospace;
    font-size: 14px;
    color: var(--color-arcade-green);
  }

  .pixel-text {
    font-family: 'Press Start 2P', monospace;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .contact-arcade {
      padding: 48px 16px;
    }

    .coin-slot-screen {
      padding: 32px 24px;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .btn-top {
      font-size: 36px;
      padding: 20px;
    }
  }
</style>
