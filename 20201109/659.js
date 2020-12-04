// 给你一个按升序排序的整数数组 num（可能包含重复数字），请你将它们分割成一个或多个子序列，其中每个子序列都由连续整数组成且长度至少为 3 。
//
// 如果可以完成上述分割，则返回 true ；否则，返回 false 。
//
//
//
// 示例 1：
// 输入: [1,2,3,3,4,5]
// 输出: True
// 解释:
//   你可以分割出这样两个连续子序列 :
//     1, 2, 3
//     3, 4, 5
//
//
// 示例 2：
// 输入: [1,2,3,3,4,4,5,5]
// 输出: True
// 解释:
//   你可以分割出这样两个连续子序列 :
//     1, 2, 3, 4, 5
//     3, 4, 5
//
//
// 示例 3：
// 输入: [1,2,3,4,4,5]
// 输出: False
//

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function(nums) {
  let count = {}, tail = {}
  for(let num of nums){
    // 这个写法很简洁
    count[num] =  (count[num] || 0) + 1
  }
  for(let i = 0; i < nums.length ; i++){
    let num = nums[i]
    // 当前数字已用完
    if(!count[num]) continue
    // 前面有一个长串 想啥呢 赶紧上车
    if(tail[num-1]){
      count[num]--
      tail[num-1]--
      tail[num] = (tail[num] || 0) + 1
      // 前面没有，自创门派
    }else if(count[num] && count[num+1] && count[num+2]){
      count[num]--
      count[num+1]--
      count[num+2]--
      tail[num+2] = (tail[num+2] || 0) + 1
    }else {
      return false
    }
  }
  return true
};

const arr = [1,2,3,4,4,5]
console.log(isPossible(arr));
