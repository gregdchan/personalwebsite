// src/lib/types/navigation.d.ts
export interface NavItem {
  text: string
  link: string         // <-- this gets bound to <a href=...>
  target?: '_self' | '_blank'
  children?: NavItem[]
}

export interface Navigation {
  _id: string
  _type: 'navigation'
  title: string
  slug: { current: string }
  items: NavItem[]
}
