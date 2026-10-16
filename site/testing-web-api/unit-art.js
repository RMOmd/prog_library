// Chalk sketches for unit headers in testing-web-api (Mark Winteringham)
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Foundation, HTTP & Risk Modeling
    reset(
      P('M180 65 h90 v50 h-90 z', 'a') +
      Tx(225, 95, 'Client', 14, 't', 'middle') +
      P('M270 90 h60', 'a') +
      Tx(300, 80, 'HTTP', 12, 't', 'middle') +
      P('M330 65 h100 v50 h-100 z', 'a') +
      Tx(380, 95, 'REST API', 14, 't', 'middle') +
      P('M430 90 h50', 'a') +
      C(505, 90, 25, 'a') +
      Tx(505, 95, 'Risk', 13, 't', 'middle')
    ),
    // Unit 2: OpenAPI Design, Exploratory & Automation
    reset(
      P('M200 60 h100 v60 h-100 z', 'a') +
      Tx(250, 85, 'OpenAPI', 13, 't', 'middle') +
      Tx(250, 105, 'Swagger', 12, 't', 'middle') +
      P('M300 90 h50', 'a') +
      Tx(380, 80, 'assert status === 200', 14, 't') +
      P('M380 95 h160', 'a') +
      C(550, 90, 6, 'hop')
    ),
    // Unit 3: Contracts (Pact), Performance (k6) & Security
    reset(
      C(230, 90, 32, 'a') +
      Tx(230, 95, 'Pact', 14, 't', 'middle') +
      P('M262 90 h40', 'a') +
      P('M305 115 Q345 60 385 115', 'a') +
      Tx(345, 80, 'k6 Load', 12, 't', 'middle') +
      P('M385 90 h40', 'a') +
      P('M430 70 h60 v30 l-30 20 l-30 -20 z', 'a') +
      Tx(460, 92, 'OWASP', 11, 't', 'middle')
    )
  ];
})();
