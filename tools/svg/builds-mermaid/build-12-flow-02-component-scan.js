// 12-flow-02: Spring Boot が探すクラスと、探さないクラス
const { node, arr, out } = require('./_wrap-12');
const nm = '12-flow-02-component-scan';

const A = node({ x: 250, y: 20, w: 400, color: 'green', bold1: true, lines: ['jp.co.copel.training', 'TrainingApplication がある場所'] });
const B = node({ x: 20, y: 140, w: 280, color: 'green', lines: ['@RestController や @Service', 'などの印が付いたクラス', '自動で見つけてもらえる'] });
const E = node({ x: 330, y: 140, w: 280, h: B.h, color: 'gray', lines: ['dto のクラスなど、印のない', 'ふつうのクラス', '探されない。必要な場所で', 'new して使う'], h: 112 });
const C = node({ x: 640, y: 140, w: 240, color: 'gray', lines: ['jp.co.copel.training の', '外にあるパッケージ'] });
const D = node({ x: 640, y: 262, w: 240, h: 46, color: 'red', lines: ['見つけてもらえない'] });

const body = A.s + B.s + E.s + C.s + D.s +
  arr({ x1: 330, y1: A.b + 2, x2: B.cx, y2: B.y - 5, color: 'green' }) +
  arr({ x1: 450, y1: A.b + 2, x2: E.cx, y2: E.y - 5, color: 'green' }) +
  arr({ x1: 570, y1: A.b + 2, x2: C.cx, y2: C.y - 5, color: 'green', dashed: true }) +
  arr({ x1: C.cx, y1: C.b + 2, x2: D.cx, y2: D.y - 5, color: 'gray', dashed: true });

out(nm, D.b,
  'Spring Boot が見つけてくれるクラスと、見つけてくれないクラス',
  'TrainingApplication がある jp.co.copel.training から、@RestController や @Service などの印が付いたクラスは自動で見つけてもらえる。dto のクラスなど、印のないふつうのクラスは探されないので、必要な場所で new して使う。jp.co.copel.training の外にあるパッケージのクラスは、見つけてもらえない。',
  body,
  ['jp.co.copel.training', 'TrainingApplication がある場所', '@RestController や @Service などの印が付いたクラス', '自動で見つけてもらえる', 'dto のクラスなど、印のないふつうのクラス', '探されない。必要な場所で new して使う', 'jp.co.copel.training の外にあるパッケージ', '見つけてもらえない']);
