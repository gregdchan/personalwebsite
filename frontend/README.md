# Greg D. Chan - Personal Website Frontend

A modern, interactive personal website built with SvelteKit, featuring smooth animations, responsive design, and a clean architecture.

## ✨ Features

### 🎨 Modern Design System
- **CSS Custom Properties**: Comprehensive design token system with CSS variables
- **Typography**: Inter font family for clean, readable text
- **Color Schemes**: Light and dark theme support with smooth transitions
- **Spacing Scale**: Consistent spacing using CSS custom properties
- **Component Library**: Reusable UI components with consistent styling

### 🚀 Interactive Elements
- **GSAP Animations**: Smooth, performant animations throughout the site
- **Scroll Triggers**: Elements animate as they come into view
- **Parallax Effects**: Subtle background movement for depth
- **Hover States**: Interactive feedback on all interactive elements
- **Smooth Transitions**: Consistent animation timing and easing

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Optimized for mobile interactions
- **Performance**: Optimized images and lazy loading

### 🎯 Key Components

#### Hero Section
- Full-screen hero with background images/videos
- Smooth text reveal animations
- Call-to-action buttons with hover effects
- Parallax background effects
- Scroll indicator animation

#### Navigation
- Fixed header with scroll effects
- Mobile hamburger menu
- Smooth transitions and animations
- Theme toggle with animated icons

#### Footer
- Comprehensive site information
- Social media links
- Back-to-top button
- Responsive grid layout

## 🛠️ Technology Stack

- **Framework**: SvelteKit 2.0
- **Styling**: Tailwind CSS 4.0 + Custom CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Custom SVG icons
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
frontend/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── sections/
│   │   │   │   └── Hero.svelte          # Hero section component
│   │   │   ├── Frame.svelte             # Frame wrapper component
│   │   │   ├── PortableText.svelte      # Rich text renderer
│   │   │   └── ScrollAnimation.svelte   # Scroll animation wrapper
│   │   ├── Header.svelte                # Site header component
│   │   ├── Footer.svelte                # Site footer component
│   │   ├── ThemeToggle.svelte           # Theme switcher
│   │   ├── stores/                      # Svelte stores
│   │   ├── types/                       # TypeScript type definitions
│   │   └── utils/                       # Utility functions
│   ├── routes/                          # SvelteKit routes
│   ├── app.css                          # Global styles and CSS variables
│   └── app.html                         # HTML template
├── tailwind.config.js                   # Tailwind configuration
├── package.json                         # Dependencies
└── README.md                            # This file
```

## 🎨 Design System

### CSS Custom Properties

The design system uses CSS custom properties for consistent theming:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  
  /* Typography */
  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  
  /* Spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;
  
  /* Transitions */
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Component Classes

Utility classes for common patterns:

```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## 🎭 Using Components

### Hero Section

```svelte
<Hero 
  heading="Welcome to My Site"
  subheading="Building amazing digital experiences"
  backgroundType="image"
  backgroundImage={heroImage}
  cta={{ text: "Get Started", url: "/contact" }}
/>
```

### Scroll Animations

```svelte
<ScrollAnimation animation="slideUp" duration={0.8} delay={0.2}>
  <div class="content">
    This content will animate when scrolled into view
  </div>
</ScrollAnimation>
```

### Theme Toggle

```svelte
<ThemeToggle currentTheme={$theme} on:themeChange={handleThemeChange} />
```

## 🎨 Customization

### Adding New Colors

1. Add to CSS variables in `app.css`:
   ```css
   :root {
     --color-custom: #your-color;
   }
   ```

2. Add to Tailwind config:
   ```js
   colors: {
     custom: 'var(--color-custom)',
   }
   ```

### Creating New Components

1. Create component in `src/lib/components/`
2. Use CSS custom properties for consistent styling
3. Add GSAP animations where appropriate
4. Include responsive design considerations

### Adding New Animations

1. Use the `ScrollAnimation` component wrapper
2. Define custom GSAP animations in component `onMount`
3. Use consistent timing and easing variables

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 640px
- **Tablet**: 641px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: 1025px+

## 🎯 Performance Tips

- Use `loading="lazy"` for images below the fold
- Implement proper image optimization with Sanity
- Use CSS transforms for animations (GPU accelerated)
- Minimize JavaScript bundle size
- Implement proper caching strategies

## 🔧 Development

### Code Style

- Use TypeScript for type safety
- Follow Svelte best practices
- Use CSS custom properties for theming
- Implement proper accessibility features
- Write responsive, mobile-first CSS

### Testing

```bash
# Run unit tests
npm run test:unit

# Run end-to-end tests
npm run test:e2e

# Run all tests
npm run test
```

## 📚 Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using modern web technologies
