// 13-summary-who-does: 仕事ごとに、backend/ で自分で書くこと と、backend_spring/ で Spring Boot が代わりにやること
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const LX = 20, LW = 340, MX = 365, MW = 170, RX = 540, RW = 340;
const head = (x, w, color, l1, l2, mono) => `
  <g filter="url(#shadow)"><path d="M${x} 52 v-34 a16 16 0 0 1 16 -16 h${w - 32} a16 16 0 0 1 16 16 v34 z" fill="url(#${C[color].head})"/></g>
  ${l2 ? t(x + w / 2, 26, l1, { size: SIZE.head, bold: true, fill: '#ffffff', mono }) + '\n  ' + t(x + w / 2, 46, l2, { bold: true, fill: '#ffffff' }) : t(x + w / 2, 34, l1, { size: SIZE.head, bold: true, fill: '#ffffff' })}`;
// 行。左=backend/（白地に緑の枠）、中=仕事（灰）、右=backend_spring/（薄い緑）
const rows = [
  [['Javalin.create() と app.start(8080)'], ['WEBサーバーの', '作成と起動'], ['SpringApplication.run(...)', 'と server.port'], true],
  [['App.java に、1行ずつ書く'], ['URL と処理の', '対応づけ'], ['@GetMapping などの目印を探して、', '対応づける']],
  [['new で作る、または', 'static メソッドを呼ぶ'], ['クラスの', 'インスタンスを作る'], ['@RestController・@Service を', '探して作り、コンストラクタに渡す']],
  [['Database.connect() と、', 'finally での close()'], ['接続の開閉'], ['自動'], true],
  [['全部、自分で書く'], ['SQL'], ['findAll() などは、', '自動で作られる']],
  [['rs.getLong(...) などで、1列ずつ'], ['結果の詰め替え'], ['Entity に、自動で詰める'], true],
  [['ctx.json(...) を呼ぶ'], ['JSON への変換'], ['戻り値を、自動で変換する'], true],
  [['CREATE TABLE を書く'], ['テーブルの作成'], ['Entity から、自動で作る'], true],
];
// 左の列で、コードの文字だけの行は等幅にする（元の図と同じ行）
const monoLeft = [0, 3, 5, 6, 7];
const cellText = (cx, y, lines, opt) => lines.map((s, k) => t(cx, y + (lines.length === 1 ? 31 : 22 + k * 20), s, opt)).join('\n  ');
let body = head(LX, LW, 'green', 'backend/', '自分で書く', true) + head(MX, MW, 'gray', '仕事') + head(RX, RW, 'green', 'backend_spring/', 'Spring Boot が代わりにやる', true);
rows.forEach((r, i) => {
  const y = 64 + i * 56, h = 50;
  body += `
  <rect x="${LX}" y="${y}" width="${LW}" height="${h}" rx="10" fill="#ffffff" stroke="${C.green.main}" stroke-width="1.5"/>
  ${cellText(LX + LW / 2, y, r[0], { fill: TEXT_(), mono: monoLeft.includes(i) })}
  <rect x="${MX}" y="${y}" width="${MW}" height="${h}" rx="10" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"/>
  ${cellText(MX + MW / 2, y, r[1], { bold: true, fill: C.gray.dark })}
  <rect x="${RX}" y="${y}" width="${RW}" height="${h}" rx="10" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="1.5"/>
  ${cellText(RX + RW / 2, y, r[2], { fill: C.green.dark, mono: i === 0 })}`;
});
function TEXT_() { return L.TEXT; }
const y0 = 64 + 8 * 56 - 6 + 16;
L.write('13-summary-who-does', L.svg({
  y0,
  title: '仕事ごとに、backend/ では自分で書くことが、backend_spring/ では Spring Boot が代わりにやることに、どう変わるかを並べた図',
  desc: '左が backend/ で自分で書くこと、中央が仕事、右が backend_spring/ で Spring Boot が代わりにやること。WEBサーバーの作成と起動、URL と処理の対応づけ、クラスのインスタンスを作る、接続の開閉、SQL、結果の詰め替え、JSON への変換、テーブルの作成の8つの仕事を並べている。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['同じ仕事でも、左は自分で書いて', '右は Spring Boot がやってくれるんだ。', 'この違いをつかんでおこう。'] }),
}));
