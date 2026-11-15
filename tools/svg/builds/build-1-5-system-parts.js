const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const Y = 100, H = 214;
const badge = (cx, cy, n, color) => `<circle cx="${cx}" cy="${cy}" r="11" fill="${C[color].main}"/>${t(cx, cy + 5, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}`;
const body = `
  ${t(450, 36, 'このシステムの3つの層と、使っている技術', { size: SIZE.title, bold: true })}
  <rect x="20" y="56" width="860" height="274" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,4"/>
  ${t(40, 82, '自分のパソコンの中（学習用なので、全部ここで動く）', { size: SIZE.note, anchor: 'start', fill: SUB })}
${L.card({ x: 40, y: Y, w: 250, h: H, color: 'blue', title: 'フロントエンド', sub: '画面を作る部分' })}
  ${L.box({ x: 70, y: Y + 96, w: 190, h: 36, color: 'blue' })}
  ${t(165, Y + 120, 'React と TypeScript', { bold: true, fill: C.blue.dark })}
  ${t(165, Y + 156, '置き場所: frontend/', { size: SIZE.note, mono: 1, fill: SUB })}
  ${t(165, Y + 182, '商品一覧の画面', { size: SIZE.note, fill: C.blue.dark })}
  ${t(165, Y + 202, 'ProductListPage.tsx', { size: SIZE.note, mono: 1, fill: C.blue.dark })}
${L.card({ x: 325, y: Y, w: 250, h: H, color: 'green', title: 'バックエンド', sub: 'お願いを受けて処理する部分' })}
  ${L.box({ x: 355, y: Y + 96, w: 190, h: 36, color: 'green' })}
  ${t(450, Y + 120, 'Java', { bold: true, fill: C.green.dark })}
  ${t(450, Y + 156, '置き場所: backend/', { size: SIZE.note, mono: 1, fill: SUB })}
${L.card({ x: 610, y: Y, w: 250, h: H, color: 'orange', title: 'データベース', sub: '情報を保存しておく部分' })}
  ${L.box({ x: 640, y: Y + 96, w: 190, h: 36, color: 'orange' })}
  ${t(735, Y + 120, 'PostgreSQL', { bold: true, fill: C.orange.dark })}
  ${t(735, Y + 156, 'Docker のコンテナで動く', { size: SIZE.note, fill: SUB })}
  ${t(735, Y + 178, 'docker-compose.yml で起動', { size: SIZE.note, mono: 1, fill: SUB })}
  ${L.arrow({ x1: 294, y1: 200, x2: 321, y2: 200, color: 'blue', width: 4 })}
  ${badge(307.5, 180, '1', 'blue')}
  ${L.arrow({ x1: 579, y1: 200, x2: 606, y2: 200, color: 'green', width: 4 })}
  ${badge(592.5, 180, '2', 'green')}`;
const y0 = 346;
L.write('1-5-system-parts', L.svg({
  y0,
  title: 'このシステムの3つの層。React と TypeScript のフロントエンド、Java のバックエンド、PostgreSQL のデータベースが、自分のパソコンの中で動いている図',
  desc: 'フロントエンドは画面を作る部分で React と TypeScript を使い、frontend/ に置く。バックエンドはお願いを受けて処理する部分で Java を使い、backend/ に置く。データベースは情報を保存する部分で PostgreSQL を使い、Docker のコンテナで動く。画面から処理、処理から保存の順にお願いが伝わる。猫の先生が、その順を説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['画面から処理、処理から保存の順に、', 'お願いが伝わっていくんだよ。'] }),
}));
