export interface Section {
  heading: string;
  body: string;
}

export interface Pillar {
  id: string;
  title: string;
  summary: string;
  cta: string;
}

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
}

export interface SiteContent {
  site: {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    url: string;
    email: string;
    location: string;
    ogImage: string;
  };
  nav: {
    home: string;
    business: string;
    philanthropy: string;
    publicService: string;
    news: string;
    contact: string;
    sitemap: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  intro: {
    title: string;
    body: string;
  };
  pillars: Pillar[];
  business: {
    title: string;
    lead: string;
    intro: string;
    sections: Section[];
    philosophyTitle: string;
    philosophy: string;
  };
  philanthropy: {
    title: string;
    lead: string;
    intro: string;
    sections: Section[];
  };
  publicService: {
    title: string;
    lead: string;
    intro: string;
    sections: Section[];
  };
  news: {
    title: string;
    lead: string;
    posts: NewsPost[];
  };
  contact: {
    title: string;
    lead: string;
    intro: string;
    emailLabel: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
  footer: {
    rights: string;
    builtNote: string;
  };
}
