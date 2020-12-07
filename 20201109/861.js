// 有一个二维矩阵A 其中每个元素的值为0或1。
//
// 移动是指选择任一行或列，并转换该行或列中的每一个值：将所有 0 都更改为 1，将所有 1 都更改为 0。
//
// 在做出任意次数的移动后，将该矩阵的每一行都按照二进制数来解释，矩阵的得分就是这些数字的总和。
//
// 返回尽可能高的分数。
//
// 示例：
//
// 输入：[[0,0,1,1],[1,0,1,0],[1,1,0,0]]
// 输出：39
// 解释：
// 转换为 [[1,1,1,1],[1,0,0,1],[1,1,1,1]]
// 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39


/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function(A) {
  // 一. 翻转 0 开头的行, 保证每行开头都是1
  A.forEach((t,i) => t[0] === 0 && (A[i] = revRow(t)) )

  // 二. 翻转 0 多于 1的 列
  for(let c = 1; c < A[0].length; c++){
    let total = 0
    for(let r = 0; r < A.length; r++){
      total += A[r][c]
    }
    if (total < A.length / 2) revColumn(A, c)
  }

  // 三. 计算总数
  return counts(A)
  /* ---------------工具------------------ */
  function revRow(list){         // 行翻转
    return list.map(t => t ^= 1)
  }
  function revColumn(matrix, c){ // 列翻转
    matrix.forEach(t => t[c] ^= 1)
    return matrix
  }
  // function btd (list) {          // 数组 二进制转十进制
  //     if (!list || !list.length) return list
  //     return Number('0b' + list.join(''))
  // }
  // function counts (matrix){      // 计算总数
  //     return matrix.reduce((a, b) => btd(a) + btd(b))
  // }
  function counts(matrix) {
    let res = 0
    for(let i = 0; i < matrix.length; i++) {
      res += +Number.parseInt(matrix[i].join(""), 2).toString(10)
    }
    return res
  }
};

