// 10-1-three-tasks: API を1つ足すときの3つの作業を、置き場所と一緒に見せる。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const ncard = ({ x, n, title, codes, descs, tag, tagColor }) => {
  const y = 52, w = 262, h = 264;
  const codeH = codes.length * 22 + 14;
  const tc = C[tagColor];
  return `
${L.card({ x, y, w, h, color: 'green', title })}
  <circle cx="${x + 2}" cy="${y + 2}" r="13" fill="${C.green.main}" stroke="#ffffff" stroke-width="2"/>
  ${t(x + 2, y + 7, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}
  ${L.box({ x: x + 14, y: y + 60, w: w - 28, h: codeH, color: 'gray' })}
${codes.map((s, k) => '  ' + t(x + w / 2, y + 60 + 25 + k * 22, s, { mono: true, bold: true, fill: C.green.dark })).join('\n')}
${descs.map((s, k) => '  ' + t(x + w / 2, y + 60 + codeH + 28 + k * 22, s)).join('\n')}
  <rect x="${x + 31}" y="${y + h - 42}" width="${w - 62}" height="30" rx="15" fill="${tc.light}" stroke="${tc.main}" stroke-width="2"/>
  ${t(x + w / 2, y + h - 22, tag, { bold: true, fill: tc.dark })}`;
};
const body = `
  ${L.icon({ name: 'folder', x: 218, y: 8, size: 24, color: C.gray.dark })}
  ${t(250, 28, 'backend/src/main/java/jp/co/copel/training/ の下', { mono: true, anchor: 'start', fill: C.gray.dark })}
${ncard({ x: 20, n: '1', title: 'api/ に XxxApi.java を作る', codes: ['api/XxxApi.java'], descs: ['その API の処理を書く。', '1つの API につき、1ファイル'], tag: '新しく作る', tagColor: 'yellow' })}
${ncard({ x: 319, n: '2', title: 'dto/ に2つのクラスを作る', codes: ['dto/XxxRequest.java', 'dto/XxxResponse.java'], descs: ['リクエスト用と', 'レスポンス用のクラス。', 'お手本の ProductResponse と', '同じ置き場所'], tag: '新しく作る', tagColor: 'yellow' })}
${ncard({ x: 618, n: '3', title: 'App.java に1行を足す', codes: ['App.java'], descs: ['URL と、その XxxApi を', '結びつける1行'], tag: '既存のファイルに足す', tagColor: 'gray' })}
  ${L.arrow({ x1: 286, y1: 184, x2: 316, y2: 184, color: 'gray', width: 4 })}
  ${L.arrow({ x1: 585, y1: 184, x2: 615, y2: 184, color: 'gray', width: 4 })}`;

const y0 = 332;
L.write('10-1-three-tasks', L.svg({
  y0,
  title: 'API を1つ追加するときの3つの作業を、置き場所と一緒に示した図。api/ に XxxApi.java を作る、dto/ にリクエスト用とレスポンス用のクラスを作る、App.java に URL と XxxApi を結びつける1行を足す',
  desc: 'backend/src/main/java/jp/co/copel/training/ の下で、1つ目は api/ に XxxApi.java を新しく作る。2つ目は dto/ に XxxRequest.java と XxxResponse.java を新しく作る。3つ目は既存の App.java に、URL と XxxApi を結びつける1行を足す。猫の先生が、置き場所を意識してひとつずつ進めようと話している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['API を足すときの作業は3つだよ。', '置き場所を意識して、ひとつずつ進めてみよう。'] }),
}));
