// 0章のマンガ用の共通部品。キャラクター（もちこ・ペン先輩・ポチ・部長）、コマ、吹き出し、小物を描く。
// キャラの見た目をコマごとにずらさないよう、描き方をここ1か所にまとめている。猫は cat.js を使う。
const fs = require('fs');
const path = require('path');

const INK = '#6a503f';
const FONT = "'Segoe UI','Yu Gothic UI','Meiryo',sans-serif";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 文字。size は svg-rules の6段階（13/15/16/18/22/28）に合わせる。効果音だけ例外で大きくする。
function T(x, y, s, o = {}) {
  const rot = o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : '';
  const stroke = o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 6}" stroke-linejoin="round" paint-order="stroke"` : '';
  return `<text x="${x}" y="${y}" font-size="${o.size || 16}" font-weight="${o.bold === false ? 400 : 700}" fill="${o.fill || '#1e293b'}" text-anchor="${o.anchor || 'middle'}"${rot}${stroke}>${esc(s)}</text>`;
}

// ---------- 表情 ----------
const EYE = {
  normal: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="7.5" ry="10" fill="${INK}"/><circle cx="${x + 2.6}" cy="${y - 3.6}" r="3.4" fill="#fff"/><circle cx="${x - 2.4}" cy="${y + 3.6}" r="1.7" fill="#fff"/>`,
  happy: (x, y) => `<path d="M${x - 7} ${y + 3} q7 -11 14 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
  shock: (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="2.6" fill="${INK}"/>`,
  sad: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="8.5" ry="11" fill="${INK}"/><circle cx="${x + 3}" cy="${y - 4}" r="4" fill="#fff"/><circle cx="${x - 2.5}" cy="${y + 4}" r="2" fill="#fff"/><circle cx="${x + 3}" cy="${y + 5}" r="1.3" fill="#fff"/>`,
  half: (x, y) => `<path d="M${x - 7} ${y} h14" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M${x - 6} ${y} q6 6 12 0" fill="${INK}"/>`,
  spiral: (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="#fff" stroke="${INK}" stroke-width="2"/><path d="M${x} ${y} m0 0 a2 2 0 1 1 3 -1 a4 4 0 1 1 -6 -3 a6.5 6.5 0 1 1 9 4" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`,
  line: (x, y) => `<path d="M${x - 7} ${y} h14" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
};
const MOUTH = {
  smile: '<path d="M-8 0 q8 9 16 0" fill="none" stroke="#6a503f" stroke-width="3" stroke-linecap="round"/>',
  open: '<path d="M-9 0 q9 19 18 0 z" fill="#C2334F" stroke="#6a503f" stroke-width="2.5" stroke-linejoin="round"/><path d="M-4 10 q4 -5 8 0 q-4 3 -8 0 z" fill="#FB8FA3"/>',
  grin: '<path d="M-12 -1 q12 16 24 0 z" fill="#fff" stroke="#6a503f" stroke-width="2.5" stroke-linejoin="round"/>',
  o: '<ellipse cx="0" cy="4" rx="5" ry="6.5" fill="#8a2a2a" stroke="#6a503f" stroke-width="2"/>',
  flat: '<path d="M-7 3 h14" stroke="#6a503f" stroke-width="3" stroke-linecap="round"/>',
  wavy: '<path d="M-10 3 q3 -6 6 0 t6 0 t6 0" fill="none" stroke="#6a503f" stroke-width="3" stroke-linecap="round"/>',
  pout: '<path d="M-7 6 q7 -8 14 0" fill="none" stroke="#6a503f" stroke-width="3" stroke-linecap="round"/>',
  shout: '<ellipse cx="0" cy="6" rx="13" ry="15" fill="#8a2a2a" stroke="#6a503f" stroke-width="2.5"/><ellipse cx="0" cy="14" rx="8" ry="5" fill="#FB8FA3"/>',
  cry: '<path d="M-9 8 q9 -12 18 0" fill="none" stroke="#6a503f" stroke-width="3" stroke-linecap="round"/>',
};
const BROW = {
  none: () => '',
  angry: (x, y, side) => `<path d="M${x - 8 * side} ${y - 12} L${x + 7 * side} ${y - 6}" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
  worry: (x, y, side) => `<path d="M${x + 8 * side} ${y - 13} L${x - 7 * side} ${y - 7}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
  up: (x, y) => `<path d="M${x - 7} ${y - 13} q7 -6 14 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
};

// 感情の飾り（頭まわりの汗・怒りマーク・涙・ほっぺ）。座標は頭の中心 (0,-112) が基準。
function extras(list) {
  const m = {
    sweat: '<path d="M44 -150 q-8 14 0 20 q8 -6 0 -20 z" fill="#8EC9F5" stroke="#4A90C8" stroke-width="2"/>',
    blush: '<ellipse cx="-30" cy="-98" rx="9" ry="5.5" fill="#FF8FA3" opacity="0.65"/><ellipse cx="30" cy="-98" rx="9" ry="5.5" fill="#FF8FA3" opacity="0.65"/>',
    anger: '<path d="M36 -156 l8 -4 M36 -156 l4 -8 M36 -156 l-4 -8 M36 -156 l-8 -4 M36 -156 l8 4 M36 -156 l-8 4" stroke="#D93B3B" stroke-width="3.5" stroke-linecap="round"/>',
    tear: '<path d="M-24 -104 q-8 14 0 24 M24 -104 q8 14 0 24" fill="none" stroke="#4A90C8" stroke-width="4" stroke-linecap="round"/><path d="M-24 -78 q-5 6 0 10 q5 -4 0 -10 z M24 -78 q-5 6 0 10 q5 -4 0 -10 z" fill="#8EC9F5"/>',
    pale: '<g stroke="#6B7A99" stroke-width="3" stroke-linecap="round"><path d="M-30 -158 v22 M-14 -162 v26 M2 -163 v28 M18 -162 v26 M34 -158 v22"/></g>',
    shine: '<path d="M44 -132 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill="#FFD54F"/>',
  };
  return (list || []).map((k) => m[k] || '').join('');
}

function face(e, o = {}) {
  const ex = o.ex || 17, ey = -112;
  const eye = EYE[e.eye || 'normal'];
  const brow = BROW[e.brow || 'none'];
  const mouth = MOUTH[e.mouth || 'smile'];
  return eye(-ex, ey) + eye(ex, ey) + brow(-ex, ey, 1) + brow(ex, ey, -1)
    + ((o.noBlush || (e.fx || []).includes('blush')) ? '' : '<ellipse cx="-31" cy="-98" rx="8" ry="5" fill="#FF8FA3" opacity="0.5"/><ellipse cx="31" cy="-98" rx="8" ry="5" fill="#FF8FA3" opacity="0.5"/>')
    + `<g transform="translate(0 ${o.mouthY || -90})">${mouth}</g>` + extras(e.fx);
}

// ---------- 腕の形 ----------
const ARMS = {
  down: { l: [-36, -30], r: [36, -30] },
  hold: { l: [-20, -52], r: [20, -52] },
  up: { l: [-46, -112], r: [46, -112] },
  upR: { l: [-36, -30], r: [48, -120] },
  point: { l: [-36, -30], r: [74, -88] },
  head: { l: [-36, -100], r: [36, -100] },
  hip: { l: [-40, -50], r: [40, -50] },
  cross: { l: [14, -52], r: [-14, -52] },
  wave: { l: [-36, -30], r: [54, -108] },
};

// ---------- キャラクター ----------
// 原点は足元の中央。頭の中心は (0,-112)。flip: true で左右反転（左向き）。
const SPECIES = {
  mochiko: {
    skin: '#fff', hand: '#fff', outfit: '#FFB3C7', bw: 28,
    behind: () => '<g stroke="#6a503f" stroke-width="3"><ellipse cx="22" cy="-166" rx="11" ry="34" fill="#fff" transform="rotate(8 22 -166)"/><ellipse cx="-24" cy="-160" rx="11" ry="33" fill="#fff" transform="rotate(-38 -24 -160)"/></g>'
      + '<ellipse cx="22" cy="-166" rx="5" ry="24" fill="#FFB6C8" transform="rotate(8 22 -166)"/><ellipse cx="-24" cy="-160" rx="5" ry="23" fill="#FFB6C8" transform="rotate(-38 -24 -160)"/>',
    head: '<ellipse cx="0" cy="-112" rx="47" ry="41" fill="#fff" stroke="#6a503f" stroke-width="3"/><path d="M-4 -102 h8 l-4 4 z" fill="#FF8FA3"/>',
    outfitExtra: '<path d="M-10 -78 l10 8 l10 -8 l-6 -4 h-8 z" fill="#FFD54F" stroke="#6a503f" stroke-width="2.5" stroke-linejoin="round"/><rect x="-6" y="-60" width="12" height="16" rx="3" fill="#fff" stroke="#6a503f" stroke-width="2"/>',
    face: { },
  },
  pen: {
    skin: '#4C628F', hand: '#4C628F', outfit: '#4C628F', bw: 28,
    behind: () => '',
    head: '<ellipse cx="0" cy="-112" rx="47" ry="41" fill="#4C628F" stroke="#6a503f" stroke-width="3"/><ellipse cx="0" cy="-104" rx="35" ry="28" fill="#fff"/><ellipse cx="0" cy="-99" rx="9" ry="5.5" fill="#FF9F43" stroke="#6a503f" stroke-width="2"/>'
      + '<g fill="none" stroke="#6a503f" stroke-width="3"><circle cx="-17" cy="-112" r="12.5"/><circle cx="17" cy="-112" r="12.5"/><path d="M-4.5 -113 h9"/></g>',
    outfitExtra: '<ellipse cx="0" cy="-48" rx="18" ry="26" fill="#fff"/><path d="M0 -76 l-6 8 l6 24 l6 -24 z" fill="#E4572E" stroke="#6a503f" stroke-width="2" stroke-linejoin="round"/>',
    feet: '#FF9F43', mouthY: -84, ex: 17, noBlush: true,
  },
  pochi: {
    skin: '#F6C98A', hand: '#F6C98A', outfit: '#9AD7A0', bw: 28,
    behind: () => '<path d="M26 -34 q40 -4 34 -40 q-6 -14 -16 -8" fill="none" stroke="#6a503f" stroke-width="15" stroke-linecap="round"/><path d="M26 -34 q40 -4 34 -40 q-6 -14 -16 -8" fill="none" stroke="#F6C98A" stroke-width="9" stroke-linecap="round"/>'
      + '<path d="M-52 -128 L-38 -170 L-14 -148 z M52 -128 L38 -170 L14 -148 z" fill="#F6C98A" stroke="#6a503f" stroke-width="3" stroke-linejoin="round"/><path d="M-42 -136 L-37 -158 L-24 -146 z M42 -136 L37 -158 L24 -146 z" fill="#FFB6C8"/>',
    head: '<ellipse cx="0" cy="-112" rx="49" ry="41" fill="#F6C98A" stroke="#6a503f" stroke-width="3"/><path d="M-46 -104 q10 36 46 36 q36 0 46 -36 q-14 18 -46 18 q-32 0 -46 -18 z" fill="#FFF3DC"/><ellipse cx="0" cy="-96" rx="22" ry="17" fill="#FFF3DC"/><ellipse cx="0" cy="-104" rx="6" ry="4" fill="#6a503f"/><ellipse cx="-17" cy="-128" rx="5" ry="3" fill="#FFF3DC"/><ellipse cx="17" cy="-128" rx="5" ry="3" fill="#FFF3DC"/>',
    outfitExtra: '<path d="M-10 -78 q10 14 20 0" fill="none" stroke="#fff" stroke-width="3"/><path d="M-4 -70 v14 M4 -70 v14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
    mouthY: -90,
  },
  bucho: {
    skin: '#C99B6D', hand: '#C99B6D', outfit: '#8FA6BF', bw: 33,
    behind: () => '<circle cx="-38" cy="-146" r="15" fill="#C99B6D" stroke="#6a503f" stroke-width="3"/><circle cx="38" cy="-146" r="15" fill="#C99B6D" stroke="#6a503f" stroke-width="3"/><circle cx="-38" cy="-146" r="7" fill="#EBCFB0"/><circle cx="38" cy="-146" r="7" fill="#EBCFB0"/>',
    head: '<ellipse cx="0" cy="-112" rx="50" ry="42" fill="#C99B6D" stroke="#6a503f" stroke-width="3"/><ellipse cx="0" cy="-94" rx="23" ry="18" fill="#F3DEC6"/><ellipse cx="0" cy="-102" rx="7" ry="5" fill="#6a503f"/>'
      + '<path d="M-28 -130 q11 -7 22 0 M6 -130 q11 -7 22 0" fill="none" stroke="#6a503f" stroke-width="6" stroke-linecap="round"/>',
    outfitExtra: '<path d="M-12 -78 l12 14 l12 -14 z" fill="#fff"/><path d="M0 -66 l-5 6 l5 22 l5 -22 z" fill="#FFD54F" stroke="#6a503f" stroke-width="2" stroke-linejoin="round"/>',
    mouthY: -90, ex: 18,
  },
};

function char(kind, o = {}) {
  const S = SPECIES[kind];
  const { x = 0, y = 0, s = 1, flip = false, expr = {}, arm = 'down' } = o;
  const a = typeof arm === 'string' ? ARMS[arm] : arm;
  const bw = S.bw;
  const sx = flip ? -s : s;
  const limb = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#6a503f" stroke-width="19" stroke-linecap="round"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="${S.outfit}" stroke-width="13" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="8.5" fill="${S.hand}" stroke="#6a503f" stroke-width="2.5"/>`;
  const feet = S.feet || (kind === 'bucho' ? '#7A6254' : S.skin);
  return `<g transform="translate(${x} ${y}) scale(${sx} ${s})">`
    + S.behind()
    + `<ellipse cx="-15" cy="-6" rx="14" ry="7" fill="${feet}" stroke="#6a503f" stroke-width="2.5"/><ellipse cx="15" cy="-6" rx="14" ry="7" fill="${feet}" stroke="#6a503f" stroke-width="2.5"/>`
    + `<rect x="${-bw}" y="-80" width="${bw * 2}" height="62" rx="24" fill="${S.outfit}" stroke="#6a503f" stroke-width="3"/>`
    + S.outfitExtra
    + limb(-bw + 4, -64, a.l[0], a.l[1]) + limb(bw - 4, -64, a.r[0], a.r[1])
    + S.head
    + face(expr, S)
    + '</g>';
}

// ---------- 小物 ----------
function star(x, y, r, fill = '#FFD54F') {
  return `<path d="M${x} ${y - r} l${r * 0.28} ${r * 0.72} l${r * 0.72} ${r * 0.28} l${-r * 0.72} ${r * 0.28} l${-r * 0.28} ${r * 0.72} l${-r * 0.28} ${-r * 0.72} l${-r * 0.72} ${-r * 0.28} l${r * 0.72} ${-r * 0.28} z" fill="${fill}" stroke="#6a503f" stroke-width="1.8" stroke-linejoin="round"/>`;
}

// 書類。lines は本文の行。rot は傾き。
function doc(x, y, w, h, o = {}) {
  const { title = [], lines = [], rot = 0, fill = '#fff' } = o;
  const cx = x + w / 2, cy = y + h / 2;
  let body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="#6a503f" stroke-width="3"/>`;
  title.forEach((l, i) => { body += T(cx, y + 22 + i * 18, l, { size: 13, fill: '#1e293b' }); });
  lines.forEach((l, i) => { body += T(x + 12, y + 30 + title.length * 18 + i * 20, l, { size: 13, anchor: 'start', fill: '#334155', bold: false }); });
  return `<g transform="rotate(${rot} ${cx} ${cy})">${body}</g>`;
}

// 壁掛け時計。h, m は時と分。label は時刻の文字。
function clock(x, y, h, m, label) {
  const ah = ((h % 12) + m / 60) * 30 - 90, am = m * 6 - 90;
  const p = (ang, len) => `${(x + Math.cos(ang * Math.PI / 180) * len).toFixed(1)} ${(y + Math.sin(ang * Math.PI / 180) * len).toFixed(1)}`;
  return `<circle cx="${x}" cy="${y}" r="19" fill="#fff" stroke="#6a503f" stroke-width="3"/>`
    + `<path d="M${x} ${y} L${p(ah, 10)}" stroke="#6a503f" stroke-width="3.5" stroke-linecap="round"/><path d="M${x} ${y} L${p(am, 14)}" stroke="#6a503f" stroke-width="2.5" stroke-linecap="round"/>`
    + `<circle cx="${x}" cy="${y}" r="2" fill="#6a503f"/>` + (label ? T(x, y + 36, label, { size: 13 }) : '');
}

// 吹き出し。tail はしっぽの先の座標。kind: say（ふつう）/ shout（叫び）/ think（もやもや）
function bubble(x, y, lines, tail, o = {}) {
  const kind = o.kind || 'say';
  const wOf = (s) => [...s].reduce((n, c) => n + (c.charCodeAt(0) < 256 ? 9 : 16), 0);
  const w = o.w || Math.max(...lines.map(wOf)) + 30;
  const h = lines.length * 22 + 16;
  const cx = x + w / 2;
  let shape;
  if (kind === 'shout') {
    const pts = [];
    const n = 20, rx = w / 2 + 12, ry = h / 2 + 10;
    for (let i = 0; i < n * 2; i++) {
      const ang = (Math.PI * i) / n, k = i % 2 ? 0.8 : 1.12;
      pts.push(`${(cx + Math.cos(ang) * rx * k).toFixed(1)},${(y + h / 2 + Math.sin(ang) * ry * k).toFixed(1)}`);
    }
    shape = `<polygon points="${pts.join(' ')}" fill="#FFF8D6" stroke="#6a503f" stroke-width="3" stroke-linejoin="round"/>`;
  } else {
    const bx = Math.min(Math.max(tail[0], x + 22), x + w - 22);
    const dash = kind === 'think' ? ' stroke-dasharray="6 5"' : '';
    shape = (tail ? `<polygon points="${bx - 9},${y + h - 2} ${bx + 9},${y + h - 2} ${tail[0]},${tail[1]}" fill="#fff" stroke="#6a503f" stroke-width="3" stroke-linejoin="round"/>` : '')
      + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="#6a503f" stroke-width="3"${dash}/>`
      + (tail ? `<path d="M${bx - 7} ${y + h} h14" stroke="#fff" stroke-width="5"/>` : '');
  }
  let txt = '';
  lines.forEach((l, i) => { txt += T(cx, y + 28 + i * 22, l, { size: 16 }); });
  return shape + txt;
}

// 効果音。文字に白いふちを付けて、背景の上でも読めるようにする。
function sfx(x, y, s, o = {}) {
  return T(x, y, s, { size: o.size || 28, fill: o.fill || '#E4572E', rot: o.rot || -6, stroke: '#fff', sw: 7 });
}

// コマ。(x,y) は左上、中身は (0,0) を左上とした座標で描く。はみ出しは枠で切る。
let panelId = 0;
function panel(x, y, w, h, o = {}, inner = '') {
  const id = `pc${++panelId}`;
  const { bg = '#FFF4E0', floorY = 250, floor = '#E8D5B5' } = o;
  return `<g transform="translate(${x} ${y})"><clipPath id="${id}"><rect width="${w}" height="${h}" rx="8"/></clipPath>`
    + `<g clip-path="url(#${id})"><rect width="${w}" height="${h}" fill="${bg}"/>`
    + (floorY < h ? `<rect y="${floorY}" width="${w}" height="${h - floorY}" fill="${floor}"/><path d="M0 ${floorY} H${w}" stroke="#6a503f" stroke-width="2" opacity="0.35"/>` : '')
    + inner + `</g><rect width="${w}" height="${h}" rx="8" fill="none" stroke="#6a503f" stroke-width="4"/></g>`;
}

// 1枚のマンガ。panels は panel() の戻り値の配列。W×H は viewBox。
function page({ W = 900, H, title, desc, heading, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FONT}">`
    + `<title>${esc(title)}</title><desc>${esc(desc)}</desc>`
    + `<rect width="${W}" height="${H}" fill="#fff"/>`
    + (heading ? T(W / 2, 34, heading, { size: 22, fill: '#1e293b' }) : '')
    + body + '</svg>\n';
}

function write(name, svg) {
  const dir = process.env.MANGA_OUT || path.join(__dirname, '..', '..', 'docs', 'images');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name + '.svg'), svg);
  console.log('wrote', path.join(dir, name + '.svg'));
}


// ---------- 縦書き・集中線 ----------
// 縦書きの文字。lines は列の配列で、先頭の列がいちばん右。(x,y) は右端の列の上端中央。
function tate(x, y, lines, size = 18, fill = '#1e293b') {
  const colW = size * 1.3, cell = size * 1.08;
  let out = '';
  lines.forEach((line, ci) => {
    const cx = x - ci * colW;
    [...line].forEach((c, i) => {
      const cy = y + i * cell + size * 0.5;
      const base = `font-size="${size}" font-weight="700" fill="${fill}" text-anchor="middle"`;
      if ('、。，．'.includes(c)) out += `<text x="${cx + size * 0.5}" y="${cy + size * 0.3 - size * 0.5}" ${base}>${esc(c)}</text>`;
      else if ('ー〜…―'.includes(c)) out += `<text x="${cx}" y="${cy + size * 0.35}" ${base} transform="rotate(90 ${cx} ${cy})">${esc(c)}</text>`;
      else out += `<text x="${cx}" y="${cy + size * 0.35}" ${base}>${esc(c)}</text>`;
    });
  });
  return out;
}

// 縦書きの吹き出し。(x,y) は左上。kind: say（ふつう）/ shout（叫び。ギザギザ）。tail は しっぽの先。
function vbubble(x, y, lines, o = {}) {
  const size = o.size || 18, kind = o.kind || 'say', tail = o.tail;
  const colW = size * 1.3, cell = size * 1.08;
  const n = Math.max(...lines.map((l) => [...l].length));
  const tw = lines.length * colW, th = n * cell;
  const pad = kind === 'shout' ? 26 : 16;
  const w = tw + pad * 2, h = th + pad * 2;
  const cx = x + w / 2, cy = y + h / 2;
  let shape;
  if (kind === 'shout') {
    const pts = [], k = 20, rx = w / 2 + 10, ry = h / 2 + 8;
    for (let i = 0; i < k * 2; i++) {
      const a = (Math.PI * i) / k, r = i % 2 ? 0.9 : 1.1;
      pts.push(`${(cx + Math.cos(a) * rx * r).toFixed(1)},${(cy + Math.sin(a) * ry * r).toFixed(1)}`);
    }
    shape = `<polygon points="${pts.join(' ')}" fill="#FFFBE8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  } else {
    const bx = tail ? Math.min(Math.max(tail[0], x + 16), x + w - 16) : cx;
    shape = (tail ? `<polygon points="${bx - 9},${y + h - 3} ${bx + 9},${y + h - 3} ${tail[0]},${tail[1]}" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` : '')
      + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w / 2, 24)}" fill="#fff" stroke="${INK}" stroke-width="3"/>`
      + (tail ? `<path d="M${bx - 7} ${y + h} h14" stroke="#fff" stroke-width="5"/>` : '');
  }
  return shape + tate(cx + (lines.length - 1) * colW / 2, cy - th / 2, lines, size);
}
// 縦書きの吹き出しの大きさ（余白つき）。置き場所を決めるときに使う。
function vbubbleSize(lines, kind = 'say', size = 18) {
  const n = Math.max(...lines.map((l) => [...l].length));
  const pad = kind === 'shout' ? 26 : 16;
  return { w: lines.length * size * 1.3 + pad * 2, h: n * size * 1.08 + pad * 2 };
}

// 集中線。(cx,cy) の中心を空けて、まわりから放射状に線を引く。w×h はコマの大きさ。
function rays(cx, cy, w, h, o = {}) {
  const { n = 70, inner = 120, color = '#1e293b', opacity = 1 } = o;
  const R = Math.hypot(w, h);
  let seed = o.seed || 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  let out = '';
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + rnd() * 0.05;
    const wd = 0.012 + rnd() * 0.03, r0 = inner * (0.85 + rnd() * 0.5);
    const p = (ang, r) => `${(cx + Math.cos(ang) * r).toFixed(1)},${(cy + Math.sin(ang) * r).toFixed(1)}`;
    out += `<polygon points="${p(a - wd, R)} ${p(a + wd, R)} ${p(a, r0)}" fill="${color}" opacity="${opacity}"/>`;
  }
  return out;
}

module.exports = { tate, vbubble, vbubbleSize, rays,  T, char, doc, clock, star, bubble, sfx, panel, page, write, INK };
