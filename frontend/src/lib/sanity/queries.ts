import groq from 'groq';

export const TOKEN_QUERY = groq`{
  "light": *[_type == "designToken" && mode == "light" && isDefault == true][0],
  "dark": *[_type == "designToken" && mode == "dark" && isDefault == true][0]
}`;

export const NAV_QUERY = groq`*[_type == "navigation" && slug.current == "main-menu"][0]{
  items[]{
    text,
    link{
      external,
      internal->{slug}
    },
    target,
    children[]{
      text,
      link{
        external,
        internal->{slug}
      },
      target
    }
  }
}`;

export const LOGO_QUERY = groq`*[_type == "siteSettings"][0].logo`;
