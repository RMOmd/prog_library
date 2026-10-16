// Chalk sketches for unit headers in clean-code
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Simplicity & 80/20
    reset(
      P('M240 130 L360 40 L480 130 Z', 'a') +
      Tx(360, 105, '80 / 20', 24, 't', 'middle') +
      P('M240 130 h240', 'a') +
      C(360, 40, 6, 'hop')
    ),
    // Unit 2: Clean code & No premature optimization
    reset(
      P('M250 85 h280', 'a') +
      Tx(390, 70, 'Simple > Complex', 20, 't', 'middle') +
      C(290, 85, 12, 'a') + C(490, 85, 12, 'a')
    ),
    // Unit 3: Unix philosophy & Focus
    reset(
      P('M260 50 h90 v80 h-90 z', 'a') +
      P('M390 50 h90 v80 h-90 z', 'a') +
      P('M350 90 h40', 'a') +
      Tx(305, 95, 'Do One Thing', 14, 't', 'middle') +
      Tx(435, 95, 'Do It Well', 14, 't', 'middle')
    )
  ];
})();
