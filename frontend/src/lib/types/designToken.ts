// types/designToken.ts
export interface DesignToken {
	themeName?: string;
	mode?: 'light' | 'dark';

	colors?: {
		primary?: { hex: string };
		secondary?: { hex: string };
		background?: { hex: string };
		foreground?: { hex: string };
		headerBackground?: { hex: string };
		headerText?: { hex: string };
		bodyBackground?: { hex: string };
		bodyText?: { hex: string };
		accent?: { hex: string };
		muted?: { hex: string };
	};

	typography?: {
		fontFamily?: string;
		customFontFamily?: string;
		fontSize?: number;
		fontWeight?: string;
		textTransform?: string;

		h1Size?: number;
		h2Size?: number;
		h3Size?: number;

		h1Weight?: string;
		h2Weight?: string;
		h3Weight?: string;
	};

	spacing?: {
		space?: number;
		borderRadius?: number;
		boxShadow?: string;
	};
}
