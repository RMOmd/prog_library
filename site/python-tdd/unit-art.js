// Chalk sketches for unit headers in python-tdd
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: TDD cycle
    reset(
      P('M240 90 A50 50 0 1 0 340 90 A50 50 0 1 0 240 90', 'a') +
      Tx(290, 75, 'RED', 18, 't', 'middle') +
      Tx(290, 115, 'GREEN', 18, 't', 'middle') +
      P('M390 90h150', 'a') +
      Tx(440, 75, 'assert "Django"', 18, 't') +
      C(550, 90, 12, 'hop')
    ),
    // Unit 2: Web & Deployment
    reset(
      P('M250 50h280v90h-280z', 'a') +
      P('M250 75h280', 'a') +
      C(270, 62, 5, 'a') + C(290, 62, 5, 'a') + C(310, 62, 5, 'a') +
      Tx(340, 67, 'staging.superlists.com', 15, 't') +
      Tx(280, 115, 'Fabric · CI · Gunicorn', 20, 't')
    ),
    // Unit 3: Mocks & Page Objects
    reset(
      P('M260 120L360 50L460 120z', 'a') +
      Tx(360, 105, 'MOCK', 20, 't', 'middle') +
      P('M480 80h90v40h-90z', 'a') +
      Tx(525, 105, 'API', 18, 't', 'middle')
    )
  ];
})();
