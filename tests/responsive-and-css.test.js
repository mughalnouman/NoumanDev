import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const appCssPath = path.resolve(process.cwd(), 'src/app/app.component.css');
const appHtmlPath = path.resolve(process.cwd(), 'src/app/app.component.html');
const cssContent = fs.readFileSync(appCssPath, 'utf8');
const htmlContent = fs.readFileSync(appHtmlPath, 'utf8');

test('Responsive & Navbar Architecture: Fixed Persistent Header', async (t) => {
  await t.test('navbar is configured with position: fixed so it never disappears on scroll', () => {
    // Assert .navbar has position: fixed
    const navbarMatch = cssContent.match(/\.navbar\s*\{([^}]+)\}/);
    assert.ok(navbarMatch, '.navbar rule must exist in app.component.css');
    const rules = navbarMatch[1];
    assert.ok(rules.includes('position: fixed'), '.navbar must be position: fixed to prevent hiding at the bottom of the page');
    assert.ok(rules.includes('top: 14px') || rules.includes('top: 8px'), '.navbar must specify top offset');
    assert.ok(rules.includes('z-index: 1000') || rules.includes('z-index: 999'), '.navbar must have high z-index (>= 999)');
    assert.ok(rules.includes('backdrop-filter: blur'), '.navbar must have glassmorphic backdrop-filter');
  });

  await t.test('navbar spacer exists to preserve document flow and prevent overlap', () => {
    assert.ok(htmlContent.includes('class="navbar-spacer"'), 'HTML must include .navbar-spacer element');
    const spacerMatch = cssContent.match(/\.navbar-spacer\s*\{([^}]+)\}/);
    assert.ok(spacerMatch, '.navbar-spacer CSS rule must exist');
    assert.ok(spacerMatch[1].includes('height: 92px'), '.navbar-spacer must have desktop height of 92px');
  });

  await t.test('mobile nav backdrop exists for click-outside dismissal', () => {
    assert.ok(htmlContent.includes('class="mobile-nav-backdrop"'), 'HTML must include mobile backdrop');
    assert.ok(cssContent.includes('.mobile-nav-backdrop'), 'CSS must style .mobile-nav-backdrop');
    assert.ok(cssContent.includes('position: fixed'), 'Backdrop must be position: fixed');
    assert.ok(cssContent.includes('inset: 0'), 'Backdrop must cover viewport (inset: 0)');
  });
});

test('Responsive & Mobile Navigation: Menu Drawer & Breakpoints', async (t) => {
  await t.test('responsive breakpoint for mobile navigation (<= 860px)', () => {
    assert.ok(cssContent.includes('@media (max-width: 860px)'), 'Media query for max-width: 860px must exist');
    
    // Check that inside the mobile media query, .navbar nav is hidden and .menu is displayed
    const mobileBlockMatch = cssContent.match(/@media\s*\(max-width:\s*860px\)\s*\{([\s\S]+?)\n\}/);
    assert.ok(mobileBlockMatch, 'Mobile media block must be present');
    const mobileCss = mobileBlockMatch[1];

    assert.ok(mobileCss.includes('.navbar nav {\n    display: none;'), 'Navbar horizontal nav must be hidden on mobile');
    assert.ok(mobileCss.includes('.navbar nav.open {'), 'Navbar nav.open must be styled for mobile drawer');
    assert.ok(mobileCss.includes('position: absolute'), 'Navbar nav.open must be positioned as a dropdown');
    assert.ok(mobileCss.includes('.menu {'), 'Hamburger .menu button must be enabled on mobile');
    assert.ok(mobileCss.includes('.talk {\n    display: none;'), 'Let\'s talk button must be hidden on compact viewports to avoid cramping');
  });

  await t.test('accessible aria attributes present on mobile hamburger button', () => {
    assert.ok(htmlContent.includes('[attr.aria-expanded]="menuOpen"'), 'Hamburger button must have [attr.aria-expanded]');
    assert.ok(htmlContent.includes('(click)="toggleMenu()"'), 'Hamburger button must trigger toggleMenu()');
  });
});

test('Responsive Images & Visual Assets: Universal Fluidity', async (t) => {
  await t.test('global image responsiveness rule with max-width: 100% and height: auto', () => {
    const imgRuleMatch = cssContent.match(/img,\s*svg,\s*video,\s*canvas\s*\{([^}]+)\}/);
    assert.ok(imgRuleMatch, 'Global media element rule must exist');
    const rules = imgRuleMatch[1];
    assert.ok(rules.includes('max-width: 100%'), 'Images must have max-width: 100% to prevent horizontal blowouts');
    assert.ok(rules.includes('height: auto'), 'Images must have height: auto to maintain natural aspect ratios');
  });

  await t.test('project cards and mockups use responsive aspect-ratio and object-fit', () => {
    assert.ok(cssContent.includes('.mockup-viewport'), '.mockup-viewport must exist');
    assert.ok(cssContent.includes('aspect-ratio: 16 / 9.5') || cssContent.includes('aspect-ratio: 16 / 10'), 'Mockup must define responsive aspect ratio');
    assert.ok(cssContent.includes('.mockup-img'), '.mockup-img must exist');
    assert.ok(cssContent.includes('object-fit: cover'), 'Mockup image must use object-fit: cover');
  });

  await t.test('lightbox image is constrained to viewport on all screens', () => {
    const lightboxImgMatch = cssContent.match(/\.lightbox-body img\s*\{([^}]+)\}/);
    assert.ok(lightboxImgMatch, '.lightbox-body img rule must exist');
    const rules = lightboxImgMatch[1];
    assert.ok(rules.includes('max-width: 90vw') || rules.includes('max-width: 95vw'), 'Lightbox img must not exceed viewport width');
    assert.ok(rules.includes('max-height: 82vh') || rules.includes('max-height: 80vh'), 'Lightbox img must not exceed viewport height');
    assert.ok(rules.includes('object-fit: contain'), 'Lightbox img must use object-fit: contain');
  });
});
