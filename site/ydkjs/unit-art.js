// Chalk sketches for unit headers in ydkjs (Scope & Closures)
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Lexical Scope & Scope Chain
    reset(
      P('M240 60 h260 v80 h-260 z', 'a') +
      P('M270 85 h200 v40 h-200 z', 'a') +
      Tx(370, 78, 'Outer Lexical Scope', 14, 't', 'middle') +
      Tx(370, 110, 'Inner { let x; }', 13, 't', 'middle')
    ),
    // Unit 2: Lifecycle, Hoisting & Global Scope
    reset(
      P('M260 120 L260 65 L252 75 M260 65 L268 75', 'a') +
      Tx(380, 75, 'HOISTING: function foo()', 15, 't', 'middle') +
      Tx(380, 105, 'TDZ: [ Temporal Dead Zone ]', 14, 't', 'middle') +
      C(260, 120, 6, 'hop')
    ),
    // Unit 3: Closures, Modules & Practice
    reset(
      P('M240 90 C 270 50, 470 50, 500 90 C 470 130, 270 130, 240 90 Z', 'a') +
      C(370, 90, 20, 'hop') +
      Tx(370, 95, 'Closure()', 14, 't', 'middle')
    )
  ];
})();
