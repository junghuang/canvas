
// 给你链表的头结点head，请将其按 升序 排列并返回 排序后的链表 。
//
// 进阶：
//
// 你可以O(nlogn) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

let sortList = function(head) {
  return mergeSortRec(head)
}

// 归并排序
// 若分裂后的两个链表长度不为 1，则继续分裂
// 直到分裂后的链表长度都为 1，
// 然后合并小链表
let mergeSortRec = function (head) {
  if(!head || !head.next) {
    return head
  }

  // 获取中间节点
  let middle = middleNode(head)
  // 分裂成两个链表
  let temp = middle.next
  middle.next = null
  let left = head, right = temp
  // 继续分裂（递归分裂）
  left = mergeSortRec(left)
  right = mergeSortRec(right)
  // 合并两个有序链表
  return mergeTwoLists(left, right)
}

// 获取中间节点
// - 如果链表长度为奇数，则返回中间节点
// - 如果链表长度为偶数，则有两个中间节点，这里返回第一个
let middleNode = function(head) {
  let fast = head, slow = head
  while(fast && fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

// 合并两个有序链表
let mergeTwoLists = function(l1, l2) {
  let preHead = new ListNode(-1);
  let cur = preHead;
  while(l1 && l2){
    if(l1.val < l2.val){
      cur.next = l1;
      l1 = l1.next;
    }else{
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return preHead.next;
}



// 昨天的插入排序O(n2)
// var sortList = function(head) {
//   if(!head) return head
//   const shead = new ListNode(0)
//   shead.next = head
//   let cur = head
//   let prev = null
//   let temp = null
//   while(cur && cur.next){
//     if(cur.next.val>=cur.val){
//       cur = cur.next
//     }else{
//       temp = cur.next
//       cur.next = temp.next

//       prev = shead
//       while(prev.next.val<temp.val){
//         prev = prev.next
//       }
//       temp.next = prev.next
//       prev.next = temp
//     }
//   }
//   return shead.next
// };
