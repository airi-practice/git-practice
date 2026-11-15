// 13-flow-01-backend-files: backend/ と backend_spring/ のファイルの分け方の図（Mermaid の flowchart LR を置き換えたもの）
// どちらもサーバー側なので、どちらも緑。違いは枠のラベルで示す
const M = require('./mm');
const { node, frame, line } = M;

const H = 108, GAP = 34, Y0 = 58;
const ry = (i) => Y0 + i * (H + GAP);

// backend/（左）
const BX = 24, BW = 302;
const b1 = node({ x: BX, y: ry(0), w: BW, h: H, color: 'green', lines: ['hm|App.java', 'n|起動する・URL と処理を対応づける', 'n|・テーブルと見本データを用意する'] });
const b3 = node({ x: BX, y: ry(1), w: BW, h: H, color: 'green', lines: ['hm|api/', 'hm|ProductListApi.java', 'n|受け付け・SQL を1ファイルに書く', 'n|（JSON の形は dto/ProductResponse.java）'] });
const b2 = node({ x: BX, y: ry(2), w: BW, h: H, color: 'green', lines: ['hm|Database.java', 'n|データベースへの接続を作る'] });

// backend_spring/（右）
const LX = 376, LW = 230, RX = 650, RW = 224;
const s1 = node({ x: LX, y: ry(0), w: LW, h: H, color: 'green', lines: ['hm|TrainingApplication.java', 'n|起動する'] });
const s2 = node({ x: RX, y: ry(0), w: RW, h: H, color: 'green', lines: ['hm|application.yml /', 'hm|data.sql', 'n|接続情報・テーブルの作り方・', 'n|見本データ'] });
const s3 = node({ x: LX, y: ry(1), w: LW, h: H, color: 'green', lines: ['hm|controller/', 'hm|ProductController.java', 'n|リクエストを受け付ける'] });
const s4 = node({ x: LX, y: ry(2), w: LW, h: H, color: 'green', lines: ['hm|service/', 'hm|ProductService.java', 'n|処理の中身'] });
const s7 = node({ x: RX, y: ry(2), w: RW, h: H, color: 'green', lines: ['hm|dto/', 'hm|ProductResponse.java', 'n|レスポンスの JSON の形'] });
const s5 = node({ x: LX, y: ry(3), w: LW, h: H, color: 'green', lines: ['hm|repository/', 'hm|ProductRepository.java', 'n|データベースの窓口'] });
const s6 = node({ x: LX, y: ry(4), w: LW, h: H, color: 'green', lines: ['hm|entity/', 'hm|Product.java', 'n|テーブルの1行'] });

const bottom = s6.b + 16;
const frames = frame({ x: 10, y: 10, w: 330, h: bottom - 10, color: 'green', label: 'backend/（自分で書く部分が多い）' }) + '\n  ' +
  frame({ x: 360, y: 10, w: 530, h: bottom - 10, color: 'green', label: 'backend_spring/（役割ごとにファイルを分ける）' });

const down = (a, b) => line([[a.cx, a.b + 3], [a.cx, b.y - 5]], 'green');
const e = [
  down(b1, b3), down(b3, b2),
  down(s1, s3), down(s3, s4), down(s4, s5), down(s5, s6),
  line([[s4.r + 3, s4.cy], [s7.x - 5, s7.cy]], 'green'),
];

const body = frames + '\n' + [b1, b3, b2, s1, s2, s3, s4, s7, s5, s6].map((n) => n.svg).join('\n') + '\n  ' + e.join('\n  ');
M.finish('13-flow-01-backend-files', {
  title: 'backend/ と backend_spring/ で、商品の一覧を返す仕事をどのファイルに分けているかの比較',
  desc: 'backend/ は、App.java が起動と URL の対応づけとテーブルの用意をし、api/ProductListApi.java が受け付けと SQL を1ファイルで書き、Database.java が接続を作る。JSON の形は dto/ProductResponse.java。backend_spring/ は、TrainingApplication.java が起動し、application.yml と data.sql が接続情報・テーブルの作り方・見本データを持つ。controller が受け付け、service が処理の中身、repository がデータベースの窓口、entity がテーブルの1行を表し、service は dto の ProductResponse を使う。',
  body,
  bottom,
});
