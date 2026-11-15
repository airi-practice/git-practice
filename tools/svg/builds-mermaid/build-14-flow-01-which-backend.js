// 14-flow-01-which-backend: 画面からの POST /api/reverse を、どちらのバックエンドが受け付けるかの分かれ道
const { L, nb, hex, finish } = require('./_helper-14');
const y = 20;
const body = `
  ${nb({ x: 20, y: y + 55, w: 190, h: 80, color: 'blue', lines: ['画面（frontend）', 'POST /api/reverse を送る'] })}
  ${hex({ x: 250, y: y + 40, w: 210, h: 110, color: 'gray', lines: ['どちらのバックエンドが', '8080番で動いているか'] })}
  ${nb({ x: 640, y, w: 240, h: 80, color: 'green', lines: ['backend/', 'ReverseApi.java が受け付ける'] })}
  ${nb({ x: 640, y: y + 170, w: 240, h: 80, color: 'green', lines: ['backend_spring/', 'ReverseController.java が受け付ける'] })}
  ${L.arrow({ x1: 214, y1: y + 95, x2: 244, y2: y + 95, color: 'blue' })}
  ${L.arrow({ x1: 458, y1: y + 85, x2: 632, y2: y + 44, color: 'gray' })}
  ${L.arrow({ x1: 458, y1: y + 105, x2: 632, y2: y + 206, color: 'gray' })}
  ${L.pill({ cx: 545, y: y + 49, w: 160, label: '第10章で作った版', color: 'gray' })}
  ${L.pill({ cx: 545, y: y + 125, w: 150, label: 'この章で作る版', color: 'gray' })}`;
finish('14-flow-01-which-backend', y + 250,
  '画面が POST /api/reverse を送ると、8080番で動いているバックエンドによって、backend/ の ReverseApi.java か backend_spring/ の ReverseController.java が受け付けることを示した図',
  '画面（frontend）が POST /api/reverse を送る。どちらのバックエンドが8080番で動いているかで分かれる。第10章で作った版なら backend/ の ReverseApi.java が受け付け、この章で作る版なら backend_spring/ の ReverseController.java が受け付ける。',
  body);
