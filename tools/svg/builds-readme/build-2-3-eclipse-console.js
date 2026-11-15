// 2-3 の手順8のあと: Eclipse の下の「コンソール」に Listening on http://localhost:8080/ と出れば成功。
const S = require('../shot-lib');
const { t, win, hl, arrow, note } = S;

S.write('2-3-eclipse-console', S.svg({
  W: 760, H: 280,
  title: 'Eclipse の下の「コンソール」に Listening on http://localhost:8080/ と表示されれば起動に成功している',
  desc: 'App.java を実行したあと、Eclipse の下にある「コンソール」に、Listening on http://localhost:8080/ と表示されれば、バックエンドの起動は成功している。',
  body: `
  ${win({ x: 10, y: 10, w: 740, h: 260 })}
  ${t(30, 50, 'Eclipse の画面', { size: 15, bold: true, fill: '#222' })}
  <rect x="24" y="100" width="712" height="100" rx="6" fill="#ffffff" stroke="#999" stroke-width="1.5"/>
  <rect x="24" y="100" width="712" height="30" rx="6" fill="#e2e8f0" stroke="#999" stroke-width="1.5"/>
  ${t(40, 121, 'コンソール', { bold: true })}
  ${t(40, 160, 'Listening on http://localhost:8080/', { size: 14, mono: true, fill: '#222' })}
  ${hl({ x: 32, y: 142, w: 340, h: 30 })}
  ${arrow({ x1: 460, y1: 157, x2: 380, y2: 157 })}
  ${note({ x: 470, y: 163, n: 1, text: 'この表示が出れば成功' })}
  ${note({ x: 30, y: 236, text: 'コンソールは、Eclipse の画面の下に出る' })}`,
}));
