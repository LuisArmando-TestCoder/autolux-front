export interface FAQItem {
  nombre_de_marca: string;
  respuesta: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface SettingsMetadata {
  hero_image: CosmicImage;
  hero_title_part1: string;
  hero_title_highlight: string;
  hero_title_part2: string;
  hero_subtitle: string;
  quote_button_label: string;
  quote_button_link: string;
  services_button_label: string;
  services_button_anchor: string;
  store_button_label: string;
  store_button_route: string;
  trust_title: string;
  trust_brands: { brand: string }[];
  faq_title: string;
  faq_items: FAQItem[];
  store_hero_image: CosmicImage;
  store_hero_title: string;
  store_hero_title_highlight: string;
  store_hero_subtitle: string;
  footer_logo: CosmicImage | null;
  footer_description: string;
  instagram_url: string;
  facebook_url: string;
  contact_address: string;
  contact_phone: string;
  contact_email: string;
  hours_weekdays: string;
  hours_saturday: string;
  footer_navigation: FooterLink[];
  copyright_text: string;
}

export interface CosmicObject {
  slug: string;
  title: string;
  type: string;
  metadata: SettingsMetadata;
}

export interface CosmicResponse {
  object: CosmicObject;
}
