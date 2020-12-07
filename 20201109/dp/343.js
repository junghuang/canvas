// 给定一个正整数n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
//
// 示例 1:
// 输入: 2
// 输出: 1
// 解释: 2 = 1 + 1, 1 × 1 = 1。
//
// 示例2:
// 输入: 10
// 输出: 36
// 解释: 10 = 3 + 3 + 4, 3 ×3 ×4 = 36。
// 说明: 你可以假设n不小于 2 且不大于 58。

/**
 * @param {number} n
 * @return {number}
 */

//自底向上
var integerBreak = function(n) {
  const dp = new Array(n+1).fill(-1)
  dp[1] = 1
  for(let i = 2; i <= n; i++) {
    for(let j = 1; j < i; j++) {
      dp[i] = Math.max(dp[i], j * (i-j), j * dp[i - j])
    }
  }
  return dp[n]
}

// // 自顶向下
// var integerBreak = function(n) {
//   function tryBreak(n) {
//     if(n === 1) return 1
//     if(memo[n] !== -1) return memo[n]
//     let max = -1
//     for(let i = 1; i <= n; i++) {
//       max = Math.max(max, i*(n-i), i * tryBreak(n - i))
//     }
//     memo[n] = max
//     return max
//   }

//   const memo = new Array(n + 1).fill(-1)
//   return tryBreak(n)
// };
