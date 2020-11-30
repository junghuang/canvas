// 给定一个二叉树，返回其节点值自底向上的层次遍历。
// （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
//
// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],
//
//   返回其自底向上的层次遍历为：
//
// [
//   [15,7],
//   [9,20],
//   [3]
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

var levelOrderBottom = function(root) {
  var queue = [];
  var result = [];
  if (root !== null) {
    queue.push(root);
  }
  while(queue.length !== 0) {
    var level = [];
    var len = queue.length;
    for (var i = 0; i < len; i ++) {
      var currentNode = queue.shift();
      level.push(currentNode.val);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
    result.push(level);
  }
  return result.reverse();
}
