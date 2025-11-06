import { cubicInOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

/**
 * Pixelate transition - creates a retro pixelation effect
 */
export function pixelate(
  node: HTMLElement,
  { duration = 400, easing = cubicInOut }
): TransitionConfig {
  return {
    duration,
    easing,
    css: (t: number) => {
      const pixels = Math.floor((1 - t) * 16);
      return `
        filter: blur(${(1 - t) * 4}px);
        transform: scale(${0.9 + (t * 0.1)});
        opacity: ${t};
      `;
    }
  };
}

/**
 * Iris wipe transition - circular reveal like Zelda games
 */
export function irisWipe(
  node: HTMLElement,
  { duration = 600, reverse = false }
): TransitionConfig {
  return {
    duration,
    css: (t: number) => {
      const progress = reverse ? 1 - t : t;
      const size = progress * 150;
      return `
        clip-path: circle(${size}% at 50% 50%);
      `;
    }
  };
}

/**
 * Retro wipe transition - horizontal pixel wipe
 */
export function retroWipe(
  node: HTMLElement,
  { duration = 400, direction = 'left' as 'left' | 'right' }
): TransitionConfig {
  return {
    duration,
    css: (t: number) => {
      const clipValue = direction === 'left' ? `0 ${(1 - t) * 100}% 0 0` : `0 0 0 ${t * 100}%`;
      return `
        clip-path: inset(${clipValue});
        filter: blur(${(1 - t) * 2}px);
      `;
    }
  };
}

/**
 * Scanline reveal - top to bottom reveal with scanline effect
 */
export function scanlineReveal(
  node: HTMLElement,
  { duration = 600 }
): TransitionConfig {
  return {
    duration,
    css: (t: number) => {
      return `
        clip-path: inset(${(1 - t) * 100}% 0 0 0);
        filter: contrast(${1 + (1 - t) * 0.5});
      `;
    }
  };
}

/**
 * CRT screen power-on effect
 */
export function crtPowerOn(
  node: HTMLElement,
  { duration = 800 }
): TransitionConfig {
  return {
    duration,
    css: (t: number) => {
      const scaleY = t < 0.3 ? t / 0.3 * 0.01 : 0.01 + (t - 0.3) / 0.7 * 0.99;
      const brightness = t < 0.5 ? 2 : 2 - (t - 0.5) * 2;
      return `
        transform: scaleY(${scaleY}) scaleX(${t});
        filter: brightness(${brightness});
        opacity: ${t};
      `;
    }
  };
}

/**
 * Glitch transition - quick random displacement
 */
export function glitch(
  node: HTMLElement,
  { duration = 400 }
): TransitionConfig {
  return {
    duration,
    css: (t: number) => {
      const glitchIntensity = Math.sin(t * 20) * (1 - t) * 10;
      const colorShift = (1 - t) * 5;
      return `
        transform: translate(${glitchIntensity}px, ${glitchIntensity * 0.5}px);
        filter:
          hue-rotate(${colorShift}deg)
          saturate(${1 + (1 - t) * 0.5});
        opacity: ${t};
      `;
    }
  };
}
