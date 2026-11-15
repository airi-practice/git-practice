// 14-flow-06-example-a-b: 例A（データベースを使わない）と例B（使う）の層の違い
const { L, nb, cyl, group, finish } = require('./_helper-14');
const NH = 64;
const body = `
  ${group({ x: 20, y: 20, w: 860, h: 130, color: 'gray', label: '例A：データベースを使わない' })}
  ${nb({ x: 50, y: 66, w: 250, h: NH, color: 'green', lines: ['ReverseController'] })}
  ${nb({ x: 360, y: 66, w: 250, h: NH, color: 'green', lines: ['ReverseService', '文字列を反転する'] })}
  ${L.arrow({ x1: 304, y1: 98, x2: 354, y2: 98, color: 'green' })}
  ${group({ x: 20, y: 180, w: 860, h: 140, color: 'gray', label: '例B：データベースを使う' })}
  ${nb({ x: 40, y: 226, w: 170, h: NH, color: 'green', lines: ['MemoController'] })}
  ${nb({ x: 270, y: 226, w: 170, h: NH, color: 'green', lines: ['MemoService'] })}
  ${nb({ x: 500, y: 226, w: 170, h: NH, color: 'green', lines: ['MemoRepository'] })}
  ${cyl({ x: 730, y: 220, w: 140, h: 76, color: 'orange', lines: ['memos テーブル'] })}
  ${L.arrow({ x1: 214, y1: 258, x2: 264, y2: 258, color: 'green' })}
  ${L.arrow({ x1: 444, y1: 258, x2: 494, y2: 258, color: 'green' })}
  ${L.arrow({ x1: 674, y1: 258, x2: 724, y2: 258, color: 'green' })}`;
finish('14-flow-06-example-a-b', 320,
  '例Aは ReverseController から ReverseService へ進んでデータベースを使わず、例Bは MemoController から MemoService、MemoRepository を通って memos テーブルへ進むことを比べた図',
  '例A：データベースを使わない。ReverseController から、文字列を反転する ReverseService へ進む。例B：データベースを使う。MemoController から MemoService、MemoRepository の順に進み、memos テーブルに届く。',
  body);
