export type Locale = "en" | "he";

/** A piece of text available in both site languages. */
export type Localized = { en: string; he: string };

export type SocialLink = { platform: string; url: string };

export type BlockType = "text" | "quote" | "stat" | "cards" | "image";

export type BlockItem = {
  title?: Localized;
  body?: Localized;
  value?: Localized;
  label?: Localized;
  href?: string;
};

/**
 * A content block. Fields are optional so the same shape edits every block
 * type in the dashboard; the renderer reads the fields relevant to `type`.
 */
export type Block = {
  id: string;
  type: BlockType;
  heading?: Localized;
  body?: Localized;
  attribution?: Localized;
  image?: string;
  caption?: Localized;
  items?: BlockItem[];
};

export type Hero = {
  title: Localized;
  subtitle: Localized;
  image?: string;
  cta_label?: Localized;
  cta_href?: string;
};

export type PageSEO = {
  title?: Localized;
  description?: Localized;
  og_image?: string;
};

export type PageKey =
  | "home"
  | "about"
  | "business"
  | "philanthropy"
  | "public-service"
  | "contact";

export type Page = {
  key: PageKey;
  title: Localized;
  hero: Hero;
  blocks: Block[];
  seo: PageSEO;
  is_published: boolean;
  sort_order: number;
};

export type PersonSchema = {
  name: string;
  alternateName: string[];
  jobTitle: Localized;
  description: Localized;
  image?: string;
  sameAs: string[];
  worksFor?: string;
  knowsAbout?: string[];
};

export type SiteSettings = {
  site_name: Localized;
  tagline: Localized;
  contact_email: string;
  social_links: SocialLink[];
  seo_defaults: { title: Localized; description: Localized; og_image?: string };
  person_schema: PersonSchema;
};

export type MediaKind = "article" | "press" | "video" | "reading" | "writing";

export type MediaItem = {
  id: string;
  slug: string;
  kind: MediaKind;
  title: Localized;
  excerpt: Localized;
  body: Localized;
  cover_image?: string;
  external_url?: string;
  published_at: string | null;
  is_published: boolean;
  sort_order: number;
  seo: PageSEO;
};
