import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

const expectedFiles = [
  'index.html',
  'thanks.html',
  'privacy.html',
  '404.html',
  'robots.txt',
  'assets/css/styles.css',
  'assets/js/app.js',
];

test('required site files exist', () => {
  for (const file of expectedFiles) {
    assert.equal(existsSync(join(root, file)), true, `${file} should exist`);
  }
});

test('homepage is intentionally hidden from search and uses separated assets', () => {
  const html = read('index.html');
  assert.match(html, /name="robots"\s+content="noindex,nofollow,noarchive"/i);
  assert.match(html, /assets\/css\/styles\.css/);
  assert.match(html, /assets\/js\/app\.js/);
  assert.doesNotMatch(html, /<style[\s>]/i);
});

test('homepage exposes the immersive sections and accessible mobile navigation', () => {
  const html = read('index.html');
  for (const id of ['case-file', 'evidence', 'status', 'final-meal', 'intake']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /aria-controls="primary-nav"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /class="skip-link"/);
});

test('intake fields use real labels instead of placeholder-only accessibility', () => {
  const html = read('index.html');
  for (const id of ['intake-name', 'intake-email', 'intake-location', 'intake-message', 'intake-final-meal']) {
    assert.match(html, new RegExp(`<label[^>]+for="${id}"`, 'i'));
    assert.match(html, new RegExp(`id="${id}"`, 'i'));
  }
  assert.match(html, /type="email"[^>]+required/i);
});

test('confirmation page has a record-number target and remains noindex', () => {
  const html = read('thanks.html');
  assert.match(html, /id="record-number"/);
  assert.match(html, /name="robots"\s+content="noindex,nofollow,noarchive"/i);
});

test('support pages remain noindex and crawler access is disabled', () => {
  for (const page of ['privacy.html', '404.html']) {
    assert.match(read(page), /name="robots"\s+content="noindex,nofollow,noarchive"/i);
  }
  const robots = read('robots.txt');
  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Disallow:\s*\//i);
});

test('stylesheet includes reduced-motion and focus-visible support', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
});
