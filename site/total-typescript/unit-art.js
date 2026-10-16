// Chalk sketches for unit headers in total-typescript
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Getting Started & IDE Superpowers
    reset(
      P('M240 50 h120 v80 h-120 z', 'a') +
      Tx(300, 100, 'TS Server', 18, 't', 'middle') +
      P('M360 90 h80', 'a') +
      C(440, 90, 8, 'hop') +
      Tx(470, 95, 'IDE Autocomplete', 14, 't')
    ),
    // Unit 2: Fundamentals & Narrowing
    reset(
      C(280, 90, 45, 'a') +
      C(340, 90, 45, 'a') +
      Tx(260, 95, 'A', 18, 't', 'middle') +
      Tx(310, 95, 'A | B', 14, 't', 'middle') +
      Tx(360, 95, 'B', 18, 't', 'middle') +
      P('M400 90 h60', 'a') +
      Tx(475, 95, 'Narrowing', 15, 't')
    ),
    // Unit 3: Objects, Mutability & Classes
    reset(
      P('M230 60 h100 v60 h-100 z', 'a') +
      Tx(280, 96, 'as const', 16, 't', 'middle') +
      P('M330 90 h40', 'a') +
      P('M370 50 h120 v80 h-120 z', 'a') +
      Tx(430, 85, 'class Album', 15, 't', 'middle') +
      Tx(430, 110, 'readonly props', 12, 't', 'middle')
    ),
    // Unit 4: Deriving Types & The Compiler
    reset(
      P('M240 90 h80', 'a') +
      Tx(280, 75, 'typeof value', 15, 't', 'middle') +
      C(330, 90, 6, 'hop') +
      P('M340 90 h70', 'a') +
      Tx(425, 95, 'ReturnType<T>', 16, 't')
    ),
    // Unit 5: Modules & tsconfig.json
    reset(
      P('M250 50 h110 v80 h-110 z', 'a') +
      Tx(305, 80, 'tsconfig', 15, 't', 'middle') +
      Tx(305, 105, 'strict: true', 12, 't', 'middle') +
      P('M360 90 h50', 'a') +
      Tx(425, 85, 'index.d.ts', 15, 't') +
      Tx(425, 110, 'declare module', 13, 't')
    ),
    // Unit 6: Advanced Type-Level Wizards
    reset(
      Tx(300, 75, 'T extends U ? X : Y', 18, 't', 'middle') +
      P('M200 95 h320', 'a') +
      Tx(360, 125, 'type Mapped<K> = { [P in K]: ... }', 16, 't', 'middle') +
      C(200, 95, 6, 'hop') + C(520, 95, 6, 'hop')
    )
  ];
})();
