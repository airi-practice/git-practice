// README 5-4「GitHub アカウント」の画面の模擬図を書き出す（サイトのトップ・登録・確認コード・ユーザー名の確認）。
// 画面内の文字は、実際の GitHub の英語の表示に近づける。部品は tools/svg/github-mock.js。
// 作り直すには: node tools/svg/builds-readme/build-github-account.js （docs/images/setup-github-*.svg を書き出す）
const M = require('../github-mock');
const { G, W, tw, gt, bar, caret, line, btn, avatar, icon, logo, frame, appHeader, outA } = M;
const { t } = M.S;

const field = (y, label, text, hint, o = {}) =>
  `${gt(210, y, label, { bold: true })}${bar(210, y + 10, 480, 38)}${gt(224, y + 35, text, { fill: o.ph ? G.sub : G.text })}${hint ? gt(210, y + 66, hint, { size: 12, fill: G.sub }) : ''}`;

// ---- 1. GitHub のトップページ ----
{
  const H = 440, D = '#0d1117', LT = '#e6edf3';
  let b = frame(H, 'https://github.com/', D);
  b += `\n  <rect x="1" y="45" width="${W - 2}" height="58" fill="${D}"/>${line(1, 103, W - 1, 103, '#30363d')}`;
  b += `${logo(40, 74, 16, '#ffffff', D)}${t(66, 81, 'GitHub', { size: 20, bold: true, fill: '#ffffff' })}`;
  [['Product', 166], ['Solutions', 250], ['Resources', 344], ['Enterprise', 446], ['Pricing', 550]].forEach(([s, x]) => {
    b += `${t(x, 80, s, { size: 14, fill: LT })}${s === 'Pricing' ? '' : caret(x + tw(s, 14) + 6, 72, '#9aa4b0')}`;
  });
  b += `${icon.magnifier(650, 66).replace(/#666/g, '#e6edf3')}${t(710, 80, 'Sign in', { size: 14, fill: LT })}<rect x="796" y="58" width="84" height="32" rx="6" fill="none" stroke="${LT}" stroke-width="1.5"/>${t(838, 79, 'Sign up', { size: 14, bold: true, fill: '#ffffff', anchor: 'middle' })}`;
  b += `\n  ${t(60, 200, 'Build and ship software on a', { size: 30, bold: true, fill: '#ffffff' })}${t(60, 242, 'single, collaborative platform', { size: 30, bold: true, fill: '#ffffff' })}`;
  b += `\n  ${bar(60, 280, 380, 44, '#ffffff', '#ffffff')}${gt(74, 308, 'Email address', { fill: G.sub })}${btn(452, 280, 200, 'Sign up for GitHub', { h: 44 })}${btn(664, 280, 190, 'Try GitHub Copilot', { h: 44, primary: false })}`;
  outA('setup-github-01-open-site', H, 'GitHub のトップページ',
    'GitHub のトップページ(https://github.com/)。上の帯の右に「Sign in」と「Sign up」がある。アカウントを作るには「Sign up」を押す。', b, [
      { n: 1, x: 796, y: 58, w: 84, h: 32, text: '右上の「Sign up」を押す(アカウントを作る)' },
    ]);
}

// ---- 2. 登録の画面 ----
{
  const H = 640;
  let b = frame(H, 'https://github.com/signup');
  b += `\n  ${t(450, 100, 'Sign up for GitHub', { size: 26, bold: true, fill: G.text, anchor: 'middle' })}`;
  b += `\n  ${btn(210, 124, 232, 'Continue with Google', { primary: false, h: 38 })}${btn(458, 124, 232, 'Continue with Apple', { primary: false, h: 38 })}`;
  b += `\n  ${t(450, 190, 'or', { size: 14, fill: G.sub, anchor: 'middle' })}${line(210, 185, 420, 185)}${line(480, 185, 690, 185)}`;
  b += `\n  ${field(220, 'Email*', 'you@example.com')}${field(296, 'Password*', '••••••••••••', 'Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.')}${field(398, 'Username*', 'your-username', 'Username may only contain alphanumeric characters or single hyphens.')}`;
  b += `\n  ${btn(210, 530, 480, 'Continue', { h: 42 })}`;
  outA('setup-github-02-signup-form', H, 'GitHub の登録の画面',
    'GitHub の「Sign up for GitHub」の画面。メールアドレス(Email)、パスワード(Password)、ユーザー名(Username)を入れて、「Continue」を押す。', b, [
      { n: 1, x: 210, y: 230, w: 480, h: 38, text: 'メールアドレスを入れる' },
      { n: 2, x: 210, y: 306, w: 480, h: 38, text: 'パスワードを決めて入れる(下に、使える形の説明が出る)' },
      { n: 3, x: 210, y: 408, w: 480, h: 38, text: 'ユーザー名を決めて入れる。あとで使うので、メモしておく' },
      { n: 4, x: 210, y: 530, w: 480, h: 42, text: '「Continue」を押して、画面の案内に従って進む' },
    ]);
}

// ---- 3. 確認コード ----
{
  const H = 380;
  let b = frame(H, 'https://github.com/signup');
  b += `\n  ${t(450, 120, 'Verify your account', { size: 26, bold: true, fill: G.text, anchor: 'middle' })}`;
  b += `\n  ${t(450, 156, 'We sent a launch code to you@example.com', { size: 15, fill: G.sub, anchor: 'middle' })}`;
  for (let i = 0; i < 8; i++) b += `${bar(166 + i * 70, 190, 56, 64, '#fff', G.line, 8)}${t(194 + i * 70, 232, String((i * 7 + 3) % 10), { size: 26, bold: true, fill: G.text, anchor: 'middle' })}`;
  b += `\n  ${t(450, 296, 'Didn’t get your email?', { size: 14, fill: G.sub, anchor: 'middle' })}${t(450, 320, 'Resend the code', { size: 14, fill: G.link, anchor: 'middle' })}`;
  outA('setup-github-03-verify', H, 'GitHub の確認コードの画面',
    'GitHub の「Verify your account」の画面。登録したメールアドレスに届いたコードを、8つの枠に入れる。メールが届かないときは「Resend the code」を押す。', b, [
      { n: 1, x: 160, y: 184, w: 568, h: 76, text: '登録したメールアドレスに届いたコードを入れる' },
    ]);
}

// ---- 4. ユーザー名の確認 ----
{
  const H = 470;
  let b = frame(H, 'https://github.com/') + appHeader('Home');
  b += `\n  ${gt(40, 150, 'Home', { size: 24, bold: true })}`;
  b += `\n  ${gt(40, 200, 'Top repositories', { size: 14, bold: true })}${btn(176, 182, 52, 'New', { h: 28, size: 13 })}${bar(40, 218, 260, 30)}${gt(54, 238, 'Find a repository…', { size: 13, fill: G.sub })}`;
  b += `${gt(40, 280, 'your-org/git-practice-exercise', { size: 13, fill: G.link })}`;
  // メニュー
  b += `\n  <rect x="${W - 292}" y="104" width="262" height="340" rx="10" fill="#ffffff" stroke="${G.line}" stroke-width="1.5"/>`;
  b += `${gt(W - 276, 130, 'Signed in as', { size: 13, fill: G.sub })}${gt(W - 276, 154, 'your-username', { bold: true, size: 16 })}${line(W - 291, 170, W - 31, 170)}`;
  ['Set status', ''].forEach((s, i) => { if (s) b += gt(W - 276, 196 + i * 30, s); });
  b += `${line(W - 291, 210, W - 31, 210)}`;
  ['Your profile', 'Your repositories', 'Your projects', 'Your stars'].forEach((s, i) => { b += gt(W - 276, 236 + i * 32, s); });
  b += `${line(W - 291, 366, W - 31, 366)}${gt(W - 276, 392, 'Settings')}${gt(W - 276, 424, 'Sign out')}`;
  outA('setup-github-04-username', H, 'GitHub のユーザー名を確認する画面',
    'GitHub にサインインした画面。右上の丸いアイコンを押すと、メニューが開き、「Signed in as」の下にユーザー名が出る。', b, [
      { n: 1, x: W - 54, y: 57, w: 32, h: 32, text: '右上の丸いアイコンを押して、メニューを開く' },
      { n: 2, x: W - 282, y: 140, w: 170, h: 22, text: '「Signed in as」の下が、自分のユーザー名。メモしておく' },
    ]);
}
