// Chalk sketches for unit headers in typescript-quickly (Yakov Fain & Anton Moiseev)
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Language Basics, OOP & Generics
    reset(
      P('M180 65 h100 v50 h-100 z', 'a') +
      Tx(230, 95, 'Types & OOP', 15, 't', 'middle') +
      P('M280 90 h50', 'a') +
      C(360, 90, 30, 'a') +
      Tx(360, 95, '<T>', 16, 't', 'middle') +
      P('M390 90 h50', 'a') +
      Tx(480, 95, 'Guards & Enums', 15, 't')
    ),
    // Unit 2: Advanced Types, Decorators & Tooling
    reset(
      Tx(220, 80, '@Component({ ... })', 15, 't') +
      P('M210 95 h180', 'a') +
      P('M420 65 h100 v50 h-100 z', 'a') +
      Tx(470, 95, 'Webpack', 15, 't', 'middle') +
      Tx(470, 130, 'Babel & .d.ts', 12, 't', 'middle')
    ),
    // Unit 3: Blockchain Architecture & P2P WebSockets
    reset(
      P('M180 65 h90 v50 h-90 z', 'a') +
      Tx(225, 95, 'Block #1', 14, 't', 'middle') +
      P('M270 90 h40', 'a') +
      P('M310 65 h90 v50 h-90 z', 'a') +
      Tx(355, 95, 'Block #2', 14, 't', 'middle') +
      P('M400 90 h40', 'a') +
      C(470, 90, 28, 'a') +
      Tx(470, 95, 'P2P', 14, 't', 'middle')
    ),
    // Unit 4: Frameworks Trifecta: Angular, React, Vue
    reset(
      C(230, 90, 32, 'a') +
      Tx(230, 95, 'Angular', 13, 't', 'middle') +
      C(350, 90, 32, 'a') +
      Tx(350, 95, 'React', 13, 't', 'middle') +
      C(470, 90, 32, 'a') +
      Tx(470, 95, 'Vue.js', 13, 't', 'middle')
    )
  ];
})();
