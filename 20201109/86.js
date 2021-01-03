
 // function ListNode(val) {
 //    this.val = val;
 //    this.next = null;
 // }

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  const left = new ListNode(0), right = new ListNode(0)

  let l = left, r = right
  while(head != null) {
    if(head.val < x) {
      l.next = head
      l = l.next
    }else {
      r.next = head
      r = r.next
    }
    head = head.next
  }
  r.next = null
  l.next = right.next
  return left.next
};

// test
//  head = 1->4->3->2->5->2, x = 3
//  const head = new ListNode(1)
//  const n2 = new ListNode(4)
//  const n3 = new ListNode(3)
//  const n4 = new ListNode(2)
//  const n5 = new ListNode(5)
//  const n6 = new ListNode(2)
//  head.next = n2
//  n2.next = n3
//  n3.next = n4
//  n4.next = n5
//  n5.next = n6
//  console.log(partition(head, 3));
