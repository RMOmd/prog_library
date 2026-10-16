// Chalk sketches for unit headers in razrabotka-na-javascript (Adam Scott, O'Reilly)
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Backend API (Express, Apollo Server, GraphQL, MongoDB)
    reset(
      P('M240 50 h120 v70 h-120 z', 'a') +
      Tx(300, 92, 'GraphQL API', 16, 't', 'middle') +
      P('M360 85 h70', 'a') +
      C(430, 85, 6, 'hop') +
      P('M450 50 h110 v70 h-110 z', 'a') +
      Tx(505, 92, 'MongoDB', 16, 't', 'middle')
    ),
    // Unit 2: Operations, Auth & Deploy
    reset(
      P('M240 85 h90', 'a') +
      Tx(285, 65, 'JWT Auth', 16, 't', 'middle') +
      C(340, 85, 8, 'hop') +
      P('M350 85 h100', 'a') +
      Tx(400, 115, 'CRUD Ops', 15, 't', 'middle') +
      P('M460 85 h70', 'a') +
      Tx(500, 70, 'Deploy', 16, 't', 'middle')
    ),
    // Unit 3: Web Client (React, Apollo Client, Styled Components)
    reset(
      C(280, 85, 35, 'a') +
      Tx(280, 92, 'React', 16, 't', 'middle') +
      P('M325 85 h70', 'a') +
      P('M405 50 h130 v70 h-130 z', 'a') +
      Tx(470, 85, 'Apollo Client', 15, 't', 'middle') +
      Tx(470, 105, 'useQuery/useMutation', 11, 't', 'middle')
    ),
    // Unit 4: Desktop Apps with Electron
    reset(
      P('M240 45 h150 v80 h-150 z', 'a') +
      P('M240 65 h150', 'a') +
      C(255, 55, 4, 'a') + C(270, 55, 4, 'a') + C(285, 55, 4, 'a') +
      Tx(315, 100, 'Electron App', 15, 't', 'middle') +
      P('M400 85 h60', 'a') +
      Tx(485, 90, 'Main + Renderer', 14, 't')
    ),
    // Unit 5: Mobile Apps with React Native
    reset(
      P('M260 40 h100 v95 h-100 z', 'a') +
      C(310, 125, 4, 'a') +
      Tx(310, 80, 'React Native', 13, 't', 'middle') +
      P('M370 85 h60', 'a') +
      Tx(465, 80, 'Expo CLI', 16, 't') +
      Tx(465, 105, 'iOS & Android', 13, 't')
    )
  ];
})();
