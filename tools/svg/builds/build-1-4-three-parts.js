const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const Y = 20, H = 316;
const arrows = (x1, x2, y) => `${L.arrow({ x1, y1: y, x2, y2: y, color: 'gray', width: 4 })}
  ${L.arrow({ x1: x2, y1: y + 22, x2: x1, y2: y + 22, color: 'gray', width: 4 })}`;
const ROW = '#fff3b0', COL = '#dbe4ee', HEAD = '#f1f5f9';
const body = `
${L.card({ x: 20, y: Y, w: 240, h: H, color: 'blue', title: 'ホール' })}
  ${t(140, Y + 80, 'フロントエンド', { size: SIZE.head, bold: true, fill: C.blue.dark })}
  ${t(140, Y + 112, '利用者が直接見て、')}
  ${t(140, Y + 134, '操作する画面を作る部分')}
  ${L.box({ x: 40, y: Y + 152, w: 200, h: 36, color: 'blue' })}
  ${t(140, Y + 176, 'ブラウザの中で動く', { bold: true, fill: C.blue.dark })}
  ${t(140, Y + 236, 'お客さんの注文を受けたり、', { size: SIZE.note, fill: SUB })}
  ${t(140, Y + 256, '料理を運んだりする', { size: SIZE.note, fill: SUB })}
  ${arrows(264, 296, 160)}
${L.card({ x: 300, y: Y, w: 240, h: H, color: 'green', title: 'キッチン' })}
  ${t(420, Y + 80, 'バックエンド', { size: SIZE.head, bold: true, fill: C.green.dark })}
  ${t(420, Y + 112, 'フロントエンドからのお願いを')}
  ${t(420, Y + 134, '受け取って、処理する部分')}
  ${L.box({ x: 320, y: Y + 152, w: 200, h: 36, color: 'green' })}
  ${t(420, Y + 176, 'サーバーの中で動く', { bold: true, fill: C.green.dark })}
  ${t(420, Y + 236, '注文を受けて、', { size: SIZE.note, fill: SUB })}
  ${t(420, Y + 256, '調理する', { size: SIZE.note, fill: SUB })}
  ${arrows(544, 576, 160)}
${L.card({ x: 580, y: Y, w: 300, h: H, color: 'orange', title: '倉庫' })}
  ${t(730, Y + 80, 'データベース', { size: SIZE.head, bold: true, fill: C.orange.dark })}
  ${t(730, Y + 108, '情報を保存しておく部分')}
  ${t(730, Y + 128, '「テーブル」という表の形で保存する')}
  <rect x="596" y="164" width="268" height="88" fill="#ffffff"/>
  <rect x="596" y="164" width="268" height="22" fill="${HEAD}"/>
  <rect x="734" y="164" width="76" height="88" fill="${COL}" opacity="0.8"/>
  <rect x="596" y="186" width="268" height="22" fill="${ROW}"/>
  <rect x="734" y="186" width="76" height="22" fill="${ROW}"/>
  <line x1="596" y1="208" x2="864" y2="208" stroke="#cbd5e1"/><line x1="596" y1="230" x2="864" y2="230" stroke="#cbd5e1"/>
  <rect x="596" y="164" width="268" height="88" fill="none" stroke="${C.orange.main}" stroke-width="1.5"/>
  ${t(606, 180, 'id', { size: 13, bold: true, mono: 1, anchor: 'start' })}${t(636, 180, 'name', { size: 13, bold: true, mono: 1, anchor: 'start' })}${t(772, 180, 'price', { size: 13, bold: true, mono: 1 })}${t(820, 180, 'stock', { size: 13, bold: true, mono: 1, anchor: 'start' })}
  ${[['1', 'ボールペン', '150', '200'], ['2', 'ノート', '220', '120'], ['3', 'クリアファイル', '80', '500']].map((r, i) => {
    const y = 202 + i * 22;
    return t(606, y, r[0], { size: 13, anchor: 'start' }) + t(636, y, r[1], { size: 13, anchor: 'start' }) + t(802, y, r[2], { size: 13, anchor: 'end' }) + t(856, y, r[3], { size: 13, anchor: 'end' });
  }).join('\n  ')}
  <rect x="596" y="266" width="18" height="16" rx="3" fill="${ROW}" stroke="#a8941c"/>
  ${t(622, 279, '表の1行が、1件分のデータ', { size: 13, anchor: 'start' })}
  <rect x="596" y="290" width="18" height="16" rx="3" fill="${COL}" stroke="#64748b"/>
  ${t(622, 303, '1列が、1つの項目（例：price）', { size: 13, anchor: 'start' })}
  ${t(730, 326, '食材をしまっておく', { size: SIZE.note, fill: SUB })}`;

const y0 = 352;
L.write('1-4-three-parts', L.svg({
  y0,
  title: 'ホール・キッチン・倉庫のたとえを、フロントエンド・バックエンド・データベースに当てはめた図。データベースの情報は、テーブルという表の形で保存し、表の1行が1件分、1列が1つの項目にあたる',
  desc: 'ホールにあたるフロントエンドはブラウザの中で動く画面の部分、キッチンにあたるバックエンドはサーバーの中で動く処理の部分、倉庫にあたるデータベースは情報をテーブルという表の形で保存する部分。猫の先生が、WEBアプリケーションも同じ役割分担になっていると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['ホールが注文を受けて、キッチンが調理して、倉庫に食材をしまっておく。', 'WEBアプリケーションも、同じ役割分担になっているんだよ。'] }),
}));
