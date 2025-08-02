export interface NavigationItem {
  text: string;
  link: string;
  resolvedLink?: string;
  target?: string;
  children?: NavigationItem[];
}

export interface Navigation {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  items: NavigationItem[];
}