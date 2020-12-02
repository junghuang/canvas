// 给定长度分别为m和n的两个数组，其元素由0-9构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n)
// 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。
//
// 求满足该条件的最大数。结果返回一个表示该最大数的长度为k的数组。
//
// 说明: 请尽可能地优化你算法的时间和空间复杂度。
//
// 示例1:
// 输入:
//   nums1 = [3, 4, 6, 5]
//   nums2 = [9, 1, 2, 5, 8, 3]
//   k = 5
// 输出:
//   [9, 8, 6, 5, 3]
//
// 示例 2:
// 输入:
//   nums1 = [6, 7]
//   nums2 = [6, 0, 4]
//   k = 5
// 输出:
//   [6, 7, 6, 0, 4]
//
// 示例 3:
// 输入:
//   nums1 = [3, 9]
//   nums2 = [8, 9]
//   k = 3
// 输出:
//   [9, 8, 9]


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */

var maxNumber = function(nums1, nums2, k) {
  var result = [];

  // 初始化找出两个数组内从1到k的最大序列组合，缓存下来供后续组合使用
  var map1 = findMaxK(nums1, k);
  var map2 = findMaxK(nums2, k);

  // 合并两个数组，找出最大序列。两个数组的组合方式有多种，表示各有i和k-i个数
  var maxNum = 0;
  for (var i=0; i<=k; i++) {
    if (i <= nums1.length && k-i <= nums2.length) {
      var merge = mergeMax(map1[i], map2[k-i]);
      if (merge) {
        var num = merge.join('');
        if (num > maxNum) {
          maxNum = num;
          result = merge;
        }
      }
    }
  }

  // 将两个已知数组合并，通过比较字典序入栈的方式找出最大序列
  function mergeMax(a, b) {
    if (!a || !b) return a || b;
    var stack = [];
    while (a.length > 0 || b.length > 0) {
      if (a.length === 0) {
        stack.push(b.shift());
      } else if (b.length === 0) {
        stack.push(a.shift());
      } else {
        // 比较数组的字典序，大的先出
        if (b.join('') > a.join('')) {
          stack.push(b.shift());
        } else {
          stack.push(a.shift());
        }
      }
    }
    return stack;
  }

  // 找出一个数组的最大k位以内序列，包含从1到k个map项
  function findMaxK(nums, k) {
    var len = nums.length;
    var map = {};
    if (len > 0) {
      for (var i=1; i<=k; i++) {
        var stack = [nums[0]];
        for (var j=1; j<len; j++) {
          while (nums[j] > stack[stack.length-1] && len - j > i - stack.length) {
            stack.pop();
          }
          if (stack.length < i) stack.push(nums[j]);
        }
        map[i] = stack;
      }
    }
    return map;
  }

  return result;
};


// // 官方
// var maxNumber = function(nums1, nums2, k) {
//     const m = nums1.length, n = nums2.length;
//     const maxSubsequence = new Array(k).fill(0);
//     let start = Math.max(0, k - n), end = Math.min(k, m);
//     for (let i = start; i <= end; i++) {
//         const subsequence1 = new MaxSubsequence(nums1, i);
//         const subsequence2 = new MaxSubsequence(nums2, k - i);
//         const curMaxSubsequence = merge(subsequence1, subsequence2);
//         if (compare(curMaxSubsequence, 0, maxSubsequence, 0) > 0) {
//             maxSubsequence.splice(0, k, ...curMaxSubsequence);
//         }
//     }
//     return maxSubsequence;
// };

// var MaxSubsequence = function(nums, k) {
//     const length = nums.length;
//     const stack = new Array(k).fill(0);
//     let top = -1;
//     let remain = length - k;
//     for (let i = 0; i < length; i++) {
//         const num = nums[i];
//         while (top >= 0 && stack[top] < num && remain > 0) {
//             top--;
//             remain--;
//         }
//         if (top < k - 1) {
//             stack[++top] = num;
//         } else {
//             remain--;
//         }
//     }
//     return stack;
// }

// const merge = (subsequence1, subsequence2) => {
//     const x = subsequence1.length, y = subsequence2.length;
//     if (x === 0) {
//         return subsequence2;
//     }
//     if (y === 0) {
//         return subsequence1;
//     }
//     const mergeLength = x + y;
//     const merged = new Array(mergeLength).fill(0);
//     let index1 = 0, index2 = 0;
//     for (let i = 0; i < mergeLength; i++) {
//         if (compare(subsequence1, index1, subsequence2, index2) > 0) {
//             merged[i] = subsequence1[index1++];
//         } else {
//             merged[i] = subsequence2[index2++];
//         }
//     }
//     return merged;
// }

// const compare = (subsequence1, index1, subsequence2, index2) => {
//     const x = subsequence1.length, y = subsequence2.length;
//     while (index1 < x && index2 < y) {
//         const difference = subsequence1[index1] - subsequence2[index2];
//         if (difference !== 0) {
//             return difference;
//         }
//         index1++;
//         index2++;
//     }
//     return (x - index1) - (y - index2);
// }




// var maxNumber = function(nums1, nums2, k) {
//   function s (arr) {
//     return arr.map((num,index)=>{
//       return {
//         i: index,
//         v: num
//       }
//     }).sort((a,b)=>b.v-a.v)
//   }
//   nums1 = s(nums1)
//   nums2 = s(nums2)

//   const res = []
//   let count = 0
//   while(count < k) {
//     for(let i = 0; i < nums1.length; i++) {
//     for(let j = 0; j < nums2.length; j++) {
//       if(nums1[i].v>nums2[j].v) {
//         res.push(nums1[i])
//         nums1 = nums1.filter((num,index)=>{
//           return index > nums1[i].i
//         })
//       }
//     }
//   }
//   }
// };
