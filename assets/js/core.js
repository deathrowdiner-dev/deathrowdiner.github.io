export function createRecordNumber(random = Math.random) {
  const value = Math.floor(random() * 9000) + 1000;
  return `DRD-${String(value).padStart(4, '0')}`;
}

export function normalizeName(value) {
  const clean = String(value ?? '').trim();
  return clean || 'VISITOR';
}

export function buildMealReceipt({ record, entree, side, dessert, drink }) {
  const lines = [
    'DEATH ROW DINER',
    'FINAL MEAL REQUEST',
    `RECORD: ${record || 'DRD-0000'}`,
    '--------------------------------',
    `ENTRÉE: ${entree || 'WITHHELD'}`,
    `SIDE: ${side || 'WITHHELD'}`,
    `DESSERT: ${dessert || 'WITHHELD'}`,
    `DRINK: ${drink || 'WITHHELD'}`,
    '--------------------------------',
    'CONCEPT REQUEST — NOT AN ACTIVE MENU',
    'ENJOY YOUR TIME SERVED.',
  ];
  return lines.join('\n');
}
