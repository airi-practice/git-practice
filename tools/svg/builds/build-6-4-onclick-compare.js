// 6-4-onclick-compare: onClick に handleShow と handleShow() を書いた場合の違いを並べて比べる図
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const Y = 20, H = 380;

// 1つ分の列。ok=true は正しい書き方（緑）、false は書いてはいけない書き方（赤）
const column = ({ x, ok, title, sub, code, run, renderDesc, clickDesc, conclusion }) => {
  const col = ok ? 'green' : 'red', c = C[col], cx = x + 210;
  const step = (y, n, label, resultLines, resultOn) => {
    const rc = resultOn ? c : C.gray;
    return `
  <rect x="${x + 14}" y="${y}" width="170" height="52" rx="12" fill="${C.blue.light}" stroke="${C.blue.main}" stroke-width="2"/>
  ${L.badge({ cx: x + 34, cy: y + 26, n, color: 'blue' })}
  ${t(x + 112, y + 31, label, { fill: C.blue.dark, bold: true, anchor: 'middle' })}
  ${L.arrow({ x1: x + 188, y1: y + 26, x2: x + 222, y2: y + 26, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="${x + 226}" y="${y}" width="180" height="52" rx="12" fill="${resultOn ? c.light : '#ffffff'}" stroke="${rc.main}" stroke-width="2"/></g>
${resultLines.map(([s, mono], k) => '  ' + t(x + 316, y + 22 + k * 20, s, { size: mono ? SIZE.body : SIZE.note, mono, bold: mono, fill: resultOn ? c.dark : SUB })).join('\n')}`;
  };
  return `
${L.card({ x, y: Y, w: 420, h: H, color: col, title })}
  ${t(cx, Y + 74, sub[0])}
  ${t(cx, Y + 96, sub[1])}
  <g filter="url(#shadow)"><rect x="${x + 40}" y="${Y + 108}" width="340" height="52" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2.5"/></g>
  ${t(cx, Y + 143, code, { size: SIZE.title, bold: true, mono: true, fill: c.dark })}
${step(Y + 180, '1', '画面を描くとき', renderDesc.lines, renderDesc.on)}
${step(Y + 248, '2', 'ボタンを押したとき', clickDesc.lines, clickDesc.on)}
  <g filter="url(#shadow)"><rect x="${x + 14}" y="${Y + 318}" width="392" height="46" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2.5"/></g>
  ${L.icon({ name: ok ? 'check-circle' : 'x', x: x + 28, y: Y + 329, size: 24, color: c.main })}
  ${t(cx + 14, Y + 347, conclusion, { bold: true, fill: c.dark })}`;
};

const body = column({
  x: 20, ok: true, title: '正しい書き方',
  sub: ['関数そのものを渡す。', '「押されたら、この関数を実行して」'],
  code: 'onClick={handleShow}',
  renderDesc: { on: false, lines: [['handleShow', true], ['は実行されない', false]] },
  clickDesc: { on: true, lines: [['handleShow', true], ['が実行される', false]] },
  conclusion: '押されたときだけ実行される',
}) + column({
  x: 460, ok: false, title: '書いてはいけない書き方',
  sub: ['関数をその場で実行する書き方。', '( ) が付いているかどうかの違い'],
  code: 'onClick={handleShow()}',
  renderDesc: { on: true, lines: [['handleShow()', true], ['がその場で実行される', false]] },
  clickDesc: { on: false, lines: [['押される前に、', false], ['もう実行されている', false]] },
  conclusion: '画面を描くたびに実行されてしまう',
});

const y0 = Y + H + 16;
L.write('6-4-onclick-compare', L.svg({
  y0,
  title: 'onClick に handleShow と書いた場合は押されたときだけ実行され、handleShow() と書いた場合は画面を描くときに実行されてしまうことを並べて比べた図',
  desc: '左は onClick={handleShow}。画面を描くときに handleShow は実行されず（1）、ボタンを押したときに実行される（2）ので、押されたときだけ実行される。右は onClick={handleShow()}。画面を描くときに handleShow() がその場で実行され（1）、ボタンを押す前にもう実行されているので、画面を描くたびに実行されてしまう。かっこ ( ) が付いているかどうかの違い。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['かっこ () が付くかどうかで、動くタイミングが', '変わるんだ。押したときだけ動くのは、', 'どっちの書き方か、見比べてみよう。'] }),
}));
