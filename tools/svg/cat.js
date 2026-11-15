// 案内役の猫（二頭身の茶トラ猫）を描く。pose は wave（手を振る）/ think（頬に手を当てる）/ jump（両手を上げて跳ぶ）。
// 猫の見た目を図ごとにずらさないよう、描き方をここ1か所にまとめている。座標は元の絵の大きさ（足元が y=550 付近）。
function catSVG(pose) {
  const FUR = '#F2A04A', CREAM = '#FFF1DC';
  const tails = {
    wave: ['M142 534 C190 540 200 490 180 468', 180, 468],
    think: ['M142 534 C190 536 196 502 176 490', 176, 490],
    jump: ['M140 520 C182 520 194 478 172 456', 172, 456],
  }[pose];
  const lift = pose === 'jump' ? -14 : 0;
  const eyes = {
    wave: '<ellipse cx="82" cy="452" rx="12" ry="15" fill="#1E293B"/><ellipse cx="138" cy="452" rx="12" ry="15" fill="#1E293B"/><circle cx="86" cy="446" r="5" fill="#fff"/><circle cx="142" cy="446" r="5" fill="#fff"/><circle cx="78" cy="459" r="2.4" fill="#fff"/><circle cx="134" cy="459" r="2.4" fill="#fff"/>',
    think: '<ellipse cx="82" cy="452" rx="12" ry="15" fill="#1E293B"/><ellipse cx="138" cy="452" rx="12" ry="15" fill="#1E293B"/><circle cx="88" cy="443" r="5.5" fill="#fff"/><circle cx="144" cy="443" r="5.5" fill="#fff"/><circle cx="80" cy="457" r="2.4" fill="#fff"/><circle cx="136" cy="457" r="2.4" fill="#fff"/>',
    jump: '<path d="M69 456 q13 -18 26 0 M125 456 q13 -18 26 0" fill="none" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round"/>',
  }[pose];
  const mouth = pose === 'jump'
    ? '<path d="M98 473 q12 20 24 0 z" fill="#C2334F" stroke="#C2334F" stroke-width="2" stroke-linejoin="round"/><path d="M104 482 q6 6 12 0 q-6 -5 -12 0 z" fill="#FB8FA3"/>'
    : '<path d="M110 471 q-6 8 -12 1 M110 471 q6 8 12 1" fill="none" stroke="#7C4A1E" stroke-width="2.2" stroke-linecap="round"/>';
  const headRot = { wave: -5, think: -9, jump: 5 }[pose];
  const arm = (x1, y1, x2, y2) => '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="' + FUR + '" stroke-width="17" stroke-linecap="round"/><circle cx="' + x2 + '" cy="' + y2 + '" r="9.5" fill="' + CREAM + '"/>';
  let arms = '', pawFront = '';
  if (pose === 'wave') arms = arm(82, 512, 76, 534) + arm(138, 504, 170, 470);
  if (pose === 'think') { arms = arm(82, 512, 76, 534); pawFront = arm(138, 510, 132, 484); }
  if (pose === 'jump') arms = arm(82, 504, 54, 464) + arm(138, 504, 166, 464);
  const fy = pose === 'jump' ? 548 : 545;
  const feet = '<ellipse cx="92" cy="' + fy + '" rx="13" ry="7" fill="' + CREAM + '"/><ellipse cx="128" cy="' + fy + '" rx="13" ry="7" fill="' + CREAM + '"/>';
  const head = '<g transform="rotate(' + headRot + ' 110 490)">'
    + '<path d="M60 432 L58 392 L98 410 z M160 432 L162 392 L122 410 z" fill="' + FUR + '" stroke="' + FUR + '" stroke-width="10" stroke-linejoin="round"/>'
    + '<path d="M68 420 L67 402 L86 410 z M152 420 L153 402 L134 410 z" fill="#F9A8B8" stroke="#F9A8B8" stroke-width="4" stroke-linejoin="round"/>'
    + '<path d="M50 466 l-11 3 l10 7 z M170 466 l11 3 l-10 7 z" fill="' + FUR + '" stroke="' + FUR + '" stroke-width="3" stroke-linejoin="round"/>'
    + '<ellipse cx="110" cy="452" rx="62" ry="52" fill="' + FUR + '"/>'
    + '<ellipse cx="110" cy="468" rx="30" ry="22" fill="' + CREAM + '"/>'
    + '<path d="M110 402 v13 M95 405 l3 11 M125 405 l-3 11" fill="none" stroke="#D9822B" stroke-width="4" stroke-linecap="round"/>'
    + '<ellipse cx="68" cy="474" rx="12" ry="7.5" fill="#FB8FA3" opacity="0.7"/><ellipse cx="152" cy="474" rx="12" ry="7.5" fill="#FB8FA3" opacity="0.7"/>'
    + '<path d="M62 472 l4 6 M69 471 l4 6 M147 471 l4 6 M154 472 l4 6" stroke="#F0708A" stroke-width="1.6" stroke-linecap="round"/>'
    + eyes
    + '<path d="M105 466 h10 l-5 5 z" fill="#F9768B" stroke="#F9768B" stroke-width="2" stroke-linejoin="round"/>'
    + mouth
    + '<g stroke="#7C4A1E" stroke-width="1.8" stroke-linecap="round" opacity="0.55"><path d="M60 464 l-12 -3 M60 470 l-12 3 M160 464 l12 -3 M160 470 l12 3"/></g>'
    + '</g>';
  return '<ellipse cx="110" cy="550" rx="' + (pose === 'jump' ? 38 : 48) + '" ry="6" fill="#1E293B" opacity="0.15"/>'
    + '<g transform="translate(0 ' + lift + ')">'
    + '<path d="' + tails[0] + '" fill="none" stroke="#E08A3C" stroke-width="15" stroke-linecap="round"/><circle cx="' + tails[1] + '" cy="' + tails[2] + '" r="8" fill="' + CREAM + '"/>'
    + '<ellipse cx="110" cy="518" rx="36" ry="32" fill="' + FUR + '"/><ellipse cx="110" cy="524" rx="20" ry="22" fill="' + CREAM + '"/>'
    + feet + arms + head
    + '<path d="M80 497 q30 16 60 0" fill="none" stroke="#EF4444" stroke-width="8" stroke-linecap="round"/>'
    + '<circle cx="110" cy="507" r="6" fill="#FBBF24" stroke="#D99A06" stroke-width="1.5"/><path d="M110 510 v3" stroke="#D99A06" stroke-width="2" stroke-linecap="round"/>'
    + pawFront + '</g>';
}

module.exports = { catSVG };
