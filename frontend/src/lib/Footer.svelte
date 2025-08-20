<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  let footerElement: HTMLElement;
  let currentYear = new Date().getFullYear();
  
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate footer on scroll
    gsap.fromTo(footerElement,
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerElement,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
</script>

<footer bind:this={footerElement} class="footer">
  <div class="container">
    <div class="footer-content">
      <!-- Main footer section -->
      <div class="footer-main">
        <div class="footer-brand">
          <h3 class="footer-title">Greg D. Chan</h3>
          <p class="footer-tagline">Building digital experiences that matter</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-section">
            <h4 class="footer-section-title">Navigation</h4>
            <ul class="footer-link-list">
              <li><a href="/" class="footer-link">Home</a></li>
              <li><a href="/projects" class="footer-link">Projects</a></li>
              <li><a href="/about" class="footer-link">About</a></li>
              <li><a href="/contact" class="footer-link">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-section-title">Connect</h4>
            <ul class="footer-link-list">
              <li>
                <a href="https://github.com/yourusername" class="footer-link social-link" target="_blank" rel="noopener noreferrer">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/yourusername" class="footer-link social-link" target="_blank" rel="noopener noreferrer">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com/yourusername" class="footer-link social-link" target="_blank" rel="noopener noreferrer">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Footer bottom -->
      <div class="footer-bottom">
        <div class="footer-legal">
          <p class="footer-copyright">
            © {currentYear} Greg D. Chan. All rights reserved.
          </p>
          <div class="footer-legal-links">
            <a href="/privacy" class="footer-legal-link">Privacy Policy</a>
            <span class="footer-separator">•</span>
            <a href="/terms" class="footer-legal-link">Terms of Service</a>
          </div>
        </div>
        
        <div class="footer-back-to-top">
          <button 
            class="back-to-top-btn"
            on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <svg class="back-to-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-background);
    border-top: 1px solid var(--color-border);
    padding: var(--space-16) 0 var(--space-8) 0;
    margin-top: var(--space-16);
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }
  
  .footer-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-12);
    align-items: start;
  }
  
  .footer-brand {
    max-width: 300px;
  }
  
  .footer-title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-foreground);
    margin-bottom: var(--space-3);
  }
  
  .footer-tagline {
    color: var(--color-muted);
    line-height: var(--line-height-relaxed);
    margin: 0;
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-8);
  }
  
  .footer-section-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-foreground);
    margin-bottom: var(--space-4);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .footer-link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .footer-link {
    color: var(--color-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
  
  .footer-link:hover {
    color: var(--color-primary);
  }
  
  .social-link {
    font-weight: var(--font-weight-medium);
  }
  
  .social-icon {
    width: 18px;
    height: 18px;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-8);
    border-top: 1px solid var(--color-border);
    flex-wrap: wrap;
    gap: var(--space-4);
  }
  
  .footer-legal {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    flex-wrap: wrap;
  }
  
  .footer-copyright {
    color: var(--color-muted);
    margin: 0;
    font-size: var(--font-size-sm);
  }
  
  .footer-legal-links {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  
  .footer-legal-link {
    color: var(--color-muted);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
  }
  
  .footer-legal-link:hover {
    color: var(--color-primary);
  }
  
  .footer-separator {
    color: var(--color-muted);
    font-size: var(--font-size-sm);
  }
  
  .back-to-top-btn {
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-md);
  }
  
  .back-to-top-btn:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .back-to-top-icon {
    width: 20px;
    height: 20px;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .footer-main {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
    
    .footer-links {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }
    
    .footer-bottom {
      flex-direction: column;
      text-align: center;
      gap: var(--space-6);
    }
    
    .footer-legal {
      flex-direction: column;
      gap: var(--space-4);
    }
  }
  
  @media (max-width: 640px) {
    .footer {
      padding: var(--space-12) 0 var(--space-6) 0;
    }
    
    .footer-title {
      font-size: var(--font-size-xl);
    }
    
    .footer-tagline {
      font-size: var(--font-size-sm);
    }
  }
</style>
