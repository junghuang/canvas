// 给定一个非负整数 N，找出小于或等于N的最大的整数，同时这个整数需要满足其各个位数上的数字是单调递增。
//
// （当且仅当每个相邻位数上的数字x和y满足x <= y时，我们称这个整数是单调递增的。）
//
// 示例 1:
// 输入: N = 10
// 输出: 9
//
// 示例 2:
// 输入: N = 1234
// 输出: 1234
//
// 示例 3:
// 输入: N = 332
// 输出: 299
/**
 * @param {number} N
 * @return {number}
 */

var monotoneIncreasingDigits = function(N) {
  if (N < 10) return N
  let NArr = N.toString().split('')
  for (let i = NArr.length - 2; i > -1; i--) {
    if (NArr[i] > NArr[i + 1]) {
      NArr[i]--
      for (let j = i + 1; j < NArr.length; j++) {
        if (NArr[j] === 9) break
        NArr[j] = 9
      }
    }
  }
  return Number(NArr.join(''))
};


// 暴力超时
// var monotoneIncreasingDigits = function(N) {
//   function check (n) {
//     return n+"" === Array.from(""+n).sort((a,b)=>Number(a)-Number(b)).join("")
//   }
//   for(let i = N; i >= 0; i--) {
//     if(check(i)) return i
//   }
// };
