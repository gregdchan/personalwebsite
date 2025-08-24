export interface NavigationItem {
  text?: string;
  link?: any;
  href?: string; // normalized URL from GROQ
}

export interface Navigation {
  items?: NavigationItem[];
}