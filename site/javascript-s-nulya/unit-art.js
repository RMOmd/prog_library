// Chalk sketches for unit headers in javascript-s-nulya
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Basics (Variables, Functions, Loops)
    reset(
      P('M240 85 h260', 'a') +
      Tx(370, 70, 'let message = "Hello, world!";', 16, 't', 'middle') +
      C(240, 85, 7, 'hop') + C(500, 85, 7, 'hop')
    ),
    // Unit 2: OOP & Data Types (Objects, Arrays, Classes)
    reset(
      P('M250 60 h100 v70 h-100 z', 'a') +
      P('M390 60 h100 v70 h-100 z', 'a') +
      P('M350 95 h40', 'a') +
      Tx(300, 100, '{ obj }', 16, 't', 'middle') +
      Tx(440, 100, 'class', 16, 't', 'middle')
    ),
    // Unit 3: DOM & Browser Manipulation
    reset(
      P('M240 60 h260 v70 h-260 z', 'a') +
      Tx(370, 85, 'document.querySelector("#btn")', 14, 't', 'middle') +
      Tx(370, 115, 'element.textContent = ...', 13, 't', 'middle')
    ),
    // Unit 4: Events & Interactive UI
    reset(
      P('M250 120 L370 50 L490 120 Z', 'a') +
      Tx(370, 105, 'addEventListener("click")', 15, 't', 'middle') +
      C(370, 50, 7, 'hop')
    )
  ];
})();
