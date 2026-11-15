// 12-9-annotations: アノテーションを、付ける場所のクラスごとにまとめる。
// TrainingApplication・Controller・Service はサーバー側のクラスなので緑、Entity はテーブルと対応づけるので橙。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const cardMono = (o) => L.card({ ...o, title: '' }) + '\n  ' + t(o.x + o.w / 2, o.y + 31, o.title, { size: SIZE.head, bold: true, mono: true, fill: '#ffffff' });
const ann = (x, y, w, h, color, lines) => {
  const c = C[color];
  return `${L.box({ x, y, w, h, color })}
  ${lines.map((l, i) => t(x + 14, y + 24 + i * 22, l.s, { bold: i === 0 || l.mono, mono: l.mono, anchor: 'start', fill: i === 0 || l.mono ? c.dark : '#1e293b' })).join('\n  ')}`;
};
const m = (s) => ({ s, mono: true });
const p = (s) => ({ s });
const body = `
${cardMono({ x: 20, y: 12, w: 425, h: 174, color: 'green', title: 'TrainingApplication' })}
  ${ann(36, 70, 393, 102, 'green', [m('@SpringBootApplication'), p('付ける場所：クラス'), p('Spring Boot のアプリの入口。'), p('このクラスの配下を、自動で探す')])}
${cardMono({ x: 465, y: 12, w: 415, h: 332, color: 'green', title: 'ProductController' })}
  ${ann(480, 70, 385, 80, 'green', [m('@RestController'), p('付ける場所：クラス'), p('リクエストを受け付けて、JSON で返すクラス')])}
  ${ann(480, 160, 385, 80, 'green', [m('@RequestMapping("/api/products")'), p('付ける場所：クラス'), p('URL の先頭部分を決める')])}
  ${ann(480, 250, 385, 80, 'green', [m('@GetMapping'), p('付ける場所：メソッド（list）'), p('GET が来たときに、そのメソッドを呼ぶ')])}
${cardMono({ x: 20, y: 198, w: 425, h: 146, color: 'green', title: 'ProductService' })}
  ${ann(36, 256, 393, 80, 'green', [m('@Service'), p('付ける場所：クラス'), p('処理の中身を書くクラス')])}
${cardMono({ x: 20, y: 360, w: 860, h: 176, color: 'orange', title: 'Product（Entity）' })}
  ${t(36, 432, 'テーブルとの対応づけ（12-6）', { bold: true, anchor: 'start', fill: C.orange.dark })}
  ${ann(36, 444, 400, 80, 'orange', [p('クラスに付ける'), m('@Entity'), m('@Table(name = "products")')]).replace(/y="(\d+)"/g, (a, n) => a)}
  ${ann(456, 444, 408, 80, 'orange', [p('フィールドに付ける'), m('@Id\u3000@GeneratedValue\u3000@Column'), p('主キー、自動で付く番号、列の設定')])}`;
const y0 = 536 + 16;
L.write('12-9-annotations', L.svg({
  y0,
  title: 'このシステムで使っているアノテーションを、付ける場所のクラスごとに、意味と一緒にまとめた図',
  desc: 'TrainingApplication には @SpringBootApplication、ProductController には @RestController・@RequestMapping("/api/products")・@GetMapping、ProductService には @Service、Product（Entity）にはクラスに @Entity と @Table(name = "products")、フィールドに @Id・@GeneratedValue・@Column を付ける。猫の先生が、@ が付いた目印で Spring Boot に役割を伝えると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['@ が付いた目印で、Spring Boot に', '役割を伝えるんだよ。', '付ける場所も見てみよう。'] }),
}));
