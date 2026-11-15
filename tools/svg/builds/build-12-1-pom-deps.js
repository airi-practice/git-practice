// 12-1-pom-deps: 親(灰) → 3つの部品。webmvc・data-jpa=サーバー側(緑)、postgresql=データベースに接続(橙)。矢印は決める側(親=灰)の色。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const part = (x, color, title, has, mine, note) => `
${L.card({ x, y: 220, w: 280, h: 284, color, title })}
  ${t(x + 140, 294, '入っているもの', { bold: true, fill: C[color].dark })}
${has.map((s, i) => '  ' + t(x + 140, 318 + i * 22, s)).join('\n')}${note ? '\n' + note.map((s, i) => '  ' + t(x + 140, 372 + i * 18, s, { size: SIZE.note, fill: SUB })).join('\n') : ''}
  <line x1="${x + 16}" y1="410" x2="${x + 264}" y2="410" stroke="${C[color].main}" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="5,4"/>
  ${t(x + 140, 436, 'このシステムで支えるもの', { bold: true, fill: C[color].dark })}
${mine.map((s, i) => '  ' + t(x + 140, 460 + i * 22, s)).join('\n')}`;
const body = `
  ${t(450, 26, 'pom.xml は、必要な部品の一覧。Maven が読んで、一覧にある部品をインターネットから取ってくる')}
${L.card({ x: 190, y: 42, w: 520, h: 112, color: 'gray', title: 'spring-boot-starter-parent（版 4.1.2）' })}
  ${t(450, 82 + 36, 'Spring Boot の設定のひな型。', { })}
  ${t(450, 82 + 58, '部品どうしの相性が良い版を、決めてくれる', { })}
  ${L.arrow({ x1: 310, y1: 156, x2: 165, y2: 214, color: 'gray', width: 4 })}
  ${L.arrow({ x1: 450, y1: 156, x2: 450, y2: 214, color: 'gray', width: 4 })}
  ${L.arrow({ x1: 590, y1: 156, x2: 735, y2: 214, color: 'gray', width: 4 })}
${L.pill({ cx: 236, y: 170, w: 112, label: '版を決める', color: 'gray' })}
${L.pill({ cx: 450, y: 170, w: 112, label: '版を決める', color: 'gray' })}
${L.pill({ cx: 664, y: 170, w: 112, label: '版を決める', color: 'gray' })}
${part(20, 'green', 'spring-boot-starter-webmvc', ['WEBサーバーの機能', 'Java のオブジェクトを', 'JSON に変換する機能'], ['ProductController が受け付け、', '戻り値を JSON にして返す'])}
${part(310, 'green', 'spring-boot-starter-data-jpa', ['データベースのデータを、', 'Java のクラスとして扱う', '仕組み（JPA）'], ['Product（Entity）と', 'ProductRepository'])}
${part(600, 'orange', 'postgresql', ['PostgreSQL に接続する', 'ための部品（ドライバ）'], ['application.yml の接続先', 'jdbc:postgresql://...'], ['scope が runtime：', '動かすときだけ必要'])}
${L.card({ x: 20, y: 522, w: 860, h: 112, color: 'gray', title: 'spring-boot-maven-plugin' })}
  <text x="450" y="596" font-size="15" fill="${TEXT}" text-anchor="middle">Maven に、「Spring Boot のアプリを組み立てて、起動する」機能を足す</text>
  <text x="450" y="620" font-size="15" fill="${TEXT}" text-anchor="middle">この部品のおかげで、第11章で使った <tspan font-weight="bold" font-family="Consolas,'Courier New',monospace">./mvnw spring-boot:run</tspan> が使える</text>`;
const y0 = 650;
L.write('12-1-pom-deps', L.svg({
  y0,
  title: 'pom.xml の、親の spring-boot-starter-parent が3つの部品の版を決め、それぞれの部品が、このシステムのどのクラスや設定を支えるかを示した図。最後に、spring-boot-maven-plugin が ./mvnw spring-boot:run を使えるようにする',
  desc: 'pom.xml は必要な部品の一覧で、Maven が読んで部品をインターネットから取ってくる。親の spring-boot-starter-parent（版 4.1.2）が、spring-boot-starter-webmvc、spring-boot-starter-data-jpa、postgresql の版を決める。webmvc は WEB サーバーの機能と JSON への変換を持ち、ProductController の受付と JSON の返却を支える。data-jpa は JPA を持ち、Product（Entity）と ProductRepository を支える。postgresql は接続用のドライバで、application.yml の接続先を支える。spring-boot-maven-plugin のおかげで ./mvnw spring-boot:run が使える。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['親の spring-boot-starter-parent が、', '3つの部品の版を決めてくれるんだ。', '部品ごとの役割を見てみよう。'] }),
}));
