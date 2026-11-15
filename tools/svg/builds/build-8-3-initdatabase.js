// 8-3-initdatabase: App の initDatabase メソッドの3つの動きを、コードの行と一緒に示す。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const code = (x, y, s, o = {}) => t(x, y, s, { mono: true, anchor: 'start', size: SIZE.body, ...o });
const G = C.green;
// 動きごとの白いカード。上端 y、高さ h、見出し（番号つき）
const sec = (y, h, n, title) => `
  <g filter="url(#shadow)"><rect x="40" y="${y}" width="820" height="${h}" rx="14" fill="#ffffff" stroke="${G.main}" stroke-width="2"/></g>
  <path d="M40 ${y + 44} v-28 a16 16 0 0 1 16 -16 h788 a16 16 0 0 1 16 16 v28 z" fill="url(#headGreen)" transform="translate(0 ${y})" />`;
const head = (y, n, title) => `
  <circle cx="68" cy="${y + 22}" r="13" fill="#ffffff"/>
  ${t(68, y + 28, n, { size: SIZE.note, bold: true, fill: G.main })}
  ${t(92, y + 29, title, { size: SIZE.head, bold: true, anchor: 'start', fill: '#ffffff' })}`;
const secCard = (y, h) => `
  <g filter="url(#shadow)"><rect x="40" y="${y}" width="820" height="${h}" rx="16" fill="#ffffff" stroke="${G.main}" stroke-width="2"/></g>
  <path d="M40 ${y + 46} v-30 a16 16 0 0 1 16 -16 h788 a16 16 0 0 1 16 16 v30 z" fill="url(#headGreen)"/>`;
const cbox = (y, h) => `<rect x="60" y="${y}" width="380" height="${h}" rx="8" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"/>`;
const dbbox = (cy, l1, l2, big) => `
  <g filter="url(#shadow)"><rect x="716" y="${cy - 32}" width="132" height="64" rx="10" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2"/></g>
  ${t(782, cy - 4, l1, { bold: true, fill: C.orange.dark })}
  ${t(782, cy + 18, l2, { bold: true, size: big ? SIZE.body : SIZE.note, fill: C.orange.dark })}
  ${L.arrow({ x1: 686, y1: cy, x2: 710, y2: cy, color: 'green', width: 4 })}`;
const desc = (y, lines) => lines.map((s, k) => t(456, y + k * 22, s, { anchor: 'start' })).join('\n  ');
const note = (y, lines) => lines.map((s, k) => t(456, y + k * 19, s, { size: SIZE.note, anchor: 'start', fill: SUB })).join('\n  ');

// 動き1 y=70..216
const y1 = 70, y2 = 262, y3 = 530;
const body = `
  <rect x="20" y="12" width="860" height="${y3 + 160 - 12 + 6}" rx="16" fill="${G.light}" fill-opacity="0.55" stroke="${G.main}" stroke-width="2"/>
  ${t(40, 46, 'App.java の initDatabase()', { size: SIZE.head, bold: true, mono: true, anchor: 'start', fill: G.dark })}
  ${t(330, 46, 'main の最初に1回だけ呼ぶ。学習用の動作確認のための処理', { anchor: 'start', fill: SUB })}
${secCard(y1, 168)}${head(y1, '1', '接続を開く')}
  ${cbox(y1 + 62, 54)}
  ${code(72, y1 + 84, 'connection = Database.connect();')}
  ${code(72, y1 + 106, 'statement = connection.createStatement();')}
  ${desc(y1 + 80, ['接続を受け取り、SQL を送る', 'ための Statement を作る'])}
  ${note(y1 + 126, ['Connection は try の外で用意する', '（finally で閉じるため）'])}
  ${dbbox(y1 + 100, 'データベース', '（PostgreSQL）')}
  ${L.arrow({ x1: 450, y1: y1 + 170, x2: 450, y2: y2 - 2, color: 'green', width: 4 })}
${secCard(y2, 236)}${head(y2, '2', 'テーブルと見本データを用意する')}
  ${cbox(y2 + 62, 40)}
  ${code(72, y2 + 87, 'CREATE TABLE IF NOT EXISTS products (...)', { bold: true })}
  ${desc(y2 + 76, ['テーブルがなければ作る。', 'あれば何もしない'])}
  ${note(y2 + 120, ['（起動のたびに、エラーにならない）'])}
  ${cbox(y2 + 148, 56)}
  ${code(72, y2 + 172, 'INSERT INTO products ...', { bold: true })}
  ${code(72, y2 + 194, 'WHERE NOT EXISTS (SELECT 1 ...)', { bold: true })}
  ${desc(y2 + 164, ['products が空のときだけ、', '見本の5件を登録'])}
  ${note(y2 + 208, ['（同じ商品が増えない）'])}
  ${dbbox(y2 + 150, 'products', 'テーブル', true)}
  ${L.arrow({ x1: 450, y1: y2 + 238, x2: 450, y2: y3 - 2, color: 'green', width: 4 })}
${secCard(y3, 156)}${head(y3, '3', '接続を閉じる')}
  ${cbox(y3 + 62, 54)}
  ${code(72, y3 + 84, 'finally {')}
  ${code(72, y3 + 106, 'connection.close(); }')}
  ${desc(y3 + 80, ['成功しても失敗しても、', '必ず通る場所で閉じる'])}
  ${note(y3 + 134, ['（3-5 で説明した）'])}`;
const y0 = y3 + 156 + 36;
L.write('8-3-initdatabase', L.svg({
  y0,
  title: 'App の initDatabase メソッドの3つの動きを、コードの行と一緒に示した図。接続を開く、テーブルを作って見本の商品を登録する、finally で接続を閉じる',
  desc: 'initDatabase は main の最初に1回だけ呼ぶ。1 Database.connect() で接続を開き、Statement を作る。Connection は finally で閉じるため try の外で用意する。2 CREATE TABLE IF NOT EXISTS で、テーブルがなければ作る。INSERT INTO products ... WHERE NOT EXISTS で、products が空のときだけ見本の5件を登録する。3 finally で connection.close() を呼び、成功しても失敗しても必ず接続を閉じる。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['initDatabase は、接続を開いて、', 'テーブルと見本の商品を用意するんだ。', '最後に finally で、必ず接続を閉じるよ。'] }),
}));
