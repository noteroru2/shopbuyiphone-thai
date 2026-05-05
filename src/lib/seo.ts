export type BreadcrumbItem = { name: string; url: string };
export type FaqItem = { question: string; answer: string };

import { SITE } from '../config/site';
export { SITE };

export function absoluteUrl(pathname: string) {
  const base = SITE.url.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

/** Absolute URL โฮสต์ punycode — ใช้ใน JSON-LD รูป (Organization / LocalBusiness ฯลฯ) */
export function schemaAbsoluteUrl(pathname: string) {
  const base = SITE.schemaPublicOrigin.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function companyPostalAddressJsonLd() {
  const a = SITE.companyPostalAddress;
  return {
    '@type': 'PostalAddress',
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    postalCode: a.postalCode,
    addressCountry: a.addressCountry,
  };
}

const schemaDayUrls = [
  'https://schema.org/Monday',
  'https://schema.org/Tuesday',
  'https://schema.org/Wednesday',
  'https://schema.org/Thursday',
  'https://schema.org/Friday',
  'https://schema.org/Saturday',
  'https://schema.org/Sunday',
] as const;

export function businessOpeningHoursSpecificationJsonLd() {
  const { opens, closes } = SITE.businessHours;
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...schemaDayUrls],
    opens,
    closes,
  };
}

export function localBusinessSchema(opts?: { description?: string }) {
  const description = opts?.description ?? SITE.description;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    alternateName: SITE.physicalStoreName,
    url: SITE.url,
    telephone: SITE.telephone,
    image: schemaAbsoluteUrl(SITE.ogImage),
    address: companyPostalAddressJsonLd(),
    openingHoursSpecification: [businessOpeningHoursSpecificationJsonLd()],
    areaServed: SITE.areaServed,
    description,
    hasMap: SITE.googleMapsUrl,
    sameAs: [SITE.sameAs.facebook, SITE.lineUrl, SITE.sameAs.tiktok, SITE.googleMapsUrl],
    termsOfService: absoluteUrl('/เงื่อนไขการให้บริการ/'),
  };
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function serviceSchema(opts: { name: string; url: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    provider: {
      '@type': 'LocalBusiness',
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.telephone,
      address: companyPostalAddressJsonLd(),
      openingHoursSpecification: [businessOpeningHoursSpecificationJsonLd()],
    },
    areaServed: SITE.areaServed,
  };
}

