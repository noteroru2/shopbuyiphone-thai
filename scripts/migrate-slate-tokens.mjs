import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const extra = [
  'src/components/PopularServicesLinks.astro',
  'src/components/HomeMoneyPageLinks.astro',
  'src/components/TrustBadges.astro',
  'src/components/HubBuyIphoneMain.astro',
  'src/components/PhotoGuide.astro',
  'src/components/SafetySection.astro',
  'src/components/SoftImageStrip.astro',
  'src/components/HomeConditionPricingSection.astro',
  'src/components/HomeSellPrepSection.astro',
  'src/components/PopularModelChips.astro',
  'src/components/HomeIphoneTerminologySection.astro',
  'src/components/PartnerSites.astro',
  'src/components/ReviewCards.astro',
  'src/components/TrustGallery.astro',
  'src/components/BrandLogo.astro',
  'src/components/WhyChooseUs.astro',
  'src/pages/เว็บไซต์ในเครือ/index.astro',
];

const files = [
  ...extra,
  'src/pages/เกี่ยวกับเรา.astro',
  'src/pages/ขายไอโฟน.astro',
  'src/pages/คำถามที่พบบ่อย/index.astro',
  'src/pages/รับซื้อ-iphone.astro',
  'src/pages/ตีราคาไอโฟน.astro',
  'src/pages/วิธีขายไอโฟน/index.astro',
  'src/pages/รับซื้อไอโฟน/index.astro',
  'src/pages/รับซื้อไอโฟนมือสอง.astro',
  'src/pages/404.astro',
  'src/pages/เช็คราคาไอโฟน.astro',
  'src/pages/blog/[slug].astro',
  'src/pages/พื้นที่ให้บริการ/index.astro',
  'src/pages/ติดต่อเรา.astro',
  'src/pages/blog/index.astro',
  'src/components/Hero.astro',
  'src/components/HomeDataPrivacySection.astro',
  'src/components/IphoneTypesSection.astro',
];

const pairs = [
  [/prose-slate/g, 'prose-stone'],
  [/prose-headings:text-slate-900/g, 'prose-headings:text-text-dark'],
  [/prose-p:text-slate-700/g, 'prose-p:text-text-muted'],
  [/prose-li:text-slate-700/g, 'prose-li:text-text-muted'],
  [/prose-code:bg-slate-100/g, 'prose-code:bg-section-warm'],
  [/text-slate-900/g, 'text-text-dark'],
  [/text-slate-800/g, 'text-text-dark'],
  [/text-slate-700/g, 'text-text-muted'],
  [/text-slate-600/g, 'text-text-muted'],
  [/text-slate-500/g, 'text-gray-medium'],
  [/text-slate-400/g, 'text-gray-medium'],
  [/text-slate-300/g, 'text-muted-light'],
  [/border-slate-200\/90/g, 'border-gold-border/25'],
  [/border-slate-200\/80/g, 'border-gold-border/25'],
  [/border-slate-200\/70/g, 'border-gold-border/25'],
  [/border-slate-200\/60/g, 'border-gold-border/25'],
  [/border-slate-200/g, 'border-gold-border/25'],
  [/border-slate-300/g, 'border-gold-border/40'],
  [/bg-slate-50\/80/g, 'bg-section-warm/90'],
  [/bg-slate-50/g, 'bg-section-warm'],
  [/hover:bg-slate-50/g, 'hover:bg-section-warm'],
  [/hover:text-slate-900/g, 'hover:text-text-dark'],
  [/hover:border-slate-300/g, 'hover:border-gold-border'],
  [/hover:border-emerald-300/g, 'hover:border-gold-border'],
  [/text-slate-muted/g, 'text-muted-light'],
  [/via-slate-50/g, 'via-section-warm'],
  [/ring-slate-200\/60/g, 'ring-gold-border/25'],
  [/hover:bg-slate-900/g, 'hover:bg-black'],
  [/bg-slate-900/g, 'bg-charcoal'],
];

for (const rel of files) {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) {
    console.warn('skip missing', rel);
    continue;
  }
  let c = fs.readFileSync(fp, 'utf8');
  for (const [re, rep] of pairs) {
    c = c.replace(re, rep);
  }
  fs.writeFileSync(fp, c);
  console.log('ok', rel);
}
