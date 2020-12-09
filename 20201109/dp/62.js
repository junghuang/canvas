// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
//
// 问总共有多少条不同的路径？

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

var uniquePaths = function (m, n) {
  const dp = new Array(m).fill(new Array(n).fill(1))
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
    }
  }
  return dp[m - 1][n - 1]
}

// 降维
// var uniquePaths = function(m, n) {
//     const dp = Array(n).fill(1)
//     for (let i = 1; i < m; i++) {
//         for (let j = 1; j < n; j++) {
//             dp[j] = dp[j] + dp[j - 1]
//         }
//     }
//     return dp[n - 1]
// }


// 超时
// var uniquePaths = function(m, n) {
//   function split(row,col) {
//     if(row === 1 || col === 1) return 1
//     return split(row - 1, col) + split(row, col - 1)
//   }
//   return split(m,n)
// };

// 从[0][0]到[m][n]过程中，需要移动 m+n−2 次，其中有 m−1 次向下移动，n−1 次向右移动
//
// 因此路径的总数，就等于从 m+n−2 次移动中选择 m−1 次向下移动的方案数，即组合数：

// 组合法
var uniquePaths = function (m, n) {
  var N = n + m - 2;
  var k = m - 1;
  var result = 1;
  for (var i = 1; i <= k; i++) {
    result = result * (N - k + i) / i;
  }
  return result;
};


