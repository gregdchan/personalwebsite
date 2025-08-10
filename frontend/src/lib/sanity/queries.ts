import groq from 'groq';

export const LOGO_QUERY = groq`*[_type == "siteSettings"][0].logo`;
