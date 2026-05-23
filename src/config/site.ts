import { serviceAreaGroups } from '../data/service-areas';

/** ใช้ใน JSON-LD LocalBusiness/Service เท่านั้น — ไม่ขยาย claim เกินพื้นที่หลักที่รับงาน */
const schemaAreaServed = [
  'กรุงเทพมหานคร',
  'ปริมณฑล',
  'ภาคอีสาน',
  'อุบลราชธานี',
  'ขอนแก่น',
  'อุดรธานี',
  'นครราชสีมา',
] as const;

export const SITE = {
  name: 'ร้านรับซื้อไอโฟน.com',
  /** นิติบุคคลผู้ดำเนินการเว็บไซต์ (ชื่อในหนังสือรับรอง) */
  companyLegalName: 'บริษัท อำพล เทรดดิ้ง จำกัด',
  /** เลขทะเบียนนิติบุคคล */
  companyRegistrationNumber: '0345569001234',
  /** ใบอนุญาตค้าของเก่า เลขที่อ้างอิง */
  oldGoodsLicenseNumber: 'ใบอนุญาตเลขที่ 13/2566',
  /** ที่อยู่จดทะเบียน — แสดงบนเว็บและเอกสาร */
  companyAddressDisplay:
    '740/8 ถนนชยางกูร ตำบลในเมือง อำเภอเมืองอุบลราชธานี จังหวัดอุบลราชธานี 34000',
  /** แยกฟิลด์สำหรับ JSON-LD PostalAddress */
  companyPostalAddress: {
    streetAddress: '740/8 ถนนชยางกูร ตำบลในเมือง',
    addressLocality: 'อำเภอเมืองอุบลราชธานี',
    addressRegion: 'อุบลราชธานี',
    postalCode: '34000',
    addressCountry: 'TH',
  },
  /** ชื่อหน้าร้านจริงบน Google Maps / Google Business Profile */
  physicalStoreName: 'ร้านอำพล เทรดดิ้ง',
  /** ลิงก์ไปที่หน้าร้านจริง (Google Maps) */
  googleMapsUrl: 'https://maps.app.goo.gl/MRNFJY318DSg2Q22A',
  shortName: 'รับซื้อไอโฟน',
  /** Canonical base URL — เปลี่ยนที่เดียวเมื่อมีโดเมน punycode/จริง */
  url: 'https://ร้านรับซื้อไอโฟน.com/',
  /** โอริจิน punycode สำหรับ URL รูปใน JSON-LD (crawler / IDN) */
  schemaPublicOrigin: 'https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com',
  description:
    'ร้านรับซื้อไอโฟน.com ให้บริการประเมินราคา iPhone มือสอง ประเมินตามรุ่นและสภาพจริง (รวมความจุตามเครื่อง) ลูกค้าสามารถส่งรูปผ่านไลน์ @webuy เพื่อเช็คราคาเบื้องต้นก่อนตัดสินใจขาย หรือโทร 0642579353',
  mainKeyword: 'รับซื้อไอโฟน',
  phone: '0642579353',
  telephone: '0642579353',
  lineUrl: 'https://line.me/R/ti/p/@webuy',
  lineId: '@webuy',
  lineHandle: '@webuy',
  /** โลโก้เว็บ — ตัว W ไล่เฉดทอง (สอดคล้องธีม Black Gold) */
  logo: '/images/logo-webuy-gold-w.svg',
  /** OG / แชร์โซเชียล + LocalBusiness schema — แบนเนอร์แคมเปญ @webuy */
  ogImage: '/images/hero-webuy-campaign.webp',
  language: 'th-TH',
  localeOg: 'th_TH',
  sameAs: {
    facebook: 'https://www.facebook.com/Amphontrading',
    tiktok: 'https://www.tiktok.com/@amphontrading',
  },
  serviceAreaGroups,
  areaServed: [...schemaAreaServed],
  /** เวลาแนะนำติดต่อ — ใช้ใน schema OpeningHoursSpecification (สอดคล้องหน้าติดต่อเรา) */
  businessHours: {
    opens: '10:00',
    closes: '20:00',
  },
} as const;
