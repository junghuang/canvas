// 对于非负整数X而言，X的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果X = 1231，那么其数组形式为[1,2,3,1]。
//
// 给定非负整数 X 的数组形式A，返回整数X+K的数组形式。
//
//
// 示例 1：
//
// 输入：A = [1,2,0,0], K = 34
// 输出：[1,2,3,4]
// 解释：1200 + 34 = 1234
// 示例 2：
//
// 输入：A = [2,7,4], K = 181
// 输出：[4,5,5]
// 解释：274 + 181 = 455
// 示例 3：
//
// 输入：A = [2,1,5], K = 806
// 输出：[1,0,2,1]
// 解释：215 + 806 = 1021
// 示例 4：
//
// 输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
// 输出：[1,0,0,0,0,0,0,0,0,0,0]
// 解释：9999999999 + 1 = 10000000000
//

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */

// 他解1
var addToArrayForm = function(A, K) {
  let i = A.length - 1
  let res = []
  while (i >= 0 || K){
    K += (A[i] || 0)
    res.push( K % 10 )
    K = K / 10 | 0
    i--
  }
  return res.reverse()
};

// 太复杂了没有算法的思想
// var addToArrayForm = function(A, K) {
//   let t = K
//   const ta = []
//   const res = []
//   while(t) {
//     ta.push(t%10)
//     t = Math.floor(t / 10)
//   }
//   let c = Math.max(ta.length,A.length)
//   A = A.reverse()
//   let k = 0
//   for(let i = 0; i <= c; i++) {
//     let x = ta[i] == undefined ? 0 : ta[i]
//     let y = A[i] == undefined ? 0 : A[i]
//     let a = k + x + y
//     if(a >= 10) {
//       k = 1
//     }else {
//       k = 0
//     }
//     if(i == c && a == 0) break
//     res.unshift(a%10)
//   }
//   return res
// };
