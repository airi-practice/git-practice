// 14-flow-05-files-relation: 例Aで追加・変更するファイルの関係（frontend と backend_spring）
const { L, C, nb, group, dashed, elbow, t, finish } = require('./_helper-14');
// frontend/src
const fy = 20, fh = 232;
const r1 = fy + 56, r2 = r1 + 90, NH = 56;
// backend_spring
const by = 330, br1 = by + 56, br2 = br1 + 90;
const bh = 232;
const body = `
  ${group({ x: 20, y: fy, w: 860, h: fh, color: 'blue', label: 'frontend/src', mono: true })}
  ${nb({ x: 40, y: r1, w: 190, h: NH, color: 'yellow', lines: ['App.tsx（変更）'] })}
  ${nb({ x: 280, y: r1, w: 270, h: NH, color: 'blue', lines: ['pages/ReversePage.tsx（新規）'] })}
  ${nb({ x: 600, y: r1, w: 240, h: NH, color: 'blue', lines: ['api/reverse.ts（新規）'] })}
  ${nb({ x: 295, y: r2, w: 240, h: NH, color: 'blue', lines: ['types/reverse.ts（新規）'] })}
  ${L.arrow({ x1: 234, y1: r1 + 28, x2: 274, y2: r1 + 28, color: 'blue', width: 5 })}
  ${L.arrow({ x1: 554, y1: r1 + 28, x2: 594, y2: r1 + 28, color: 'blue', width: 5 })}
  ${dashed({ x1: 415, y1: r1 + NH + 4, x2: 415, y2: r2 - 6, color: 'blue' })}
  ${group({ x: 20, y: by, w: 860, h: bh, color: 'green', label: 'backend_spring/src/main/java/jp/co/copel/training', mono: true })}
  ${nb({ x: 40, y: br1, w: 370, h: NH, color: 'green', lines: ['controller/ReverseController.java（新規）'] })}
  ${nb({ x: 470, y: br1, w: 370, h: NH, color: 'green', lines: ['service/ReverseService.java（新規）'] })}
  ${nb({ x: 40, y: br2, w: 480, h: NH, color: 'green', lines: ['dto/ReverseRequest.java と ReverseResponse.java（新規）'] })}
  ${L.arrow({ x1: 414, y1: br1 + 28, x2: 464, y2: br1 + 28, color: 'green', width: 5 })}
  ${dashed({ x1: 225, y1: br1 + NH + 4, x2: 225, y2: br2 - 6, color: 'green' })}
  ${elbow({ pts: [[720, r1 + NH + 4], [720, 291], [225, 291], [225, by - 4]], color: 'blue' })}
  ${L.pill({ cx: 470, y: 276, w: 190, label: 'POST /api/reverse', color: 'blue' })}`;
finish('14-flow-05-files-relation', by + bh,
  '例Aで追加・変更するファイルの関係を、frontend/src と backend_spring の2つの枠に分けて示した図。App.tsx から ReversePage.tsx、api/reverse.ts を通って、POST /api/reverse で ReverseController.java、ReverseService.java につながる',
  'frontend/src の中では、App.tsx（変更）が pages/ReversePage.tsx（新規）を使い、ReversePage.tsx が api/reverse.ts（新規）を使い、types/reverse.ts（新規）を点線で参照する。api/reverse.ts から POST /api/reverse で、backend_spring の controller/ReverseController.java（新規）に届く。ReverseController.java は service/ReverseService.java（新規）を使い、dto/ReverseRequest.java と ReverseResponse.java（新規）を点線で参照する。',
  body);
