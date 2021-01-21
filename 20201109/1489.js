/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */

// 他解1
var findCriticalAndPseudoCriticalEdges = function(n, edges) {
  // 思路，最小生成树（kruskal算法）
  // 1.记录边的初始索引号，再排序（因为返回的结果要用索引来标示边）
  // 2.首先使用kruskal算法算出最小生成树的权值和minCosts
  // 3.找关键边：去除某条边后跑kruskal算法，如果其最小生成树的权值和比minCosts大，或者不连通，那么这条边就是关键边
  // 4.找伪关键边：如果某条边不是关键边，那么如果将这条边一定包含在最小生成树里面后，其权值仍然和minCosts一样，则这条边就是伪关键边

  // 1.记录初始索引号，排序
  for(let i = 0; i < edges.length; i++) {
    edges[i].push(i);
  }
  edges.sort((a, b) => a[2] - b[2]);
  // 2.使用kruskal算法先算出minCosts
  let minCosts = MST(-1, false); // 这里用-1和false来标示不对任何一条边进行指示
  // 3.4.找关键边和伪关键边
  const ans = [[], []];
  for(let k = 0; k < edges.length; k++) {
    if(MST(k, false) > minCosts) ans[0].push(edges[k][3]); // 这条边是关键边，则加入边对应的初始索引号
    else if(MST(k, true) === minCosts) ans[1].push(edges[k][3]); // 这条边是伪关键边
  }

  // 定义kruskal算法
  function MST(k, hasK) { // k标示对第k条边进行操作，hasK标示是要包含第k条边还是要去除第k条边
    let cost = 0, count = 0;
    const unionFindSet = new UnionFind(n);
    // 如果一定要包含第k条边，则先加上
    if(hasK) {
      unionFindSet.union(edges[k][0], edges[k][1]);
      cost += edges[k][2];
      count++;
    }
    // 遍历排序后的边
    for(let i = 0; i < edges.length; i++) {
      if(!hasK && i === k) continue; // 如果一定不包含第k条边，则判断是不包含而且i===k时跳过
      if(!unionFindSet.union(edges[i][0], edges[i][1])) { // 连通了两个相异的连通量
        cost += edges[i][2];
        count++;
        if(count === n - 1) break; // 已经全部连上了，则退出
      }
    }
    return count === n - 1 ? cost : Infinity; // 判断是否可以连通，可以则返回权值和，不可以则返回一个无穷大
  }

  return ans;
};

// 定义并查集
class UnionFind {
  constructor(n) {
    this.parents = Array(n).fill(0).map((value, index) => index);
    this.ranks = Array(n).fill(0);
  }
  find(x) {
    if(this.parents[x] !== x) {
      this.parents[x] = this.find(this.parents[x]);
    }
    return this.parents[x];
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if(rootX === rootY) return true;
    if(this.ranks[rootX] > this.ranks[rootY]) {
      this.parents[rootY] = rootX;
    } else if(this.ranks[rootX] < this.ranks[rootY]) {
      this.parents[rootX] = rootY;
    } else {
      this.parents[rootY] = rootX;
      this.ranks[rootX]++;
    }
    return false;
  }
}

