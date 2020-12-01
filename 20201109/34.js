// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
//
// 如果数组中不存在目标值 target，返回[-1, -1]。
//
// 进阶：
// 你可以设计并实现时间复杂度为O(log n)的算法解决此问题吗？
//
// 示例 1：
// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]

// 示例2：
// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]

// 示例3：
// 输入：nums = [], target = 0
// 输出：[-1,-1]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/**
 * 直观的思路肯定是从前往后遍历一遍。用两个变量记录第一次和最后一次遇见 target 的下标，但这个方法的时间复杂度为 O(n)O(n)，没有利用到数组升序排列的条件。

 由于数组已经排序，因此整个数组是单调递增的，我们可以利用二分法来加速查找的过程。

  考虑 target 开始和结束位置，其实我们要找的就是数组中「第一个等于 target 的位置」（记为 leftIdx）和「第一个大于 target 的位置减一」（记为rightIdx）。
 二分查找中，寻找 leftIdx 即为在数组中寻找第一个大于等于 target 的下标，寻找 rightIdx 即为在数组中寻找第一个大于 target 的下标，然后将下标减一。
 两者的判断条件不同，为了代码的复用，我们定义 binarySearch(nums, target, lower) 表示在nums 数组中二分查找target 的位置，
 如果lower 为true，则查找第一个大于等于 target 的下标，否则查找第一个大于 target 的下标。

 最后，因为 target 可能不存在数组中，因此我们需要重新校验我们得到的两个下标leftIdx 和 rightIdx，看是否符合条件，如果符合条件就返回 [[leftIdx,rightIdx]，
 不符合就返回 [-1,-1][−1,−1]

 */
const binarySearch = (nums, target, lower) => {
  let left = 0, right = nums.length - 1, ans = nums.length;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > target || (lower && nums[mid] >= target)) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }
  return ans;
}

var searchRange = function(nums, target) {
  let ans = [-1, -1];
  const leftIdx = binarySearch(nums, target, true);
  const rightIdx = binarySearch(nums, target, false) - 1;
  if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
    ans = [leftIdx, rightIdx];
  }
  return ans;
};


// var searchRange = function(nums, target) {
// return [nums.indexOf(target),nums.lastIndexOf(target)]
// };



// O(n)遍历
// var searchRange = function(nums, target) {
//   if(nums.length === 0) {
//     return [-1,-1]
//   }

//   let begin = null
//   let end = null

//   for(let i = 0; i < nums.length; i++) {
//     if(nums[i] === target) {
//       if(begin === null) begin = i
//       end = i
//     }
//   }
//   if(begin === null) return [-1,-1]
//   return [begin,end]
// };
