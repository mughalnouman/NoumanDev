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

  await t.test('Mock CvService query param detection edge cases', () => {
    class MockCvService {
      mode = 'local';

      profiles = {
        global: {
          mode: 'global',
          url: 'assets/documents/Nouman_Ahmad_Global_Resume.pdf',
          buttonText: 'Download Resume'
        },
        local: {
          mode: 'local',
          url: 'assets/documents/Nouman_Ahmad_Pakistan_CV.pdf',
          buttonText: 'Download Resume'
        }
      };

      detect(queryString) {
        const params = new URLSearchParams(queryString);
        const target = (
          params.get('target') ||
          params.get('cv') ||
          params.get('view') ||
          params.get('mode') ||
          params.get('region')
        )?.toLowerCase();

        if (target === 'global' || target === 'remote' || target === 'uae') {
          this.mode = 'global';
        } else if (target === 'local' || target === 'pk' || target === 'pakistan') {
          this.mode = 'local';
        }
      }

      get current() {
        return this.profiles[this.mode];
      }
    }

    const service = new MockCvService();
    assert.strictEqual(service.mode, 'local', 'Default should be local');

    // Scenario 1: ?target=global
    service.detect('?target=global');
    assert.strictEqual(service.mode, 'global');
    assert.strictEqual(service.current.url, 'assets/documents/Nouman_Ahmad_Global_Resume.pdf');

    // Scenario 2: ?cv=global
    service.mode = 'local';
    service.detect('?cv=global');
    assert.strictEqual(service.mode, 'global');

    // Scenario 3: ?target=uae (relocation target)
    service.mode = 'local';
    service.detect('?target=uae');
    assert.strictEqual(service.mode, 'global');

    // Scenario 4: ?target=local
    service.detect('?target=local');
    assert.strictEqual(service.mode, 'local');
    assert.strictEqual(service.current.url, 'assets/documents/Nouman_Ahmad_Pakistan_CV.pdf');

    // Scenario 5: Multiple query params (?source=linkedin&target=global&utm_campaign=hiring)
    service.detect('?source=linkedin&target=global&utm_campaign=hiring');
    assert.strictEqual(service.mode, 'global');

    // Scenario 6: Case insensitivity (?target=GLOBAL)
    service.mode = 'local';
    service.detect('?target=GLOBAL');
    assert.strictEqual(service.mode, 'global');
  });
});

