// 给你一个points数组，表示 2D 平面上的一些点，其中points[i] = [xi, yi]。
//
// 连接点[xi, yi] 和点[xj, yj]的费用为它们之间的 曼哈顿距离：|xi - xj| + |yi - yj|，其中|val|表示val的绝对值。
//
// 请你返回将所有点连接的最小总费用。只有任意两点之间 有且仅有一条简单路径时，才认为所有点都已连接。
//
//
// 输入：points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
// 输出：20

/**
 * @param {number[][]} points
 * @return {number}
 */
// 他解1
var minCostConnectPoints = function(points) {
  //曼哈顿距离
  const dist = (x, y) => {
    return Math.abs(points[x][0] - points[y][0]) + Math.abs(points[x][1] - points[y][1]);
  }

  const n = points.length;
  const dsu = new DisjointSetUnion(n);
  const edges = []; //所有节点各两两连接的距离

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push([dist(i, j), i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]); //边排序

  let ret = 0, num = 1; //ret为总长度（结果）
  for (const [length, x, y] of edges) {
    if (dsu.unionSet(x, y)) {
      ret += length;
      num += 1;
      if (num === n) { //所有节点都有连接
        break;
      }
    }
  }
  return ret;
};
//并查集类
class DisjointSetUnion {
  constructor (n) {
    this.n = n;
    this.rank = new Array(n).fill(1); //以该节点为根的树有几层
    this.f = new Array(n).fill(0).map((element, index) => index); //parent
  }

  find (x) { //找父节点
    if (this.f[x] === x) {
      return x;
    }
    this.f[x] = this.find(this.f[x]);
    return this.f[x];
  }

  unionSet (x, y) { //合并
    let fx = this.find(x), fy = this.find(y);
    if (fx === fy) { //已连接，再连接就会形成环
      return false;
    }
    //基于rank优化的合并
    if (this.rank[fx] < this.rank[fy]) {
      [fx, fy] = [fy, fx];
    }
    this.rank[fx] += this.rank[fy];
    this.f[fy] = fx;
    return true;
  }
}
