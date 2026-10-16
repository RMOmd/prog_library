// Chalk sketches for unit headers in cpp-dummies
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 22, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unit 1: First steps & cout
    reset(
      P('M240 90h260', 'a') +
      Tx(250, 75, 'std::cout << "Hello"', 20, 't') +
      Tx(440, 115, 'return 0;', 20, 't') +
      C(520, 90, 8, 'hop')
    ),
    // Unit 2: Pointers & Functions
    reset(
      P('M240 50h120v80h-120z', 'a') +
      P('M400 50h120v80h-120z', 'a') +
      P('M360 90h40', 'a') +
      Tx(300, 95, '&var', 18, 't', 'middle') +
      Tx(460, 95, '*ptr', 18, 't', 'middle')
    ),
    // Unit 3: Classes & OOP
    reset(
      P('M250 120L360 40L470 120z', 'a') +
      Tx(360, 100, 'class Object', 20, 't', 'middle') +
      C(360, 40, 6, 'a')
    ),
    // Unit 4: Inheritance
    reset(
      P('M360 50v40', 'a') +
      P('M300 90h120', 'a') +
      P('M300 90v40', 'a') + P('M420 90v40', 'a') +
      Tx(360, 40, 'Base', 18, 't', 'middle') +
      Tx(300, 150, 'DerivedA', 16, 't', 'middle') +
      Tx(420, 150, 'DerivedB', 16, 't', 'middle')
    ),
    // Unit 5: Operators & I/O
    reset(
      P('M250 85h280', 'a') +
      Tx(390, 75, 'operator+=(T&)', 20, 't', 'middle')
    )
  ];
})();
