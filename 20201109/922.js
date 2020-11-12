// 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
//
// 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
//
// 你可以返回任何满足上述条件的数组作为答案。
//
//  
//
// 示例：
//
// 输入：[4,2,5,7]
// 输出：[4,5,2,7]
// 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。

/**
 * @param {number[]} A
 * @return {number[]}
 */

// 暴力
// var sortArrayByParityII = function(A) {
//   const a = [], b = [], res = [];
//   for(let i = 0; i < A.length; i++){
//     if(A[i] % 2 === 0){
//       a.push(A[i])
//     }else{
//       b.push(A[i])
//     }
//   }
//   a.sort((x,y)=>y-x)
//   b.sort((x,y)=>x-y)
//   for(let i = 0;i < a.length; i++){
//     res.push(a[i])
//     res.push(b[i])
//   }
//   return res;
// };


// 双指针 原地修改
var sortArrayByParityII = function (A) {
    let i = 0;
    let j = 1;
    while (i < A.length && j < A.length) {
        while (i < A.length && A[i] % 2 == 0) { // 偶数索引上是偶数
            i += 2;
        }
        while (j < A.length && A[j] % 2 == 1) { // 奇数索引上是奇数
            j += 2;
        }
        // 此时，A[i]是奇数， A[j]是偶数
        if (i < A.length && j < A.length) {
            [A[i], A[j]] = [A[j], A[i]];
            i += 2;
            j += 2;
        }
    }
    return A;
};


