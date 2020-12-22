// 给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 例如：
// 给定二叉树[3,9,20,null,null,15,7],
//
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回锯齿形层序遍历如下：
//
// [
//   [3],
//   [20,9],
//   [15,7]
// ]


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

// 递归 官方
// function zigzagLevelOrder (root) {
//   if (!root)  return [];
//   let res = [];
//   function dfs(i, root) {
//     if(!root) return;
//     if (!res[i])  res[i] = [];
//     if (i & 1)  res[i].unshift(root.val);
//     else  res[i].push(root.val);
//     dfs(i+1, root.left);
//     dfs(i+1, root.right);
//   }
//   dfs(0, root);
//   return res;
// }

var zigzagLevelOrder = function(root) {

  if(!root) return []
  const queue = []
  const res = []
  let flag = true // 正向或反向
  queue.push(root)
  while(queue.length) {
    let n = queue.length
    let arr = []
    while(n--) {
      let { val, left, right } = queue.shift()
      arr.push(val)
      if(left) queue.push(left)
      if(right) queue.push(right)
    }
    if(!flag) arr.reverse()
    flag = !flag
    res.push(arr)
  }
  return res
};
