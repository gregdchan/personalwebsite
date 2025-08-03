// src/lib/types/navigation.d.ts
export interface NavItem {
	text: string;
	link: string; // This should always be a string (resolved URL)
	target?: '_self' | '_blank';
	children?: NavItem[];
}

export interface Navigation {
	_id: string;
	_type: 'navigation';
	title: string;
	slug: { current: string };
	items: NavItem[];
}
