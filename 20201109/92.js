// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
//
// 说明:
//   1 ≤m≤n≤ 链表长度。
//
// 示例:
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var reverseBetween = function (head, m, n) {
  var dummy = new ListNode(0)
  dummy.next = head
  var prev = dummy
  var cur = head
  var reverse = null
  var reverseLastNode = null
  var index = 1

  while (index <= n) {
    if (index < m) {
      prev = prev.next
      cur = cur.next
    } else {
      // 反转前的第一个节点，也就是反转后的最后一个节点
      if (reverseLastNode === null) {
        reverseLastNode = cur
      }
      // 交换
      var temp = reverse
      reverse = cur
      cur = cur.next
      reverse.next = temp
    }
    index++
  }

  prev.next = reverse
  reverseLastNode.next = cur

  return dummy.next
};
const head = new ListNode(1)
let node2 = new ListNode(2)
let node3 = new ListNode(3)
let node4 = new ListNode(4)
let node5 = new ListNode(5)
head.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
console.log(reverseBetween(head, 2, 4));
