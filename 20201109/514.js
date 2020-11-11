// 视频游戏“辐射4”中，任务“通向自由”要求玩家到达名为“Freedom Trail Ring”的金属表盘，并使用表盘拼写特定关键词才能开门。
//
// 给定一个字符串 ring，表示刻在外环上的编码；给定另一个字符串 key，表示需要拼写的关键词。您需要算出能够拼写关键词中所有字符的最少步数。
//
// 最初，ring 的第一个字符与12:00方向对齐。您需要顺时针或逆时针旋转 ring 以使 key 的一个字符在 12:00 方向对齐，然后按下中心按钮，以此逐个拼写完 key 中的所有字符。
//
// 旋转 ring 拼出 key 字符 key[i] 的阶段中：
//
// 您可以将 ring 顺时针或逆时针旋转一个位置，计为1步。旋转的最终目的是将字符串 ring 的一个字符与 12:00 方向对齐，并且这个字符必须等于字符 key[i] 。
// 如果字符 key[i] 已经对齐到12:00方向，您需要按下中心按钮进行拼写，这也将算作 1 步。按完之后，您可以开始拼写 key 的下一个字符（下一阶段）, 直至完成所有拼写。
//

// 动态规划。核心思想就是遍历key中字符在ring中的位置，拼写第i个字符的耗时一定是上一个字符（即i-1）的耗时加上两个字符间的
// （距离最近的）位置差，而上一个字符在ring中可能出现多次，因此遍历的过程需要记录所有i-1字符出现的位置以及其耗时。
// 遍历只涉及第i个字符和第i-1个字符的情况，可以利用滚动数组。
// 贪心的思路是每次取最优解，即每一次耗时记为i-1到i的最小距离，不能保证最终结果最优，不考虑
// bfs/dfs



var findRotateSteps = function (ring, key) {
    let prevDp = [];
    let curDp = [];
    let temp = { sum: Infinity, index: 0 };
    for (let i = 0; i < key.length; i++) {
        prevDp = [...curDp];
        curDp = [];
        for (let j = 0; j < ring.length; j++) {
            if (key[i] === ring[j]) {
                if (i === 0) {
                    curDp.push({ sum: Math.min(j, ring.length - j) + 1, index: j });
                    continue;
                }
                temp = { sum: Infinity, index: j };
                prevDp.forEach(element => {
                    temp.sum = Math.min(
                        temp.sum,
                        element.sum +
                        Math.min(
                            Math.abs(element.index - j),
                            ring.length - Math.abs(element.index - j)
                        ) +
                        1
                    );
                });
                curDp.push(temp);
            }
        }
    }
    curDp.sort((a,b)=>{
        return a.sum-b.sum
    })
    return curDp[0].sum;
};
