import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute } from '../src/app/routes.mjs';
import { procedures } from '../src/data/procedures.mjs';
import { navigation, site } from '../src/data/site.mjs';
import { procedureVisuals, consultationSelection } from '../src/data/procedureVisuals.mjs';
import { clinicalNotes } from '../src/data/clinicalNotes.mjs';
import { procedureGuides } from '../src/data/procedureGuides.mjs';
import { doctors } from '../src/data/doctors.mjs';
import { subProcedures } from '../src/data/subProcedures.mjs';
import { existsSync } from 'node:fs';
import { fromSitePath, toSiteUrl } from '../src/app/paths.mjs';

test('GitHub Pages paths keep the repository prefix', () => {
  const base = '/yunseul-plastic-surgery/';
  assert.equal(toSiteUrl('/procedures/eye?mode=compare#options', base), `${base}procedures/eye?mode=compare#options`);
  assert.equal(toSiteUrl('/assets/images/logo/ysps-logo-monochrome.png', base), `${base}assets/images/logo/ysps-logo-monochrome.png`);
  assert.equal(toSiteUrl('#overview', base), '#overview');
  assert.equal(toSiteUrl('https://example.com', base), 'https://example.com');
  assert.equal(fromSitePath(`${base}procedures/eye`, base), '/procedures/eye');
  assert.equal(fromSitePath(base, base), '/');
});

test('every procedure has an existing portrait', () => {
  for (const {slug} of procedures) {
    assert.ok(existsSync(new URL('../public/assets/images/' + procedureVisuals[slug].image, import.meta.url)));
  }
});

test('every procedure detail exposes decision-support information', () => {
  const requiredFields = ['anesthesia', 'recoveryPeriod', 'precautions', 'limitations', 'aftercare'];
  for (const {slug} of procedures) {
    assert.ok(clinicalNotes[slug]);
    for (const field of requiredFields) assert.ok(clinicalNotes[slug][field].length > 0);
  }
});

test('every procedure has distinct guide content and a local image', () => {
  const images = new Set();
  for (const {slug} of procedures) {
    const guide = procedureGuides[slug];
    assert.ok(guide);
    assert.equal(guide.items.length, 3);
    assert.equal(guide.flow.length, 3);
    assert.ok(guide.items.every(item => item.name && item.check && item.approach));
    assert.ok(existsSync(new URL('../public' + guide.image, import.meta.url)));
    assert.ok(!images.has(guide.image));
    images.add(guide.image);
  }
});

test('unverified contact and clinician details are not published', () => {
  assert.equal(site.phone, null);
  assert.equal(site.address, null);
  assert.deepEqual(site.hours, []);
  assert.deepEqual(doctors, []);
});

test('consultation preserves valid categories and ignores unknown input', () => {
  for (const {slug} of procedures) assert.equal(consultationSelection(slug), slug);
  for (const value of ['missing', '', null, undefined, '__proto__']) assert.equal(consultationSelection(value), '');
});

test('every header menu resolves to its own page without a hash', () => {
  const expected = ['about', 'procedures', 'doctors', 'cases', 'reviews', 'consultation'];
  assert.deepEqual(navigation.map(item => resolveRoute(item.href, procedures).page), expected);
  assert.ok(navigation.every(item => item.href.startsWith('/') && !item.href.includes('#')));
});

test('home and consultation have independent routes', () => {
  assert.equal(resolveRoute('/', procedures).page, 'home');
  assert.equal(resolveRoute('/consultation', procedures).page, 'consultation');
});

test('all procedure URLs resolve to the correct detail', () => {
  for (const procedure of procedures) {
    const route = resolveRoute('/procedures/' + procedure.slug, procedures);
    assert.equal(route.page, 'procedureDetail');
    assert.equal(route.slug, procedure.slug);
    assert.equal(route.title, procedure.name);
  }
});

test('every sub-procedure URL resolves to its own page with complete content', () => {
  const slugs = new Set();
  for (const procedure of procedures) {
    const items = subProcedures[procedure.slug];
    assert.equal(items.length, 3, procedure.slug);
    for (const item of items) {
      const route = resolveRoute(`/procedures/${procedure.slug}/${item.slug}`, procedures);
      assert.equal(route.page, 'subProcedure');
      assert.equal(route.slug, procedure.slug);
      assert.equal(route.sub, item.slug);
      assert.equal(item.problems.length, 3);
      assert.ok(item.method.length >= 3 && item.targets.length >= 3 && item.faq.length >= 1);
      assert.ok(!slugs.has(`${procedure.slug}/${item.slug}`));
      slugs.add(`${procedure.slug}/${item.slug}`);
    }
  }
  assert.equal(slugs.size, 12);
});

test('sub-procedure content does not publish unverified figures', () => {
  // 수술 시간·기간·가격 같은 수치는 확인 전까지 게시하지 않는다
  const text = JSON.stringify(subProcedures);
  assert.doesNotMatch(text, /\d+\s*(분|시간|일|주|개월|년|원|만원|%)/);
});

test('trailing slashes are accepted', () => {
  assert.equal(resolveRoute('/about/', procedures).page, 'about');
  assert.equal(resolveRoute('/procedures/eye/', procedures).slug, 'eye');
});

test('unknown URLs do not silently show home or the first procedure', () => {
  for (const path of ['/missing', '/procedures/missing', '/procedures/eye/extra']) {
    assert.equal(resolveRoute(path, procedures).page, 'notFound');
  }
});
