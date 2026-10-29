import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

const API_BASE = 'http://localhost:3001';

function postRequest(path, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      `${API_BASE}${path}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          ...headers
        }
      },
      (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(body);
          } catch {
            parsed = body;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      }
    );

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${API_BASE}${path}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
  });
}

test('Backend Security Suite: HTTP Headers & Input Validation', async (t) => {
  await t.test('Security headers are present on all responses', async () => {
    const res = await getRequest('/');
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.strictEqual(res.headers['x-frame-options'], 'SAMEORIGIN');
    assert.strictEqual(res.headers['referrer-policy'], 'strict-origin-when-cross-origin');
  });

  await t.test('Input validation rejects empty or missing message with HTTP 400', async () => {
    // 1. Missing message field
    const res1 = await postRequest('/api/portfolio-assistant', {});
    assert.strictEqual(res1.status, 400);
    assert.ok(res1.body.error);

    // 2. Empty string message
    const res2 = await postRequest('/api/portfolio-assistant', { message: '' });
    assert.strictEqual(res2.status, 400);

    // 3. Whitespace-only message
    const res3 = await postRequest('/api/portfolio-assistant', { message: '   \n\t  ' });
    assert.strictEqual(res3.status, 400);
  });

  await t.test('Input validation rejects message exceeding 700 characters with HTTP 400', async () => {
    const longMessage = 'A'.repeat(701);
    const res = await postRequest('/api/portfolio-assistant', { message: longMessage });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.error, 'Please enter a question of up to 700 characters.');
  });

  await t.test('Message boundary of exactly 700 characters is accepted', async () => {
    // 700 character message
    const trimmed = 'What technologies does Nouman Ahmad use? '.padEnd(700, '.');
    assert.strictEqual(trimmed.length, 700);

    const res = await postRequest('/api/portfolio-assistant', { message: trimmed });
    assert.notStrictEqual(res.status, 400, '700 char message should not fail validation');
  });

  await t.test('Knowledge grounding returns accurate facts from Nouman Ahmad CV', async () => {
    const res = await postRequest('/api/portfolio-assistant', {
      message: 'What was Nouman Ahmad role and company from April 2024 to June 2025?'
    });
    
    if (res.status === 200) {
      assert.ok(res.body.reply, 'Should contain reply');
      const text = res.body.reply.toLowerCase();
      assert.ok(text.includes('expert accounting software') || text.includes('eas'), 'Must mention EAS');
      assert.ok(text.includes('angular') || text.includes('inventory') || text.includes('sync'), 'Must mention EAS product/tech');
    }
  });
});
