import test from 'node:test';
import assert from 'node:assert/strict';
import { projects, skills, experience } from '../src/app/portfolio.data.ts';

test('Portfolio Data Suite: Projects Verification', async (t) => {
  await t.test('all projects have required schema fields', () => {
    assert.ok(Array.isArray(projects) && projects.length >= 4, 'Projects must have at least 4 items');
    for (const p of projects) {
      assert.ok(typeof p.slug === 'string' && p.slug.length > 0, `Project ${p.slug} must have slug`);
      assert.ok(typeof p.title === 'string' && p.title.length > 0, `Project ${p.slug} must have title`);
      assert.ok(typeof p.type === 'string' && p.type.length > 0, `Project ${p.slug} must have type`);
      assert.ok(typeof p.description === 'string' && p.description.length > 0, `Project ${p.slug} must have description`);
      assert.ok(typeof p.image === 'string' && p.image.length > 0, `Project ${p.slug} must have image`);
      assert.ok(Array.isArray(p.gallery) && p.gallery.length > 0, `Project ${p.slug} gallery must not be empty`);
      assert.ok(Array.isArray(p.tags) && p.tags.length > 0, `Project ${p.slug} tags must not be empty`);
      assert.ok(typeof p.overview === 'string' && p.overview.length > 0, `Project ${p.slug} overview must not be empty`);
      assert.ok(Array.isArray(p.features) && p.features.length > 0, `Project ${p.slug} features must not be empty`);
    }
  });

  await t.test('project slugs must be URL-safe kebab-case', () => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    for (const p of projects) {
      assert.match(p.slug, slugRegex, `Slug ${p.slug} is not valid kebab-case`);
    }
  });

  await t.test('EAS Inventory has strictly 2 images in gallery as requested', () => {
    const eas = projects.find(p => p.slug === 'eas-inventory');
    assert.ok(eas, 'EAS Inventory project must exist');
    assert.strictEqual(eas.gallery.length, 2, 'EAS Inventory gallery must contain strictly 2 images');
    assert.deepStrictEqual(eas.gallery, [
      'assets/images/easinventory/easinventory.JPG',
      'assets/images/easinventory/login.png'
    ]);
  });

  await t.test('EAS Sync has exactly 5 images in gallery', () => {
    const sync = projects.find(p => p.slug === 'eas-sync');
    assert.ok(sync, 'EAS Sync project must exist');
    assert.strictEqual(sync.gallery.length, 5, 'EAS Sync must have 5 screenshots');
    assert.ok(sync.tags.includes('SignalR'), 'EAS Sync tags must include SignalR');
    assert.ok(sync.tags.includes('ASP.NET Core Web API'), 'EAS Sync tags must include ASP.NET Core Web API');
  });

  await t.test('MaxOutCRM has multi-tenant metrics and Stripe integration', () => {
    const crm = projects.find(p => p.slug === 'maxout-crm');
    assert.ok(crm, 'MaxOutCRM must exist');
    assert.ok(crm.tags.includes('Stripe API'), 'MaxOutCRM tags must include Stripe API');
    assert.ok(crm.overview.includes('100+ active tenants'), 'MaxOutCRM must mention 100+ active tenants');
    assert.ok(crm.overview.includes('1,000+ users'), 'MaxOutCRM must mention 1,000+ users');
    assert.ok(crm.overview.includes('8s → 3s'), 'MaxOutCRM must mention 8s → 3s query optimization');
  });

  await t.test('All image paths start with assets/images and have valid extensions', () => {
    const validExtensions = ['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.svg', '.webp'];
    for (const p of projects) {
      assert.ok(p.image.startsWith('assets/images/'), `Image path ${p.image} must start with assets/images/`);
      for (const img of p.gallery) {
        assert.ok(img.startsWith('assets/images/'), `Gallery path ${img} must start with assets/images/`);
        const hasValidExt = validExtensions.some(ext => img.endsWith(ext));
        assert.ok(hasValidExt, `Image ${img} does not have a supported image extension`);
      }
    }
  });

  await t.test('Live URLs are secure HTTPS URLs when defined', () => {
    for (const p of projects) {
      if (p.live) {
        assert.ok(p.live.startsWith('https://'), `Live URL ${p.live} must use HTTPS`);
      }
    }
  });
});

test('Portfolio Data Suite: Experience & Skills Verification', async (t) => {
  await t.test('experience timeline includes all 4 career positions', () => {
    assert.strictEqual(experience.length, 4, 'There must be exactly 4 experience entries');
    
    // 1. Karma Software Solutions
    assert.strictEqual(experience[0].company, 'Karma Software Solutions');
    assert.strictEqual(experience[0].role, 'Full Stack Developer');
    assert.ok(experience[0].dates.includes('Present'));
    assert.ok(experience[0].points.some(p => p.includes('100+ tenants') && p.includes('1,000+ users')));
    assert.ok(experience[0].points.some(p => p.includes('8 seconds to 3 seconds')));

    // 2. Expert Accounting Software
    assert.strictEqual(experience[1].company, 'Expert Accounting Software');
    assert.strictEqual(experience[1].role, 'Angular Developer (Full Stack Contributions)');
    assert.strictEqual(experience[1].dates, 'Apr 2024 - Jun 2025');
    assert.ok(experience[1].summary.includes('EAS Inventory Management and EAS Sync App'));

    // 3. Aurum Memorabilia
    assert.ok(experience[2].company.includes('Aurum Memorabilia'));
    assert.ok(experience[2].points.some(p => p.includes('5-member cross-border Agile team')));

    // 4. Cloudy365
    assert.strictEqual(experience[3].company, 'Cloudy365 Pvt Ltd');
    assert.strictEqual(experience[3].role, 'Full Stack Web Developer (Intern)');
    assert.ok(experience[3].points.some(p => p.includes('ESESOL ERP')));
  });

  await t.test('skills list contains no duplicates and no empty values', () => {
    assert.ok(Array.isArray(skills) && skills.length >= 10);
    const set = new Set();
    for (const s of skills) {
      assert.ok(typeof s === 'string' && s.trim().length > 0, 'Skill must not be empty string');
      assert.ok(!set.has(s.toLowerCase()), `Duplicate skill found: ${s}`);
      set.add(s.toLowerCase());
    }
  });
});
