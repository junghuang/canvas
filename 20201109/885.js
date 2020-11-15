/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var spiralMatrixIII = function (R, C, r0, c0) {

  // 通过map创建二维数组，fill（0）数组初始化
  const res = []
  let tot = R * C
  let cnt = 1

  let x = r0, y = c0
  const dx = [0, 1, 0, -1]
  const dy = [1, 0, -1, 0]

  function write(i, j) {
    if (i >= 0 && j >= 0 && i <= R - 1 && j <= C - 1) {
      res.push([i,j])
      tot--
    }
  }

  write(r0, c0)
  let d = 0
  while (tot) {
    let len = Math.ceil((cnt - 1) / 2) + 1
    for (let i = 1; i <= len; i++) {
      x += dx[d]
      y += dy[d]
      write(x, y)
    }
    d = (d + 1) % 4
    cnt++
  }

  return res
};
// [ [1, 4], [1, 5], [2, 5], [2, 4], [2, 3], [1, 3],
//   [0, 3], [0, 4], [0, 5], [3, 5], [3, 4], [3, 3],
//   [3, 2], [2, 2], [1, 2], [0, 2], [4, 5], [4, 4],
//   [4, 3], [4, 2], [4, 1], [3, 1], [2, 1], [1, 1],
//   [0, 1], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]]


// console.log(spiralMatrixIII(5, 6, 1, 4));
console.log(spiralMatrixIII(1, 4, 0, 1));