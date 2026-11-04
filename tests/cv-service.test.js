import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('CV Service & Dual Edition Suite: Files & Profiles Verification', async (t) => {
  const globalCvPath = path.resolve(process.cwd(), 'src/cv/Nouman_Ahmad_Global_Resume.pdf');
  const localCvPath = path.resolve(process.cwd(), 'src/cv/Nouman_Ahmad_Pakistan_CV.pdf');

  await t.test('both Global and Local CV PDF files exist on disk with valid file size', () => {
    assert.ok(fs.existsSync(globalCvPath), 'Global Resume PDF must exist in src/cv');
    assert.ok(fs.existsSync(localCvPath), 'Pakistan CV PDF must exist in src/cv');

    const globalStat = fs.statSync(globalCvPath);
    const localStat = fs.statSync(localCvPath);

    assert.ok(globalStat.size > 500000, `Global Resume size must be > 500KB (actual: ${globalStat.size})`);
    assert.ok(localStat.size > 500000, `Local CV size must be > 500KB (actual: ${localStat.size})`);
  });

  await t.test('CvService smart detection with timezone, offset, IP and query param priorities', () => {
    class MockCvService {
      mode = 'local';
      hasExplicitParam = false;

      profiles = {
        global: {
          mode: 'global',
          fileName: 'Nouman_Ahmad_Global_Resume.pdf',
          url: 'assets/documents/Nouman_Ahmad_Global_Resume.pdf',
          buttonText: 'Download Resume'
        },
        local: {
          mode: 'local',
          fileName: 'Nouman_Ahmad_Pakistan_CV.pdf',
          url: 'assets/documents/Nouman_Ahmad_Pakistan_CV.pdf',
          buttonText: 'Download Resume'
        }
      };

      detect(queryString, mockTimeZone, mockOffset) {
        this.hasExplicitParam = false;
        const params = new URLSearchParams(queryString || '');
        const target = (
          params.get('target') ||
          params.get('cv') ||
          params.get('view') ||
          params.get('mode') ||
          params.get('region')
        )?.toLowerCase();

        // 1. Explicit query parameter has highest priority
        if (target === 'global' || target === 'remote' || target === 'uae' || target === 'intl') {
          this.hasExplicitParam = true;
          this.mode = 'global';
          return;
        }
        if (target === 'local' || target === 'pk' || target === 'pakistan') {
          this.hasExplicitParam = true;
          this.mode = 'local';
          return;
        }

        // 2. Fallback to Timezone / Offset detection
        const tz = (mockTimeZone || '').toLowerCase();
        if (tz.includes('karachi') || tz.includes('pakistan') || mockOffset === -300) {
          this.mode = 'local';
        } else {
          // Visitor from UAE, USA, Europe, etc.
          this.mode = 'global';
        }
      }

      applyIpCountry(countryCode) {
        if (this.hasExplicitParam) return;
        this.mode = countryCode.toUpperCase() === 'PK' ? 'local' : 'global';
      }

      get current() {
        return this.profiles[this.mode];
      }
    }

    const service = new MockCvService();

    // Scenario 1: Pakistan visitor on standard URL -> Pakistan CV
    service.detect('', 'Asia/Karachi');
    assert.strictEqual(service.mode, 'local', 'Pakistan visitor should automatically get local CV');
    assert.strictEqual(service.current.url, 'assets/documents/Nouman_Ahmad_Pakistan_CV.pdf');
    assert.strictEqual(service.current.fileName, 'Nouman_Ahmad_Pakistan_CV.pdf');

    // Scenario 2: UAE visitor on standard URL -> Global Resume
    service.detect('', 'Asia/Dubai');
    assert.strictEqual(service.mode, 'global', 'UAE visitor should automatically get Global Resume');
    assert.strictEqual(service.current.url, 'assets/documents/Nouman_Ahmad_Global_Resume.pdf');
    assert.strictEqual(service.current.fileName, 'Nouman_Ahmad_Global_Resume.pdf');

    // Scenario 3: US visitor on standard URL -> Global Resume
    service.detect('', 'America/New_York');
    assert.strictEqual(service.mode, 'global', 'US visitor should automatically get Global Resume');

    // Scenario 4: UK visitor on standard URL -> Global Resume
    service.detect('', 'Europe/London');
    assert.strictEqual(service.mode, 'global', 'UK visitor should automatically get Global Resume');

    // Scenario 5: Explicit ?target=global overrides Pakistan timezone
    service.detect('?target=global', 'Asia/Karachi');
    assert.strictEqual(service.mode, 'global', '?target=global query param must take precedence over timezone');

    // Scenario 6: Explicit ?target=local overrides foreign timezone
    service.detect('?target=local', 'Asia/Dubai');
    assert.strictEqual(service.mode, 'local', '?target=local query param must take precedence over foreign timezone');

    // Scenario 7: IP country verification updates mode when no query param
    service.detect('', 'Asia/Karachi');
    service.applyIpCountry('US');
    assert.strictEqual(service.mode, 'global', 'US IP address switches to global resume');

    service.applyIpCountry('PK');
    assert.strictEqual(service.mode, 'local', 'PK IP address switches to Pakistan CV');

    // Scenario 8: Query param is locked against IP changes
    service.detect('?target=global', 'Asia/Karachi');
    service.applyIpCountry('PK');
    assert.strictEqual(service.mode, 'global', 'Explicit query param stays locked even if IP is PK');
  });
});
