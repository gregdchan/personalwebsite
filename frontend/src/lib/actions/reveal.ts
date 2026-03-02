type RevealOptions = {
	delay?: number;
	once?: boolean;
	rootMargin?: string;
	threshold?: number;
	visibleClass?: string;
};

const DEFAULTS: Required<Omit<RevealOptions, 'delay'>> = {
	once: true,
	rootMargin: '0px 0px -8% 0px',
	threshold: 0.12,
	visibleClass: 'is-visible'
};

const supportsObserver = () =>
	typeof window !== 'undefined' &&
	'IntersectionObserver' in window &&
	typeof window.IntersectionObserver === 'function';

const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	typeof window.matchMedia === 'function' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	let observer: IntersectionObserver | null = null;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let current = { ...DEFAULTS, ...options };

	node.classList.add('reveal-in');

	const makeVisible = () => {
		if (timeoutId) clearTimeout(timeoutId);
		const delay = Math.max(0, Number(current.delay ?? 0));
		if (delay === 0) {
			node.classList.add(current.visibleClass);
			return;
		}
		timeoutId = setTimeout(() => node.classList.add(current.visibleClass), delay);
	};

	const destroyObserver = () => {
		if (observer) observer.disconnect();
		observer = null;
	};

	const init = () => {
		node.classList.remove(current.visibleClass);
		destroyObserver();

		if (!supportsObserver() || prefersReducedMotion()) {
			node.classList.add(current.visibleClass);
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					makeVisible();
					if (current.once) destroyObserver();
				}
			},
			{
				root: null,
				rootMargin: current.rootMargin,
				threshold: current.threshold
			}
		);

		observer.observe(node);
	};

	init();

	return {
		update(next: RevealOptions = {}) {
			current = { ...DEFAULTS, ...next };
			init();
		},
		destroy() {
			if (timeoutId) clearTimeout(timeoutId);
			destroyObserver();
		}
	};
}
