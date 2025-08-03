export interface Page {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	content: unknown; // You could make this more specific based on your Portable Text structure
	seo?: {
		title?: string;
		description?: string;
	};
}
