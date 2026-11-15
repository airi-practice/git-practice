// 01_WEBアプリケーションとは.md の2つ目の flowchart（全体の流れ。subgraph が1つ）
const { L, C, t, SIZE, cardN, boxN, lab, finish } = require('./mm-a-common');
const X = 110, W = 620;
let body = '';
// subgraph PC の枠（矢印や文字より先に描き、後ろに回す）
body += `\n  <rect x="20" y="128" width="860" height="702" rx="16" fill="${C.gray.light}" fill-opacity="0.6" stroke="${C.gray.main}" stroke-width="2" stroke-dasharray="8,5"/>`;
body += '\n  ' + t(40, 158, '自分のパソコンの中（学習用の環境）', { size: SIZE.head, bold: true, anchor: 'start', fill: C.gray.dark });
// 利用者（枠の外）
body += '\n' + boxN({ x: 500, y: 44, w: 200, h: 48, color: 'gray', lines: ['利用者'] });
body += '\n  ' + L.arrow({ x1: 600, y1: 96, x2: 600, y2: 173, color: 'gray' });
body += '\n  ' + lab(600 + 14 + 44, 118, '操作する', 'gray').replace(/^\s+/, '');
body += '\n' + cardN({ x: X, y: 176, w: W, color: 'blue', head: 'ブラウザ', lines: ['画面を表示して操作を受け付ける'] });
body += '\n  ' + L.arrow({ x1: 270, y1: 263, x2: 270, y2: 337, color: 'blue' });
body += '\n  ' + lab(284 + 97, 285, '画面のファイルをもらう', 'blue').replace(/^\s+/, '');
body += '\n  ' + L.arrow({ x1: 520, y1: 263, x2: 520, y2: 337, color: 'blue' });
body += '\n  ' + lab(534 + 103, 285, '/api で始まるリクエスト', 'blue').replace(/^\s+/, '');
body += '\n' + cardN({ x: X, y: 340, w: W, color: 'blue', head: 'フロントエンドサーバー（Vite・ポート 5173）', lines: ['frontend/ の画面を配信する', '/api へのリクエストを 8080 へ中継する'] });
body += '\n  ' + L.arrow({ x1: 420, y1: 449, x2: 420, y2: 521, color: 'blue' });
body += '\n  ' + lab(434 + 44, 470, '中継する', 'blue').replace(/^\s+/, '');
body += '\n' + cardN({ x: X, y: 524, w: W, color: 'green', head: 'バックエンド（ポート 8080）', lines: ['backend/ の Java プログラム', 'リクエストを受け取って処理する'] });
body += '\n  ' + L.arrow({ x1: 420, y1: 633, x2: 420, y2: 705, color: 'green' });
body += '\n  ' + lab(434 + 90, 654, 'データを読み書きする', 'green').replace(/^\s+/, '');
body += '\n' + cardN({ x: X, y: 708, w: W, color: 'orange', head: 'PostgreSQL 17（ポート 5433）', lines: ['Docker のコンテナで動く', 'products テーブルに商品を保存'] });
finish('01-flow-02-overall-flow', 830,
  'このシステムの全体の流れ。利用者の操作をブラウザが受け、フロントエンドサーバーが画面を配信して API のリクエストをバックエンドへ中継し、バックエンドが PostgreSQL を読み書きする図',
  '利用者がブラウザを操作する。ブラウザは、フロントエンドサーバー（Vite・ポート 5173）から画面のファイルをもらい、/api で始まるリクエストもフロントエンドサーバーへ送る。フロントエンドサーバーは、リクエストをバックエンド（ポート 8080）へ中継する。バックエンドは、PostgreSQL 17（ポート 5433）のデータを読み書きする。ブラウザからデータベースまでは、自分のパソコンの中（学習用の環境）で動く。',
  body);
