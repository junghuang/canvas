// 题目：统计完全二叉树的节点个数
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// 对于一个完全二叉树：

// 它的所有子树都是完全二叉树
// 有的子树是 perfect binary tree
// perfect binary tree 的节点个数很好计算：2^h-1

// 如果不是 perfect binary tree，那就是规模小一点的完全二叉树，递归处理。

var countNodes = function (root) {
  if (root == null) {
    return 0;
  }
  let lH, rH = 0;
  let lNode, rNode = root;

  while (lNode) {
    lH++;
    lNode = lNode.left;
  }
  while (rNode) {
    rH++;
    rNode = rNode.right;
  }
  // 所以对于每个节点 root，都判断一下它是否是满二叉树——左侧的高度 == 右侧的高度。
  if (lH == rH) {
    return 2 ** lH - 1;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
};



// 先序遍历
// var countNodes = function(root) {
//   if(!root) return 0
//   const stack = []
//   let count = 0
//   stack.push(root)
//   while(stack.length){
//     let node = stack.pop()
//     count++
//     node.left && stack.push(node.left)
//     node.right && stack.push(node.right)
//   }
//   return count
// };

// DFS
// var countNodes = function(root) {
//     let len = 0
//     function DFS(root){
//         if(!root) return
//         root.left && DFS(root.left)
//         root.right && DFS(root.right)
//         len++
//     }
//     DFS(root)
//     return len
// };
