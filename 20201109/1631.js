// 你准备参加一场远足活动。给你一个二维rows x columns的地图heights，
// 其中heights[row][col]表示格子(row, col)的高度。一开始你在最左上角的格子(0, 0)，
// 且你希望去最右下角的格子(rows-1, columns-1)（注意下标从 0 开始编号）。你每次可以往 上，下，左，右
// 四个方向之一移动，你想要找到耗费 体力 最小的一条路径。
//
// 一条路径耗费的 体力值是路径上相邻格子之间 高度差绝对值的 最大值决定的。
//
// 请你返回从左上角走到右下角的最小体力消耗值。
/**
 * @param {number[][]} heights
 * @return {number}
 */
// 1 并查集
// 2 DFS
var minimumEffortPath = function(heights) {
  const w = heights.length, h = heights[0].length, d = [[1,0],[0,1],[-1,0],[0,-1]]
  let left = 0, right = 1000000
  function dfs(i, j, max, v) {
    if (i === w - 1 && j === h - 1) return true
    v[i][j] = 1
    for(const [dx, dy] of d) {
      const [x, y] = [i + dx, j + dy]
      if (x >= 0 && x < w && y >= 0 && y < h && !v[x][y]) {
        if (Math.abs(heights[x][y] - heights[i][j]) <= max) {
          if (dfs(x, y, max, v))  return true
        }
      }
    }
    return false
  }
  while(left < right) {
    let mid = (left + right) >> 1
    const v = Array.from({length: w}, () => Array(h).fill(0))
    if (!dfs(0, 0, mid, v)) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
};
