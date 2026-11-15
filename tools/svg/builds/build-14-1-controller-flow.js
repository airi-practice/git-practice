// 14-1-controller-flow: Controller の3つの動き。14-1-service-flow も、ここの steps() を使う（見た目をそろえるため）
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const CW = 262, CG = 26, CX = 31;
// 3つの動きのカード。s = { title, code:[[行, 太字?]], desc:[行], result:[行], resultMono }
const step = (i, y, h, s) => {
  const x = CX + i * (CW + CG);
  const codeH = s.code.length * 18 + 12;
  let o = L.card({ x, y, w: CW, h, color: 'green', title: '' });
  o += `\n  <circle cx="${x + 26}" cy="${y + 23}" r="12" fill="#ffffff"/>\n  ${t(x + 26, y + 28, String(i + 1), { size: SIZE.note, bold: true, fill: C.green.dark })}`;
  o += '\n  ' + t(x + CW / 2 + 12, y + 31, s.title, { size: SIZE.head, bold: true, fill: '#ffffff' });
  o += `\n  <rect x="${x + 10}" y="${y + 56}" width="${CW - 20}" height="${codeH}" rx="8" fill="${C.gray.light}" stroke="${L.LINE}" stroke-width="1.2"/>`;
  s.code.forEach(([c, b], k) => { o += '\n  ' + t(x + CW / 2, y + 56 + 19 + k * 18, c, { size: SIZE.note, mono: true, bold: b, fill: b ? C.green.dark : TEXT }); });
  const dy = y + 56 + codeH + 26;
  s.desc.forEach((d, k) => { o += '\n  ' + t(x + CW / 2, dy + k * 22, d); });
  const ry = y + h - 12 - (s.result.length * 20 + 8);
  o += `\n  <rect x="${x + 10}" y="${ry}" width="${CW - 20}" height="${s.result.length * 20 + 8}" rx="8" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="1.5"/>`;
  s.result.forEach((r, k) => { o += '\n  ' + t(x + CW / 2, ry + 19 + k * 20, r, { fill: C.green.dark, mono: s.resultMono }); });
  if (i < 2) o += '\n  ' + L.arrow({ x1: x + CW + 3, y1: y + h / 2, x2: x + CW + CG - 3, y2: y + h / 2, color: 'green', width: 5 });
  return o;
};
const frame = (label, cardsTop, cardsBottom) => `
  <rect x="20" y="96" width="860" height="${cardsBottom + 12 - 96}" rx="16" fill="${C.green.light}" fill-opacity="0.45" stroke="${C.green.main}" stroke-width="2" stroke-dasharray="8,5"/>
  ${t(860, 124, label, { size: SIZE.head, bold: true, anchor: 'end', mono: true, fill: C.green.dark })}`;
module.exports = { step, frame, CX, CW, CG };
if (require.main === module) {
  const y = 138, h = 258;
  const steps = [
    { title: '受け付ける', code: [['@RestController'], ['@RequestMapping("/api/reverse")'], ['@PostMapping', true]],
      desc: ['POST /api/reverse が来たら、', 'reverse メソッドを呼ぶ'], result: ['URL と POST の対応づけ'] },
    { title: '本文を受け取る', code: [['reverse(@RequestBody', true], ['ReverseRequest request)', true]],
      desc: ['本文の JSON を、', 'ReverseRequest の', 'オブジェクトにして渡してくれる'], result: ['text が "hello" の', 'オブジェクト'], resultMono: false },
    { title: 'Service に任せる', code: [['reverseService.reverse('], ['request.getText())']],
      desc: ['処理は ReverseService に任せ、', '返ってきた', 'ReverseResponse を返す'], result: ['戻り値を、Spring が', 'JSON にする'] },
  ];
  const body = `
  <g filter="url(#shadow)"><rect x="31" y="14" width="290" height="64" rx="12" fill="#ffffff" stroke="${C.blue.main}" stroke-width="2"/></g>
  ${t(176, 38, '届くリクエスト：POST /api/reverse', { fill: C.blue.dark })}
  ${t(176, 64, '{"text":"hello"}', { size: SIZE.head, bold: true, mono: true, fill: C.blue.dark })}
${frame('controller/ReverseController.java', y, y + h)}
  ${L.arrow({ x1: 162, y1: 80, x2: 162, y2: 132, color: 'blue' })}
${steps.map((s, i) => step(i, y, h, s)).join('\n')}
  ${L.arrow({ x1: 734, y1: y + h + 2, x2: 734, y2: y + h + 44, color: 'green' })}
  <g filter="url(#shadow)"><rect x="464" y="${y + h + 48}" width="400" height="66" rx="12" fill="#ffffff" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(664, y + h + 72, '返るレスポンスの本文（JSON）', { fill: C.green.dark })}
  ${t(664, y + h + 98, '{"original":"hello","reversed":"olleh"}', { size: SIZE.head, bold: true, mono: true, fill: C.green.dark })}`;
  const y0 = y + h + 114 + 16;
  L.write('14-1-controller-flow', L.svg({
    y0,
    title: 'ReverseController が POST を受け付け、本文を ReverseRequest として受け取り、ReverseService に任せて、ReverseResponse を返す3つの動きを、コードの行と一緒に示した図',
    desc: '届くリクエスト POST /api/reverse の本文 {"text":"hello"} を、ReverseController が3つの動きで処理する。1 受け付ける：@PostMapping で URL と POST を対応づける。2 本文を受け取る：@RequestBody で本文の JSON を ReverseRequest のオブジェクトにして受け取る。3 Service に任せる：ReverseService の reverse を呼び、戻り値を Spring が JSON にして、{"original":"hello","reversed":"olleh"} を返す。',
    body,
    footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['Controller は、リクエストを受け付けて', '本文を受け取り、Service に渡すんだよ。', '順番に追ってみよう。'] }),
  }));
}
