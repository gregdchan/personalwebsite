<script lang="ts">
        import ThemeToggle from '$lib/ThemeToggle.svelte';
        import type { Navigation, NavItem } from '$lib/types/navigation';
        import { onMount } from 'svelte';
        import { gsap } from 'gsap';
        
        export let navigation: Navigation | null;
        export let logoUrl: string | null = null;
        export let currentTheme: 'light' | 'dark' = 'light';

        let resolvedLogoUrl = '';
        let headerElement: HTMLElement;
        let navElement: HTMLElement;
        let isScrolled = false;
        let isMobileMenuOpen = false;
        
        $: if (!resolvedLogoUrl && logoUrl) resolvedLogoUrl = logoUrl;

        function href(item: NavItem) {
                if (typeof item.link === 'string') return item.link;
                if (item.link?.external) return item.link.external;
                const slug = item.link?.internal?.slug?.current;
                return slug ? `/${slug}` : '#';
        }

        function handleThemeChange(event: CustomEvent<'light' | 'dark'>) {
                currentTheme = event.detail;
        }
        
        function toggleMobileMenu() {
                isMobileMenuOpen = !isMobileMenuOpen;
        }
        
        function closeMobileMenu() {
                isMobileMenuOpen = false;
        }
        
        onMount(() => {
                // Header scroll effect
                const handleScroll = () => {
                        const scrollTop = window.scrollY;
                        const newIsScrolled = scrollTop > 50;
                        
                        if (newIsScrolled !== isScrolled) {
                                isScrolled = newIsScrolled;
                                
                                if (isScrolled) {
                                        gsap.to(headerElement, {
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                backdropFilter: 'blur(20px)',
                                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                                duration: 0.3,
                                                ease: 'power2.out'
                                        });
                                } else {
                                        gsap.to(headerElement, {
                                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                                backdropFilter: 'blur(0px)',
                                                boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                                                duration: 0.3,
                                                ease: 'power2.out'
                                        });
                                }
                        }
                };
                
                window.addEventListener('scroll', handleScroll);
                
                // Initial header animation
                gsap.fromTo(headerElement, 
                        { y: -100, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                );
                
                return () => {
                        window.removeEventListener('scroll', handleScroll);
                };
        });
</script>

<header 
        bind:this={headerElement}
        class="header {isScrolled ? 'scrolled' : ''}"
        data-has-logo={!!resolvedLogoUrl}
>
        <nav bind:this={navElement} class="nav-container">
                <div class="nav-content">
                        <a href="/" aria-label="Home" class="logo-link" on:click={closeMobileMenu}>
                                {#if resolvedLogoUrl}
                                        <img
                                                src={resolvedLogoUrl}
                                                alt="Site Logo"
                                                width="160"
                                                height="40"
                                                decoding="async"
                                                loading="eager"
                                                fetchpriority="high"
                                                class="logo-img"
                                        />
                                {:else}
                                        <span class="logo-text">Greg D. Chan</span>
                                {/if}
                        </a>

                        <!-- Desktop Navigation -->
                        {#if navigation?.items}
                                <div class="desktop-nav">
                                        {#each navigation.items as item}
                                                <a
                                                        href={href(item)}
                                                        class="nav-item"
                                                        target={item.target || '_self'}
                                                        on:click={closeMobileMenu}
                                                >
                                                        <span class="nav-text">{item.text}</span>
                                                        <span class="nav-underline"></span>
                                                </a>
                                        {/each}
                                </div>
                        {/if}
                        
                        <!-- Right side controls -->
                        <div class="nav-controls">
                                <ThemeToggle {currentTheme} on:themeChange={handleThemeChange} />
                                
                                <!-- Mobile menu button -->
                                <button 
                                        class="mobile-menu-button"
                                        on:click={toggleMobileMenu}
                                        aria-label="Toggle mobile menu"
                                >
                                        <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
                                        <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
                                        <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
                                </button>
                        </div>
                </div>
                
                <!-- Mobile Navigation -->
                {#if navigation?.items}
                        <div class="mobile-nav {isMobileMenuOpen ? 'open' : ''}">
                                {#each navigation.items as item}
                                        <a
                                                href={href(item)}
                                                class="mobile-nav-item"
                                                target={item.target || '_self'}
                                                on:click={closeMobileMenu}
                                        >
                                                {item.text}
                                        </a>
                                {/each}
                        </div>
                {/if}
        </nav>
</header>

<style>
        .header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 1);
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .header.scrolled {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-container {
                max-width: 1280px;
                margin: 0 auto;
                padding: 0 1.5rem;
        }
        
        .nav-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 4rem;
        }
        
        .logo-link {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: inherit;
                transition: transform 0.2s ease;
        }
        
        .logo-link:hover {
                transform: scale(1.05);
        }
        
        .logo-text {
                font-size: 1.5rem;
                font-weight: 800;
                color: var(--color-foreground);
        }
        
        .logo-img {
                height: 48px;
                object-fit: contain;
                transform: translateZ(0);
                backface-visibility: hidden;
                -webkit-font-smoothing: antialiased;
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
                will-change: transform;
        }
        
        .desktop-nav {
                display: none;
                align-items: center;
                gap: 2rem;
        }
        
        @media (min-width: 768px) {
                .desktop-nav {
                        display: flex;
                }
        }
        
        .nav-item {
                position: relative;
                padding: 0.5rem 0;
                color: var(--color-foreground);
                text-decoration: none;
                font-weight: 500;
                font-size: 0.875rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: color 0.3s ease;
        }
        
        .nav-item:hover {
                color: var(--color-primary);
        }
        
        .nav-underline {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--color-primary);
                transition: width 0.3s ease;
        }
        
        .nav-item:hover .nav-underline {
                width: 100%;
        }
        
        .nav-controls {
                display: flex;
                align-items: center;
                gap: 1rem;
        }
        
        .mobile-menu-button {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 2rem;
                height: 2rem;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
                z-index: 1001;
        }
        
        @media (min-width: 768px) {
                .mobile-menu-button {
                        display: none;
                }
        }
        
        .hamburger-line {
                width: 100%;
                height: 2px;
                background: var(--color-foreground);
                transition: all 0.3s ease;
                transform-origin: center;
        }
        
        .hamburger-line.open:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
        }
        
        .hamburger-line.open:nth-child(2) {
                opacity: 0;
        }
        
        .hamburger-line.open:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .mobile-nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                padding: 1rem 0;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-nav.open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
        }
        
        .mobile-nav-item {
                display: block;
                padding: 1rem 1.5rem;
                color: var(--color-foreground);
                text-decoration: none;
                font-weight: 500;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .mobile-nav-item:hover {
                background: rgba(0, 0, 0, 0.02);
                color: var(--color-primary);
                padding-left: 2rem;
        }
        
        .mobile-nav-item:last-child {
                border-bottom: none;
        }
        
        @media (max-width: 767px) {
                .nav-container {
                        padding: 0 1rem;
                }
        }
</style>
