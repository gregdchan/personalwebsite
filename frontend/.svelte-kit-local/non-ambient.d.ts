
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about-me" | "/game" | "/play" | "/play/[slug]" | "/work" | "/work/[slug]" | "/[...slug]";
		RouteParams(): {
			"/play/[slug]": { slug: string };
			"/work/[slug]": { slug: string };
			"/[...slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about-me": Record<string, never>;
			"/game": Record<string, never>;
			"/play": { slug?: string };
			"/play/[slug]": { slug: string };
			"/work": { slug?: string };
			"/work/[slug]": { slug: string };
			"/[...slug]": { slug: string }
		};
		Pathname(): "/" | "/about-me" | "/about-me/" | "/game" | "/game/" | "/play" | "/play/" | `/play/${string}` & {} | `/play/${string}/` & {} | "/work" | "/work/" | `/work/${string}` & {} | `/work/${string}/` & {} | `/${string}` & {} | `/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | "/images/headshot.webp" | "/images/logo.webp" | "/images/s-l1600 (1).webp" | "/images/s-l1600.webp" | string & {};
	}
}