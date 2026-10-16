// Chalk sketches for unit headers in javascript-definitive-guide
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Core JavaScript & Objects
    reset(
      P('M240 85 h260', 'a') +
      Tx(370, 70, 'const fn = (x) => ({ ...x })', 18, 't', 'middle') +
      C(240, 85, 8, 'hop') + C(500, 85, 8, 'hop')
    ),
    // Unit 2: Standard Library, Iterators & Async
    reset(
      P('M240 60 h110 v70 h-110 z', 'a') +
      P('M390 60 h110 v70 h-110 z', 'a') +
      P('M350 95 h40', 'a') +
      Tx(295, 102, 'Promise', 16, 't', 'middle') +
      Tx(445, 102, 'await', 16, 't', 'middle')
    ),
    // Unit 3: Browser DOM & Node.js
    reset(
      P('M250 120 L370 45 L490 120 Z', 'a') +
      Tx(370, 100, 'DOM / Web / Node', 18, 't', 'middle') +
      C(370, 45, 6, 'hop')
    )
  ];
})();
