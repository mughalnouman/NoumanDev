import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/app/portfolio.data.ts';

test('Component Logic Suite: App Component & Navigation States', async (t) => {
  // Simulate AppComponent logic
  class MockAppComponent {
    menuOpen = false;
    showBackToTop = false;
    isPreloaderVisible = true;
    loadingProgress = 0;

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
      this.menuOpen = false;
    }

    onEscape() {
      this.closeMenu();
    }

    onWindowScroll(scrollY) {
      this.showBackToTop = scrollY > 300;
    }

    skipPreloader() {
      this.loadingProgress = 100;
      this.isPreloaderVisible = false;
    }

    formatRouteName(url) {
      if (!url || url === '/') return 'Home Interface';
      const clean = url.replace('/', '').split('?')[0];
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    }
  }

  await t.test('menuOpen toggles correctly and closeMenu resets to false', () => {
    const app = new MockAppComponent();
    assert.strictEqual(app.menuOpen, false, 'Initial menu state should be closed');

    app.toggleMenu();
    assert.strictEqual(app.menuOpen, true, 'First toggle should open menu');

    app.toggleMenu();
    assert.strictEqual(app.menuOpen, false, 'Second toggle should close menu');

    app.menuOpen = true;
    app.closeMenu();
    assert.strictEqual(app.menuOpen, false, 'closeMenu should force menu to false');
  });

  await t.test('ESC key triggers onEscape which closes the menu', () => {
    const app = new MockAppComponent();
    app.menuOpen = true;
    app.onEscape();
    assert.strictEqual(app.menuOpen, false, 'Escape key must close open menu');
  });

  await t.test('Scroll threshold boundary tests for Back to Top button', () => {
    const app = new MockAppComponent();

    // Edge case: Exactly at top (0px)
    app.onWindowScroll(0);
    assert.strictEqual(app.showBackToTop, false, 'At scrollY=0, button must be hidden');

    // Edge case: 299px (just below 300px threshold)
    app.onWindowScroll(299);
    assert.strictEqual(app.showBackToTop, false, 'At scrollY=299, button must be hidden');

    // Edge case: Exactly at 300px
    app.onWindowScroll(300);
    assert.strictEqual(app.showBackToTop, false, 'At scrollY=300, button must be hidden');

    // Edge case: 301px (crossing threshold)
    app.onWindowScroll(301);
    assert.strictEqual(app.showBackToTop, true, 'At scrollY=301, button must be visible');

    // Edge case: Deep scroll (e.g. 4500px)
    app.onWindowScroll(4500);
    assert.strictEqual(app.showBackToTop, true, 'At scrollY=4500, button must remain visible');
  });

  await t.test('Preloader skip sets progress to 100% and dismisses', () => {
    const app = new MockAppComponent();
    app.loadingProgress = 42;
    app.isPreloaderVisible = true;

    app.skipPreloader();
    assert.strictEqual(app.loadingProgress, 100);
    assert.strictEqual(app.isPreloaderVisible, false);
  });

  await t.test('Route name formatting handles edge cases (root, query params, empty)', () => {
    const app = new MockAppComponent();
    assert.strictEqual(app.formatRouteName('/'), 'Home Interface');
    assert.strictEqual(app.formatRouteName(''), 'Home Interface');
    assert.strictEqual(app.formatRouteName(null), 'Home Interface');
    assert.strictEqual(app.formatRouteName('/about'), 'About');
    assert.strictEqual(app.formatRouteName('/projects?tab=enterprise'), 'Projects');
  });
});

test('Component Logic Suite: Portfolio Page & Lightbox Edge Cases', async (t) => {
  class MockPortfolioPage {
    project = projects.find(p => p.slug === 'eas-inventory');
    selectedImage = null;
    lightboxIndex = 0;
    activeScreenIndex = 0;

    openLightbox(index) {
      if (this.project && this.project.gallery && this.project.gallery.length > 0) {
        this.lightboxIndex = Math.max(0, Math.min(index, this.project.gallery.length - 1));
        this.selectedImage = this.project.gallery[this.lightboxIndex];
      }
    }

    closeLightbox() {
      this.selectedImage = null;
    }

    lightboxNext() {
      if (!this.project || !this.project.gallery.length) return;
      this.lightboxIndex = (this.lightboxIndex + 1) % this.project.gallery.length;
      this.selectedImage = this.project.gallery[this.lightboxIndex];
    }

    lightboxPrev() {
      if (!this.project || !this.project.gallery.length) return;
      this.lightboxIndex = (this.lightboxIndex - 1 + this.project.gallery.length) % this.project.gallery.length;
      this.selectedImage = this.project.gallery[this.lightboxIndex];
    }

    selectScreen(index) {
      if (this.project && this.project.gallery) {
        this.activeScreenIndex = Math.max(0, Math.min(index, this.project.gallery.length - 1));
      }
    }

    validateContactForm(name, email, message) {
      if (!name || !name.trim()) return false;
      if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return false;
      if (!message || !message.trim()) return false;
      return true;
    }

    getDirectLinks(name, email, message) {
      const subject = encodeURIComponent(`Engineering Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject Scope:\n${message}`);
      return {
        gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=mughalnouman678@gmail.com&su=${subject}&body=${body}`,
        whatsapp: `https://wa.me/923214940440?text=${encodeURIComponent(`Hi Nouman, I am ${name} (${email}). Inquiry:\n${message}`)}`
      };
    }
  }

  await t.test('Lightbox index modulo wrap-around for Next and Previous', () => {
    const page = new MockPortfolioPage();
    // EAS Inventory has 2 images: [0, 1]
    assert.strictEqual(page.project.gallery.length, 2);

    page.openLightbox(0);
    assert.strictEqual(page.lightboxIndex, 0);
    assert.strictEqual(page.selectedImage, page.project.gallery[0]);

    // Next -> index 1
    page.lightboxNext();
    assert.strictEqual(page.lightboxIndex, 1);
    assert.strictEqual(page.selectedImage, page.project.gallery[1]);

    // Next at end -> wraps around to 0
    page.lightboxNext();
    assert.strictEqual(page.lightboxIndex, 0);
    assert.strictEqual(page.selectedImage, page.project.gallery[0]);

    // Prev at 0 -> wraps around to 1 (last index)
    page.lightboxPrev();
    assert.strictEqual(page.lightboxIndex, 1);
    assert.strictEqual(page.selectedImage, page.project.gallery[1]);

    // Close lightbox
    page.closeLightbox();
    assert.strictEqual(page.selectedImage, null);
  });

  await t.test('Lightbox bounds clamping for out-of-range indexes', () => {
    const page = new MockPortfolioPage();
    // Attempt opening negative index
    page.openLightbox(-5);
    assert.strictEqual(page.lightboxIndex, 0);

    // Attempt opening index beyond array length
    page.openLightbox(999);
    assert.strictEqual(page.lightboxIndex, page.project.gallery.length - 1);
  });

  await t.test('Contact form validation scenario tests', () => {
    const page = new MockPortfolioPage();

    // Scenario: All valid fields
    assert.strictEqual(page.validateContactForm('John Doe', 'john@example.com', 'Interested in CRM project'), true);

    // Rare case: Empty name
    assert.strictEqual(page.validateContactForm('', 'john@example.com', 'Inquiry'), false);

    // Rare case: Whitespace-only name
    assert.strictEqual(page.validateContactForm('   ', 'john@example.com', 'Inquiry'), false);

    // Rare case: Invalid email format
    assert.strictEqual(page.validateContactForm('John', 'not-an-email', 'Inquiry'), false);
    assert.strictEqual(page.validateContactForm('John', 'john@', 'Inquiry'), false);
    assert.strictEqual(page.validateContactForm('John', '@example.com', 'Inquiry'), false);

    // Rare case: Empty message
    assert.strictEqual(page.validateContactForm('John', 'john@example.com', ''), false);
    assert.strictEqual(page.validateContactForm('John', 'john@example.com', '   \n  '), false);
  });

  await t.test('Direct communication URLs correctly encode special characters and unicode', () => {
    const page = new MockPortfolioPage();
    const links = page.getDirectLinks('Jane Doe & Co.', 'jane@corp.org', 'Need ASP.NET Core API with 100% test coverage & 3s latency!');
    
    assert.ok(links.gmail.includes('mughalnouman678%40gmail.com') || links.gmail.includes('mughalnouman678@gmail.com'));
    assert.ok(links.gmail.includes('Jane%20Doe%20%26%20Co.'));
    assert.ok(links.whatsapp.includes('wa.me/923214940440'));
    assert.ok(links.whatsapp.includes('100%25%20test%20coverage'));
  });
});

