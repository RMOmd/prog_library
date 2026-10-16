// Chalk sketches for unit headers in professional-typescript (Boris Cherny)
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: AST & Type Checker Pipeline
    reset(
      P('M180 65 h90 v50 h-90 z', 'a') +
      Tx(225, 95, 'AST', 16, 't', 'middle') +
      P('M270 90 h40', 'a') +
      P('M310 60 h130 v60 h-130 z', 'a') +
      Tx(375, 95, 'Type Checker', 15, 't', 'middle') +
      P('M440 90 h40', 'a') +
      P('M480 65 h90 v50 h-90 z', 'a') +
      Tx(525, 95, 'JS Output', 15, 't', 'middle')
    ),
    // Unit 2: Functions, Generics & Object-Oriented Design
    reset(
      Tx(230, 95, 'fn<T>(val: T): T', 18, 't') +
      C(440, 90, 38, 'a') +
      Tx(440, 95, 'Class', 14, 't', 'middle') +
      P('M402 90 h-30', 'a') +
      P('M478 90 h30', 'a') +
      Tx(520, 95, 'implements', 14, 't')
    ),
    // Unit 3: Advanced Types, Variance & Option Monad
    reset(
      Tx(210, 75, 'A <: B (Covariant)', 16, 't') +
      P('M210 90 h160', 'a') +
      C(420, 90, 32, 'a') +
      Tx(420, 95, 'Some(T)', 13, 't', 'middle') +
      Tx(465, 95, '|', 18, 't') +
      C(510, 90, 32, 'a') +
      Tx(510, 95, 'None', 13, 't', 'middle')
    ),
    // Unit 4: Architecture, Workers & Ecosystem
    reset(
      P('M200 65 h100 v50 h-100 z', 'a') +
      Tx(250, 95, 'Main UI', 15, 't', 'middle') +
      P('M300 90 h60', 'a') +
      Tx(330, 80, 'postMsg', 12, 't', 'middle') +
      P('M360 65 h110 v50 h-110 z', 'a') +
      Tx(415, 95, 'Worker <T>', 15, 't', 'middle') +
      P('M470 90 h40', 'a') +
      Tx(520, 95, '.d.ts', 18, 't')
    )
  ];
})();
