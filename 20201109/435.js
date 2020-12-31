// 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
//
// 注意:
//
//   可以认为区间的终点总是大于它的起点。
// 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
//
// 示例 1:
// 输入: [ [1,2], [2,3], [3,4], [1,3] ]
// 输出: 1
// 解释: 移除 [1,3] 后，剩下的区间没有重叠。
//
// 示例 2:
// 输入: [ [1,2], [1,2], [1,2] ]
// 输出: 2
// 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
//
// 示例 3:
// 输入: [ [1,2], [2,3] ]
// 输出: 0
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
  if (!intervals.length) {
    return 0;
  }
  // 按数组第二个值升序排列
  intervals.sort((a, b) => a[1] - b[1]);
  const n = intervals.length;
  let right = intervals[0][1];
  let ans = 1;
  for (let i = 1; i < n; ++i) {
    if (intervals[i][0] >= right) {
      ++ans;
      right = intervals[i][1];
    }
  }
  return n - ans;
};
// test
console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));
