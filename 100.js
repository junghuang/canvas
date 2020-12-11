// 给定两个二叉树，编写一个函数来检验它们是否相同。
//
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  function traversal (r1, r2) {
    if (r1 === null && r2 !== null) {
      return false
    } else if (r1 !== null && r2 === null) {
      return false
    } else if (r1 === null && r2 === null) {
      return true
    } else {
      return  r1.val === r2.val && traversal(r1.left, r2.left) && traversal(r1.right,r2.right)
    }
  }
  return traversal(p, q)
}
