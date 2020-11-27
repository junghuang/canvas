// 给定四个包含整数的数组列表A , B , C , D ,计算有多少个元组 (i, j, k, l)，使得A[i] + B[j] + C[k] + D[l] = 0。
//
// 为了使问题简单化，所有的 A, B, C, D 具有相同的长度N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过231 - 1 。
//
// 例如:
//
//   输入:
//     A = [ 1, 2]
// B = [-2,-1]
// C = [-1, 2]
// D = [ 0, 2]
//
// 输出:
//   2
//
// 解释:
//   两个元组如下:
//     1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */

var fourSumCount = function(A,B,C,D){
  const map = new Map()
  const len = A.length
  for(let i = 0; i < len; i++){
    for(let j = 0; j < len; j++){
      let sum = A[i]+B[j]
      if(map.has(sum)){
        map.set(sum,map.get(sum)+1)
      }else{
        map.set(sum,1)
      }
    }
  }

  let count = 0
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len; j++) {
      let sum = -(C[i]+D[j])
      if(map.has(sum)){
        count += map.get(sum)
      }
    }
  }
  return count
}
// 超时
// var fourSumCount = function(A, B, C, D) {
//   let count = 0
//   let len = A.length
//   for(let i = 0; i < len; i++) {
//     for(let j = 0; j < len; j++) {
//       for(let k = 0; k < len; k++) {
//         for(let l = 0; l < len; l++) {
//           if(A[i]+B[j]+C[k]+D[l]===0){
//             count++
//           }
//         }
//       }
//     }
//   }
//   return count
// };

