// 在一个 N x N 的坐标方格grid 中，每一个方格的值 grid[i][j] 表示在位置 (i,j) 的平台高度。
//
// 现在开始下雨了。当时间为t时，此时雨水导致水池中任意位置的水位为t。你可以从一个平台游向四周相邻的任意一个平台，
// 但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。
// 当然，在你游泳的时候你必须待在坐标方格里面。
//
// 你从坐标方格的左上平台 (0，0) 出发。最少耗时多久你才能到达坐标方格的右下平台(N-1, N-1)？


/**
 *
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  let n = grid.length;
  let low = grid[0][0];
  let high = n * n; // 条件限制了grid[i][j] 位于区间 [0, ..., N*N - 1] 内

  function dfs(row, col, t, visited) {
    // 越界 或 已访问过 或 不可达
    if (row < 0 || col < 0 || row >= n || col >= n || visited[row][col] || grid[row][col] > t) {
      return false;
    }
    if (row == n - 1 && col == n - 1) {
      return true;
    }
    visited[row][col] = 1;
    // 该位置的上 下 左 右 四个方向进行遍历
    return dfs(row + 1, col, t, visited) || dfs(row - 1, col, t, visited) || dfs(row, col + 1, t, visited) || dfs(row, col - 1, t, visited);
  }

  while (low < high) {
    let mid = (low + high) >> 1;
    let visited = Array.from({length: n}, () => Array(n).fill(0));
    if (!dfs(0, 0, mid, visited)) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
};

