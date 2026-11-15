// 12-flow-13: Controller・Service・Repository の呼び出しの向き
const { L, C, node, arr, pill, out } = require('./_wrap-12');
const nm = '12-flow-13-layer-calls';

const X = 250, W = 400, H = 68;
const Cn = node({ x: X, y: 20, w: W, h: H, color: 'green', bold1: true, lines: ['Controller', 'URL の対応づけ、Service の呼び出し'] });
const S = node({ x: X, y: 178, w: W, h: H, color: 'green', bold1: true, lines: ['Service', '業務上の処理や判断、Entity と DTO の詰め替え'] });
const R = node({ x: X, y: 336, w: W, h: H, color: 'green', bold1: true, lines: ['Repository', 'データの取得・登録・更新・削除'] });

// やってはいけない呼び出しは、赤の点線の折れ線にして、枠の外側を通す
const bent = (d) => `\n  <path d="${d}" fill="none" stroke="${C.red.main}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3,11" marker-end="url(#${C.red.arrow})"/>`;

const body = Cn.s + S.s + R.s +
  arr({ x1: Cn.cx, y1: Cn.b + 2, x2: S.cx, y2: S.y - 5, color: 'green' }) +
  arr({ x1: S.cx, y1: S.b + 2, x2: R.cx, y2: R.y - 5, color: 'green' }) +
  pill({ cx: 450, y: 118, label: '呼ぶ', color: 'green' }) +
  pill({ cx: 450, y: 276, label: '呼ぶ', color: 'green' }) +
  bent(`M ${X - 2} ${Cn.cy} H 130 V ${R.cy} H ${X - 6}`) +
  pill({ cx: 130, y: 197, label: '直接は呼ばない', color: 'red' }) +
  bent(`M ${X + W + 2} ${R.cy} H 770 V ${S.cy} H ${X + W + 6}`) +
  pill({ cx: 770, y: 275, label: 'Service は呼ばない', color: 'red' });

out(nm, R.b,
  'Controller・Service・Repository の呼び出しの向き',
  'Controller は Service を呼び、Service は Repository を呼ぶ。Controller が Repository を直接は呼ばない。Repository が Service は呼ばない。呼び出しは Controller から Service、Service から Repository の一方向だけである。',
  body,
  ['Controller', 'URL の対応づけ、Service の呼び出し', 'Service', '業務上の処理や判断、Entity と DTO の詰め替え', 'Repository', 'データの取得・登録・更新・削除', '呼ぶ', '直接は呼ばない', 'Service は呼ばない']);
