// 给定一个已排序的正整数数组 nums，和一个正整数n 。从[1, n]区间内选取任意个数字补充到nums中，
// 使得[1, n]区间内的任何数字都可以用nums中某几个数字的和来表示。请输出满足上述要求的最少需要补充的数字个数。
//
// 示例1:
//
// 输入: nums = [1,3], n = 6
// 输出: 1
// 解释:
//   根据 nums里现有的组合[1], [3], [1,3]，可以得1, 3, 4。
// 现在如果我们将2添加到nums 中，组合变为: [1], [2], [3], [1,3], [2,3], [1,2,3]。
// 其和可以表示数字1, 2, 3, 4, 5, 6，能够覆盖[1, 6]区间里所有的数。
// 所以我们最少需要添加一个数字。
//
// 示例 2:
// 输入: nums = [1,5,10], n = 20
// 输出: 2
// 解释: 我们需要添加[2, 4]。
//
// 示例3:
// 输入: nums = [1,2,2], n = 5
// 输出: 0

/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */

// 他解1
var minPatches = function(nums, n) {
  let patches = 0;
  let x = 1;
  let length = nums.length, index = 0;
  while (x <= n) {   // 能连续覆盖的重量还没到n，有两种情况：断码(缺砝码)，或者还有砝码没加
    if (index < length && nums[index] <= x) {
      x += nums[index];
      index++;
      //上面判断语句可能不好理解，若现有砝码1, 4, 6, n为10，当一次循环后砝码1已计入x,x=2，但是nums[1]=4>2;
      //这说明断码了，我们需要的是重量为x=2的砝码，所以加一个，现在能称的重量就能覆盖到原来的2倍=4了（不到4）
      //然后nums[1]=4就等于4，4的砝码我们刚好有，加进来，现在能称的重量就能覆盖到原来的2倍=8了（不到8）
      //然后nums[2]=6<8，这个不是必需的砝码，加进来，现在能称的重量就能覆盖到8+6=14了（不到14）
    } else {
      x *= 2;   //加一个现在刚好覆盖不到的重量的砝码，覆盖范围翻倍
      patches++; //计数+1
    }
  }
  return patches;
//所以再加1个重量为2的，我们就可以最大称到13.
}

// 官解
// var minPatches = function(nums, n) {
//   let patches = 0;
//   let x = 1;
//   const length = nums.length;
//   let index = 0;
//   while (x <= n) {
//     if (index < length && nums[index] <= x) {
//       x += nums[index];
//       index++;
//     } else {
//       x *= 2;
//       patches++;
//     }
//   }
//   return patches;
// };





