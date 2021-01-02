// 给你一个整数数组 nums，有一个大小为k的滑动窗口从数组的最左侧移动到数组的最右侧。
// 你只可以看到在滑动窗口内的 k个数字。滑动窗口每次只向右移动一位。
//
// 返回滑动窗口中的最大值。
//
// 示例 1：
// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// 解释：
// 滑动窗口的位置                最大值
// ---------------             -----
//[1  3  -1] -3  5  3  6  7       3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7
//
// 示例 2：
// 输入：nums = [1], k = 1
// 输出：[1]
//
// 示例 3：
// 输入：nums = [1,-1], k = 1
// 输出：[1,-1]
//
// 示例 4：
// 输入：nums = [9,11], k = 2
// 输出：[11]
//
// 示例 5：
// 输入：nums = [4,-2], k = 2
// 输出：[4]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const deque=[]; //存放单调队列的下标
  const  result=[];
  for(let i=0;i<nums.length;i++){
    if(i-deque[0]>=k) deque.shift(); //在滑动窗口之外的直接从队头删掉
    while(nums[deque[deque.length-1]]<=nums[i]){
      deque.pop();  //如果新加进来的数比单调队列中原来的数都要大，则直接弹出队列中的其他数
    }
    deque.push(i);
    //数组下标从0开始，k=3时 ，下标为0，1，2的数组元素构成一个滑动窗口，所以条件为i>=k-1就可以将答案存入res中
    if(i>=k-1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
};


// 超时
// var maxSlidingWindow = function(nums, k) {
//   const res = []
//   for(let i = 0; i <= nums.length - k; i++) {
//     let arr = nums.slice(i,i+k)
//     res.push(Math.max(...arr))
//   }
//   return res
// };
