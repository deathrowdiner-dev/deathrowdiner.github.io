import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMealReceipt, createRecordNumber, normalizeName } from '../assets/js/core.js';

test('createRecordNumber returns DRD plus four digits', () => {
  const record = createRecordNumber(() => 0.1234);
  assert.match(record, /^DRD-\d{4}$/);
  assert.equal(record, 'DRD-2110');
});

test('normalizeName trims and falls back to VISITOR', () => {
  assert.equal(normalizeName('  Austin  '), 'Austin');
  assert.equal(normalizeName('   '), 'VISITOR');
});

test('buildMealReceipt produces a shareable concept request without claiming a menu', () => {
  const receipt = buildMealReceipt({
    record: 'DRD-2106',
    entree: 'Smashburger',
    side: 'Fries',
    dessert: 'Pie',
    drink: 'Cola',
  });
  assert.match(receipt, /FINAL MEAL REQUEST/);
  assert.match(receipt, /DRD-2106/);
  assert.match(receipt, /Smashburger/);
  assert.match(receipt, /CONCEPT REQUEST — NOT AN ACTIVE MENU/);
});
