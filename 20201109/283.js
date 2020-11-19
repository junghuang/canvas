// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
//
// 示例:
//
//   输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 说明:
//
//   必须在原数组上操作，不能拷贝额外的数组。
// 尽量减少操作次数。
//
//


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */


var moveZeroes = function(nums) {
  let count = 0
  for(let i = 0;i<nums.length;i++){
    count++
    if(!nums[i]){
      let a = nums.splice(i,1)[0]
      nums.push(a)
      i--
    }

    if(count === nums.length){
      break
    }
  }
};

// 巧
// var moveZeroes = function(nums) {
//     nums.sort((a,b) => b? 0: -1)
// };
