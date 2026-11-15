// 13-flow-02-add-api-files: 反転 API を追加するときに作るファイルの比較図（Mermaid の flowchart LR を置き換えたもの）
// 色は状態を表す: 新しく作る=緑、既存のファイルを変更する=黄、変更しない=灰（矢印はない図）
const M = require('./mm');
const { node, frame } = M;

const GAP = 26, Y0 = 56, W = 394;
const stack = (x, specs) => {
  let y = Y0;
  return specs.map(([color, lines]) => {
    const n = node({ x, y, w: W, color, lines });
    y = n.b + GAP;
    return n;
  });
};
const bs = stack(28, [
  ['green', ['hm|api/ReverseApi.java', 'n|リクエストを受け付けて処理する']],
  ['green', ['hm|dto/ReverseRequest.java', 'hm|dto/ReverseResponse.java', 'n|JSON の形']],
  ['yellow', ['h|App.java（既存）', 'n|import と1行を足す']],
]);
const ss = stack(478, [
  ['green', ['hm|controller/ReverseController.java', 'n|リクエストを受け付ける']],
  ['green', ['hm|service/ReverseService.java', 'n|処理の中身']],
  ['green', ['hm|dto/ReverseRequest.java', 'hm|dto/ReverseResponse.java', 'n|JSON の形']],
  ['gray', ['h|既存のファイルへの変更はない', 'n|Spring Boot が自動で見つける']],
]);
const bottom = Math.max(...bs.map((n) => n.b), ...ss.map((n) => n.b)) + 16;
const frames = frame({ x: 10, y: 10, w: 430, h: bottom - 10, color: 'gray', label: 'backend/（第10章）' }) + '\n  ' +
  frame({ x: 460, y: 10, w: 430, h: bottom - 10, color: 'gray', label: 'backend_spring/（第14章）' });

const body = frames + '\n' + [...bs, ...ss].map((n) => n.svg).join('\n');
M.finish('13-flow-02-add-api-files', {
  title: '反転 API を追加するときに作るファイルの比較。緑が新しく作るファイル、黄が既存のファイルへの変更、灰が変更しないもの',
  desc: 'backend/（第10章）では、api/ReverseApi.java、dto/ReverseRequest.java、dto/ReverseResponse.java を新しく作り、既存の App.java に import と1行を足す。backend_spring/（第14章）では、controller/ReverseController.java、service/ReverseService.java、dto/ReverseRequest.java、dto/ReverseResponse.java を新しく作り、既存のファイルへの変更はない。Spring Boot が自動で見つける。',
  body,
  bottom,
});
