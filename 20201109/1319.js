// 用以太网线缆将n台计算机连接成一个网络，计算机的编号从0到n-1。线缆用connections表示，
// 其中connections[i] = [a, b]连接了计算机a和b。
//
// 网络中的任何一台计算机都可以通过网络直接或者间接访问同一个网络中其他任意一台计算机。
//
// 给你这个计算机网络的初始布线connections，你可以拔开任意两台直连计算机之间的线缆，并用它连接一对未直连的计算机。
// 请你计算并返回使所有计算机都连通所需的最少操作次数。如果不可能，则返回-1 。
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
  if (connections.length < n - 1) {
    return -1;
  }

  const uf = new UnionFind(n);
  for (const conn of connections) {
    uf.unite(conn[0], conn[1]);
  }

  return uf.setCount - 1;
};

// 并查集模板
class UnionFind {
  constructor (n) {
    this.parent = new Array(n).fill(0).map((element, index) => index);
    // size平衡性优化：记录每棵树的节点数
    this.size = new Array(n).fill(1);
    // 当前连通分量数目
    this.setCount = n;
  }

  findset (x) {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.findset(this.parent[x]);
    return this.parent[x];
  }

  unite (a, b) {
    let x = this.findset(a), y = this.findset(b);
    if (x === y) {
      return false;
    }
    // 平衡性优化：小树拼到大树下
    if (this.size[x] < this.size[y]) {
      [x, y] = [y, x];
    }
    this.parent[y] = x;
    this.size[x] += this.size[y];
    this.setCount -= 1;
    return true;
  }
}
