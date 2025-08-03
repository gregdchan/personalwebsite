// src/lib/types/nav.ts
export interface NavChild {
	text: string;
	link: string;
}

export interface NavItem {
	text: string;
	link: string;
	children?: NavChild[];
}
