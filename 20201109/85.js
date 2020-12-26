// 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
//
//  matrix = [["1","0","1","0","0"],
//            ["1","0","1","1","1"],
//            ["1","1","1","1","1"],
//            ["1","0","0","1","0"]]
// 最大值为6

/**
 * @param {character[][]} matrix
 * @return {number}
 */
// 一行行扫描。以当前行的底边为x轴，值为1的单元格在y方向组成竖直柱子。
// 扫描当前行的柱子，计算从当前柱子左右延伸到哪个柱子，并计算延伸得出的矩形面积。
// 动态规划：用 heights, leftEdge, rightEdge 保存扫描得出的信息，用于后续的计算。
//
// 可参考leetcode84柱状图中的最大矩形

var maximalRectangle = function(matrix) {
  if (matrix.length === 0) return 0
  const ROWS = matrix.length, COLS = matrix[0].length
  let maxArea = 0
  // 当前行各个柱子的高度。填充0，
  // 因为如果 matrix[0] 有上一行，为了不改变输入数据 matrix，那么上一行的柱子高度应全部设为0。
  let heights = new Array(COLS).fill(0)
  // 下标：柱子的序号；值：从该柱子往左/右扫描，遇到的第一个高度小于它的柱子的序号。
  let leftEdge = new Array(COLS).fill(-1)
  let rightEdge = new Array(COLS).fill(COLS)
  for (let i = 0; i < ROWS; ++i) {
    const row = matrix[i]

    // 将 leftEdge 更新为当前行对应的值，顺便将 heights 更新为当前行对应的值。
    // jOfHeight0: 在当前柱子左边、尽可能靠近当前柱子的、高度为0的柱子的序号。
    let jOfHeight0 = -1
    for (let j = 0; j < COLS; ++j) {
      // 如果当前柱子高度为0
      if (row[j] === '0') {
        jOfHeight0 = j
        // 悬空的柱子无效。
        leftEdge[j] = -1
        heights[j] = 0
      }
      else {
        // 当前行的 leftEdge[j] ，要么是上一行的 leftEdge[j] ，要么是 jOfHeight0 ，看哪个更靠右
        leftEdge[j] = Math.max(leftEdge[j], jOfHeight0)
        heights[j] += 1
      }
    }

    // 同理，将 rightEdge 更新为当前行对应的值，顺便计算从当前柱子往左右扫描得出的矩形面积。
    // jOfHeight0: 在当前柱子右边、尽可能靠近当前柱子的、高度为0的柱子的序号。
    jOfHeight0 = COLS
    for (let j = COLS - 1; j >= 0; --j) {
      if (row[j] === '0') {
        jOfHeight0 = j
        rightEdge[j] = COLS
      } else {
        rightEdge[j] = Math.min(rightEdge[j], jOfHeight0)
      }

      maxArea = Math.max(maxArea, heights[j] * (rightEdge[j] - 1 - leftEdge[j]))
    }
  }
  return maxArea
};


