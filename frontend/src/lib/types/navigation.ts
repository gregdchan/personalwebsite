export interface NavigationItem {
  text?: string;
  link?: any;
  href?: string; // normalized URL from GROQ
  target?: '_self' | '_blank' | string;
}

export interface Navigation {
  items?: NavigationItem[];
}
