// Chalk sketches for unit headers in python-patterns
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: Domain Model, Repository, UoW
    reset(
      P('M240 60 h120 v70 h-120 z', 'a') +
      P('M400 60 h120 v70 h-120 z', 'a') +
      P('M360 95 h40', 'a') +
      Tx(300, 102, 'Domain', 18, 't', 'middle') +
      Tx(460, 102, 'Repo', 18, 't', 'middle') +
      C(380, 95, 4, 'hop')
    ),
    // Unit 2: Event-Driven & Message Bus & CQRS
    reset(
      P('M250 95 h260', 'a') +
      Tx(380, 75, 'MessageBus.handle(Event)', 18, 't', 'middle') +
      Tx(380, 125, 'Command -> Handler -> Event', 15, 't', 'middle') +
      C(250, 95, 6, 'hop') + C(510, 95, 6, 'hop')
    )
  ];
})();
