import { buildMealReceipt, createRecordNumber, normalizeName } from './core.js';

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

function initNavigation() {
  const toggle = qs('.nav-toggle');
  const nav = qs('#primary-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('nav-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  qsa('a', nav).forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initEvidence() {
  qsa('[data-evidence-card]').forEach((card) => {
    const button = qs('[data-evidence-toggle]', card);
    const secret = qs('[data-evidence-secret]', card);
    if (!button || !secret) return;

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      secret.hidden = open;
      card.classList.toggle('is-unsealed', !open);
      button.textContent = open ? 'Unseal exhibit' : 'Reseal exhibit';
    });
  });
}

function initMealBuilder() {
  const form = qs('#meal-form');
  const shareButton = qs('#share-meal');
  if (!form || !shareButton) return;

  let shareText = '';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const record = createRecordNumber();
    const meal = {
      record,
      entree: values.get('entree'),
      side: values.get('side'),
      dessert: values.get('dessert'),
      drink: values.get('drink'),
    };
    shareText = buildMealReceipt(meal);

    qs('#meal-record').textContent = record;
    const output = qs('#meal-output');
    output.innerHTML = `
      <div><dt>Entrée</dt><dd>${escapeHtml(meal.entree)}</dd></div>
      <div><dt>Side</dt><dd>${escapeHtml(meal.side)}</dd></div>
      <div><dt>Dessert</dt><dd>${escapeHtml(meal.dessert)}</dd></div>
      <div><dt>Drink</dt><dd>${escapeHtml(meal.drink)}</dd></div>`;
    shareButton.disabled = false;
    qs('#meal-receipt')?.classList.add('is-issued');
  });

  shareButton.addEventListener('click', async () => {
    if (!shareText) return;
    const status = qs('#share-status');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Death Row Diner — Final Meal Request', text: shareText });
        status.textContent = 'Final meal request shared.';
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
        status.textContent = 'Final meal request copied to clipboard.';
        shareButton.textContent = 'Copied to Clipboard';
        window.setTimeout(() => { shareButton.textContent = 'Share / Copy Request'; }, 1800);
        return;
      }
      status.textContent = 'Sharing is unavailable in this browser.';
    } catch (error) {
      if (error?.name !== 'AbortError') status.textContent = 'The request could not be shared.';
    }
  });
}

function initIntake() {
  const form = qs('#intake-form');
  if (!form) return;

  form.addEventListener('submit', () => {
    if (!form.checkValidity()) return;
    const name = normalizeName(qs('#intake-name', form)?.value);
    const record = createRecordNumber();
    try {
      sessionStorage.setItem('drdRecord', record);
      sessionStorage.setItem('drdName', name);
    } catch {
      // Browser storage can be disabled. Form submission should still continue.
    }
  });
}

function initConfirmation() {
  if (document.body.dataset.page !== 'thanks') return;
  const recordTarget = qs('#record-number');
  const nameTarget = qs('#record-name');
  if (!recordTarget || !nameTarget) return;

  try {
    recordTarget.textContent = sessionStorage.getItem('drdRecord') || 'DRD-FILED';
    nameTarget.textContent = sessionStorage.getItem('drdName') || 'Visitor';
  } catch {
    recordTarget.textContent = 'DRD-FILED';
    nameTarget.textContent = 'Visitor';
  }
}

function initAmbience() {
  const button = qs('#ambience-toggle');
  if (!button) return;

  let context;
  let oscillator;
  let gain;

  const stop = () => {
    if (oscillator) {
      try { oscillator.stop(); } catch { /* already stopped */ }
    }
    oscillator = undefined;
    gain = undefined;
    if (context) context.close().catch(() => {});
    context = undefined;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = 'Ambience: Off';
  };

  button.addEventListener('click', async () => {
    const active = button.getAttribute('aria-pressed') === 'true';
    if (active) {
      stop();
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      button.textContent = 'Ambience: Unsupported';
      button.disabled = true;
      return;
    }

    try {
      context = new AudioContext();
      oscillator = context.createOscillator();
      gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 58;
      gain.gain.value = 0.012;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      button.setAttribute('aria-pressed', 'true');
      button.textContent = 'Ambience: On';
    } catch {
      stop();
      button.textContent = 'Ambience: Unavailable';
    }
  });

  window.addEventListener('pagehide', stop, { once: true });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]));
}

initNavigation();
initEvidence();
initMealBuilder();
initIntake();
initConfirmation();
initAmbience();
