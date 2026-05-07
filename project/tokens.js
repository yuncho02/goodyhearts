// ─────────────────────────────────────────────────────────────────
// Design System Tokens — single source of truth
// Edit values here; they apply to the whole site automatically.
// ─────────────────────────────────────────────────────────────────

var TOKENS = {

  // ── Fonts ─────────────────────────────────────────────────────
  fonts: {
    display: '"Wonder", "Inter", sans-serif',
    body:    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // ── Type scale ────────────────────────────────────────────────
  // Each level: fontSize, fontWeight, lineHeight, letterSpacing
  // fontSize uses clamp(mobile, fluid, desktop) for responsiveness
  typeScale: {
    h1: { fontSize: '3.75rem',   fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.04em', fontFamily: 'display' },
    h2: { fontSize: 'clamp(2rem,   5vw, 4rem)',   fontWeight: 400, lineHeight: 1.0,  letterSpacing: '-0.03em', fontFamily: 'display' },
    h3: { fontSize: 'clamp(1.5rem, 4vw, 3rem)',   fontWeight: 400, lineHeight: 1.1,  letterSpacing: '-0.02em', fontFamily: 'display' },
    h4: { fontSize: 'clamp(1.25rem,3vw, 2rem)',   fontWeight: 400, lineHeight: 1.2,  letterSpacing: '-0.02em', fontFamily: 'display' },
    h5: { fontSize: 'clamp(1rem,   2vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3,  letterSpacing: '-0.01em', fontFamily: 'display' },
    h6: { fontSize: '1rem',                        fontWeight: 400, lineHeight: 1.4,  letterSpacing: '0',       fontFamily: 'display' },
    body: { fontSize: '1rem',    fontWeight: 400, lineHeight: 1.55, letterSpacing: '-0.01em', fontFamily: 'body' },
  },

  // ── Named weights ─────────────────────────────────────────────
  weights: {
    regular: 400,
    medium:  500,
    bold:    800,
  },

  // ── Colors ────────────────────────────────────────────────────
  colors: {
    bg:         '#FCFCFC',
    surface:    '#FFFFFF',
    ink:        '#101010',
    ink2:       '#333333',
    ink3:       '#666666',
    ink4:       '#9C9C9C',
    ink5:       '#B0B0B0',
    hairline:   '#EBEBEB',
    coral:      '#F85C5E',
    coralDeep:  '#C6494B',
    coralTint:  '#FFF2F2',
    forest:     '#3F6135',
    forestDeep: '#285D42',
    mint:       '#DCE4D9',
    cream:      '#FFF2E0',
    black:      '#000000',
  },

  // ── Spacing ───────────────────────────────────────────────────
  spacing: {
    pagePx:       '50px',
    pagePxMobile: '30px',
    radiusPill:   '84px',
  },

  // ── Shadows ───────────────────────────────────────────────────
  shadows: {
    sticker: '0 12px 28px -8px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.06)',
    card:    '0 1px 0 rgba(0,0,0,.04), 0 8px 24px -16px rgba(0,0,0,.18)',
  },
};

// Apply all tokens — CSS custom properties + type-scale rules
(function () {
  var r  = document.documentElement;
  var c  = TOKENS.colors;
  var f  = TOKENS.fonts;
  var w  = TOKENS.weights;
  var sp = TOKENS.spacing;
  var sh = TOKENS.shadows;
  var ts = TOKENS.typeScale;

  // Fonts
  r.style.setProperty('--font-display', f.display);
  r.style.setProperty('--font-body',    f.body);

  // Font weights
  r.style.setProperty('--weight-regular', w.regular);
  r.style.setProperty('--weight-medium',  w.medium);
  r.style.setProperty('--weight-bold',    w.bold);

  // Colors
  r.style.setProperty('--bg',          c.bg);
  r.style.setProperty('--surface',     c.surface);
  r.style.setProperty('--ink',         c.ink);
  r.style.setProperty('--ink-2',       c.ink2);
  r.style.setProperty('--ink-3',       c.ink3);
  r.style.setProperty('--ink-4',       c.ink4);
  r.style.setProperty('--ink-5',       c.ink5);
  r.style.setProperty('--hairline',    c.hairline);
  r.style.setProperty('--coral',       c.coral);
  r.style.setProperty('--coral-d',     c.coralDeep);
  r.style.setProperty('--coral-tint',  c.coralTint);
  r.style.setProperty('--forest',      c.forest);
  r.style.setProperty('--forest-d',    c.forestDeep);
  r.style.setProperty('--mint',        c.mint);
  r.style.setProperty('--cream',       c.cream);
  r.style.setProperty('--black',       c.black);

  // Spacing
  r.style.setProperty('--page-px',     sp.pagePx);
  r.style.setProperty('--radius-pill', sp.radiusPill);

  // Shadows
  r.style.setProperty('--shadow-sticker', sh.sticker);
  r.style.setProperty('--shadow-card',    sh.card);

  // Type scale — inject a <style> block so h1–h6 and body pick up
  // the tokens directly without needing inline style overrides
  var fontFor = function (key) { return key === 'display' ? f.display : f.body; };
  var css = ['h1','h2','h3','h4','h5','h6'].map(function (tag) {
    var t = ts[tag];
    return (
      tag + ' {' +
      'font-family:' + fontFor(t.fontFamily) + ';' +
      'font-size:'   + t.fontSize   + ';' +
      'font-weight:' + t.fontWeight + ';' +
      'line-height:' + t.lineHeight + ';' +
      'letter-spacing:' + t.letterSpacing + ';' +
      'margin:0;' +
      '}'
    );
  }).join('');

  var b = ts.body;
  css += (
    'body{' +
    'font-family:' + fontFor(b.fontFamily) + ';' +
    'font-size:'   + b.fontSize   + ';' +
    'font-weight:' + b.fontWeight + ';' +
    'line-height:' + b.lineHeight + ';' +
    'letter-spacing:' + b.letterSpacing + ';' +
    '}'
  );

  var style = document.createElement('style');
  style.id = 'design-tokens-type';
  style.textContent = css;
  document.head.appendChild(style);
})();
