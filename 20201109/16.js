// 给定一个包括n 个整数的数组nums和 一个目标值target。找出nums中的三个整数，使得它们的和与target最接近。返回这三个数的和。
// 假定每组输入只存在唯一答案。
//
// 示例：
// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 双指针
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let res = nums[0] + nums[1] + nums[2];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let left = i + 1, right = len - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      //比较谁距离target更接近采用减法比较差值
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum;
      }
      if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      } else {
        return res;
      }
    }
  }
  return res;
};
