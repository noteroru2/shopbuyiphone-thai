const BASE = (process.env.IPHONE_SITE_URL || 'https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com').replace(/\/$/, '');
const EXPECTED_SOURCE = '3ccbb0b886394098cd1e13c1c888cf2abaffa0e7';

const checks = [];
function check(name, ok, detail = '') {
  checks.push({ name, ok: Boolean(ok), detail });
}

async function read(path) {
  const url = `${BASE}${path}`;
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'IPHONE-I5-production-gate/1.0' },
    });
    return { url, status: response.status, ok: response.ok, text: await response.text() };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      text: '',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const fingerprint = await read('/iphone-i5-recovery-gate.json');
let fingerprintJson = null;
try {
  fingerprintJson = JSON.parse(fingerprint.text);
} catch {}
check('fingerprint_http', fingerprint.ok, `${fingerprint.status} ${fingerprint.url}`);
check(
  'fingerprint_source',
  fingerprintJson?.behaviorSourceSha === EXPECTED_SOURCE,
  fingerprintJson?.behaviorSourceSha ?? 'missing',
);

const local = await read('/รับซื้อไอโฟน/อุบลราชธานี/');
check('local_http', local.ok, `${local.status} ${local.url}`);
check('i1_marker', local.text.includes('data-iphone-i1="PAGE_ONE_PUSH"'), 'expected I1 marker on Ubon owner');
check('local_canonical', local.text.includes('rel="canonical"') && local.text.includes('อุบลราชธานี'), 'canonical marker/path');

const blog = await read('/blog/iphone-14-thai-vs-import/');
check('blog_http', blog.ok, `${blog.status} ${blog.url}`);
check(
  'i2_ctr_snippet',
  blog.text.includes('iPhone 14 เครื่องไทย vs เครื่องนอก ตอนขายต่างกันไหม?'),
  'expected I2 meta title text',
);
check(
  'faq_schema_removed',
  !blog.text.includes('"@type":"FAQPage"') && !local.text.includes('"@type":"FAQPage"'),
  'FAQPage must not be emitted',
);

const robots = await read('/robots.txt');
check('robots_http', robots.ok, `${robots.status} ${robots.url}`);
check('robots_allow', /User-agent:\s*\*[\s\S]*Allow:\s*\//i.test(robots.text), 'Allow: /');
check('robots_sitemap', robots.text.includes('sitemap-index.xml'), 'sitemap-index.xml');

const sitemap = await read('/sitemap-index.xml');
check('sitemap_http', sitemap.ok, `${sitemap.status} ${sitemap.url}`);

const passed = checks.every((item) => item.ok);
const result = {
  gate: 'IPHONE_I5_PRODUCTION',
  expectedBehaviorSourceSha: EXPECTED_SOURCE,
  baseUrl: BASE,
  verdict: passed ? 'PASS' : 'NO_GO',
  checkedAt: new Date().toISOString(),
  checks,
};

console.log(JSON.stringify(result, null, 2));
if (!passed) process.exitCode = 1;
