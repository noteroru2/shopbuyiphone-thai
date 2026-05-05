import { SITE } from '../config/site';
import { absoluteUrl, businessOpeningHoursSpecificationJsonLd, companyPostalAddressJsonLd, schemaAbsoluteUrl } from './seo';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.companyLegalName,
    alternateName: SITE.physicalStoreName,
    url: SITE.url,
    address: companyPostalAddressJsonLd(),
    logo: schemaAbsoluteUrl(SITE.logo),
    image: schemaAbsoluteUrl(SITE.logo),
    telephone: SITE.telephone,
    description: SITE.description,
    sameAs: [SITE.sameAs.facebook, SITE.lineUrl, SITE.sameAs.tiktok, SITE.googleMapsUrl],
    knowsAbout: [
      'รับซื้อ iPhone มือสอง',
      'รับซื้อไอโฟนมือสอง',
      'ประเมินราคามือสองจากรูป',
      'เช็คราคาไอโฟนก่อนขาย',
      'ความปลอดภัยของข้อมูลก่อนขายมือถือ',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: SITE.telephone,
        url: SITE.lineUrl,
        availableLanguage: ['Thai'],
      },
    ],
    openingHoursSpecification: [businessOpeningHoursSpecificationJsonLd()],
    publishingPrinciples: absoluteUrl('/เกี่ยวกับเรา/'),
    termsOfService: absoluteUrl('/เงื่อนไขการให้บริการ/'),
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
  };
}

export function webPageSchema(opts: { title: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: opts.url,
    inLanguage: SITE.language,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  };
}

export function blogPostingSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  /** สรุปสั้นสำหรับ snippet / AEO */
  abstract?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.headline,
    description: opts.description,
    ...(opts.abstract ? { abstract: opts.abstract } : {}),
    mainEntityOfPage: opts.url,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: SITE.language,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: schemaAbsoluteUrl(SITE.logo) },
    },
    ...(opts.image ? { image: [opts.image] } : {}),
  };
}

export function itemListSchema(opts: { name: string; url: string; items: { name: string; url: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    url: opts.url,
    itemListElement: opts.items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  url: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: SITE.language,
    totalTime: 'PT20M',
    step: opts.steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
