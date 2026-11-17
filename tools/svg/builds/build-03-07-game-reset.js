// 03章 §4: Reset(過去の時点に戻す)を、「古いセーブを選ぶと、新しいセーブデータが使えなくなる」ことにたとえる図。
const { threeCols, make } = require('../game-lib');
make({
  name: '03-07-game-reset',
  title: 'ゲームで古いセーブを選ぶと、それより新しいセーブデータが使えなくなる。Git の Reset も、選んだ記録より後の記録が履歴から見えなくなる図',
  desc: '3つのセーブが古い順に並ぶ。1 セーブ1を選ぶ（Git では戻したい記録を選ぶ）。2 セーブ2は使えなくなる（Git ではその記録が履歴から見えなくなる）。3 セーブ3も使えなくなる（Git ではその記録も履歴から見えなくなる）。選んだものより新しいセーブデータが使えなくなる、危険な操作である。',
  pose: 'think',
  lines: ['Reset は、選んだ記録より後の', '記録が見えなくなる操作だよ。', 'あとから取り出せなくなることがあるんだ。'],
  body: threeCols({
    title: '古いセーブを選ぶと、新しいセーブデータが使えなくなる',
    cols: [
      { title: 'セーブ1', color: 'yellow', screen: { stage: 2, coins: 3, pos: 0.4 }, l1: 'この古いセーブを選ぶ', l2: 'ステージ2・コイン3', git: ['戻したい記録を選ぶ', '(Reset)'] },
      { title: 'セーブ2', color: 'gray', screen: { stage: 3, coins: 5, pos: 0.7, state: 'dim', dashed: true }, l1: '新しいセーブデータが', l2: '使えなくなる', git: ['それより後の記録が', '履歴から見えなくなる'], gitColor: 'red' },
      { title: 'セーブ3', color: 'gray', screen: { stage: 4, coins: 8, pos: 0.85, state: 'dim', dashed: true }, l1: 'こちらも', l2: '使えなくなる', git: ['この記録も', '履歴から見えなくなる'], gitColor: 'red' },
    ],
    links: ['進めた', '進めた'],
  }),
});
