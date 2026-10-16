// Chalk sketches for unit headers in effective-typescript (Dan Vanderkam)
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Philosophy & Type System as Sets
    reset(
      C(280, 90, 50, 'a') +
      C(340, 90, 50, 'a') +
      Tx(255, 95, 'Types', 18, 't', 'middle') +
      Tx(310, 95, '&cap;', 22, 't', 'middle') +
      Tx(365, 95, 'Sets', 18, 't', 'middle') +
      P('M400 90 h70', 'a') +
      Tx(485, 95, 'Subtypes', 15, 't')
    ),
    // Unit 2: Type Inference & Valid State Design
    reset(
      P('M230 60 h110 v60 h-110 z', 'a') +
      Tx(285, 95, 'Valid State', 15, 't', 'middle') +
      P('M340 90 h50', 'a') +
      P('M390 60 h120 v60 h-120 z', 'a') +
      Tx(450, 95, 'No Invalid', 15, 't', 'middle') +
      C(365, 90, 6, 'hop')
    ),
    // Unit 3: Safe Any, Declarations & Runtime
    reset(
      P('M240 90 h70', 'a') +
      Tx(275, 75, 'unknown', 16, 't', 'middle') +
      C(320, 90, 6, 'hop') +
      P('M330 90 h70', 'a') +
      Tx(365, 115, 'Narrowed', 15, 't', 'middle') +
      Tx(440, 95, '@types .d.ts', 16, 't')
    ),
    // Unit 4: Migration Graph Bottom-Up
    reset(
      C(260, 120, 16, 'a') +
      C(340, 120, 16, 'a') +
      C(300, 60, 18, 'a') +
      P('M265 105 L295 75', 'a') +
      P('M335 105 L305 75', 'a') +
      Tx(300, 65, 'Root', 12, 't', 'middle') +
      Tx(260, 125, 'Leaf', 11, 't', 'middle') +
      Tx(340, 125, 'Leaf', 11, 't', 'middle') +
      Tx(440, 95, 'Dependency Graph', 15, 't')
    )
  ];
})();
