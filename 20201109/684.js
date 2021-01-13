// 在本问题中, 树指的是一个连通且无环的无向图。
//
// 输入一个图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。
//
// 结果图是一个以边组成的二维数组。每一个边的元素是一对[u, v]，满足u < v，表示连接顶点u和v的无向图的边。
//
// 返回一条可以删去的边，使得结果图是一个有着N个节点的树。如果有多个答案，则返回二维数组中最后出现的边。答案边[u, v] 应满足相同的格式u < v
//
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
  let n = edges.length;
  let i = 0;
  // 初始化并查集
  let father = new Array(n + 1).fill(0).map(() => i++);
  let res = null

  // 返回 x 的根结点同时压缩 x 到其根结点的路径
  const findFather = (x) => {
    let x1 = x;
    // 寻找 x 的根结点，这里为了方便直接使用了 x 保存根结点
    while (x !== father[x]) {
      x = father[x];
    }

    // 路径压缩，将路径上的所有节点的父节点都设置为 x
    while (x1 !== father[x1]) {
      let temp = x1;
      x1 = father[x1];
      father[temp] = x;
    }

    return x;
  };

  // 节点合并
  const union = (a, b) => {
    let fa = findFather(a);
    let fb = findFather(b);

    // 若两个节点 a、b 的根结点相同，那么这条边就是会造成环的那条边，我们返回 false
    if (fa !== fb) {
      father[fb] = fa;
      return true;
    } else {
      return false;
    }
  };

  for (let [a, b] of edges) {
    if (!union(a, b)) {
      res = [a, b];
    }
  }

  return res;
};

