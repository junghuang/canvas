// 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，
// 那么城市 a 与城市 c 间接相连。
//
// 省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。
//
// 给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，
// 而 isConnected[i][j] = 0 表示二者不直接相连。
//
// 返回矩阵中 省份 的数量。

/**
 * @param {number[][]} M
 * @return {number}
 */

// 选定一个节点，开始深度优先搜索，将遍历到的节点标记为 visited，直到遍历结束，连通图数目加一
// 选取另外一个未遍历的节点，重复上述过程
// 直到所有节点都被遍历

// var findCircleNum = function(M) {
//   let n = M.length;
//   if(n == 0){
//     return 0;
//   }
//   let count = 0;
//   let dfs = (i) => {
//     for(let j = 0; j < n;j++){
//       if(M[i][j] == 1 && !visited[j]){
//         visited[j] = true;
//         dfs(j);
//       }
//     }
//   }
//   let visited = {};
//   for(let i = 0;i < n;i++){
//     if(!visited[i]){
//       dfs(i);
//       count++;
//     }
//   }
//   return count;
// };
// 并查集求强连通分量
// 初始时，强连通分量为 count = M.length
// MAKE-SET, 将每个节点的 parent 指向其本身
// FIND, 并查集常规搜索，添加路径压缩
// UNION(x, y)
// 如果(x, y)属于同一个子集，返回
// 如果(x, y)属于不同子集，将两个子集合并，count--
var findCircleNum = function (M) {
  let count = M.length;
  let parent = Array.from(M).map((item, index) => index);

  function find(x) {
    if (parent[x] === x) {
      return x;
    }
    return (parent[x] = find(parent[x]));
  }

  function union(x, y) {
    if (find(x) === find(y)) {
      return;
    }
    parent[parent[x]] = parent[y];
    count--;
  }

  for (let i = 0; i < M.length; i++) {
    for (let j = i + 1; j < M[i].length; j++) {
      if (M[i][j]) {
        union(i, j);
      }
    }
  }

  return count;
};

console.log(findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]));
