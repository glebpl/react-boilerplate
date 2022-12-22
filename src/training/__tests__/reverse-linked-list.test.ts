import { createFromArray, ListNode } from './ListNode';

describe('206. Reverse Linked List', () => {
  // https://leetcode.com/problems/reverse-linked-list/
  // The number of nodes in the list is the range [0, 5000].
  // -5000 <= Node.val <= 5000

  // GOOD
  function reverseList(head) {
    if (!head) return null;
    let p2 = head.next;
    head.next = null;
    while (p2) {
      const n = p2.next;
      p2.next = head;
      head = p2;
      p2 = n;
    }
    return head;
  }

  // Creates new list
  // function getReversedList(head: ListNode) {
  //   let current: ListNode | null = head;
  //   let prev = null;
  //
  //   while (current) {
  //     const node = new ListNode(current.val);
  //     node.next = prev;
  //     current = current.next;
  //     prev = node;
  //   }
  //
  //   return prev;
  // }

  // var reverseList = function(head) {
  //     let current = head;
  //     let prev = null;
  //     let next;
  //
  //     while(current) {
  //         next = current.next;
  //         current.next = prev;
  //         prev = current;
  //         current = next;
  //     }
  //
  //     return prev;
  // };

  it('[]', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.from(reverseList(createFromArray([])))).toStrictEqual([]);
  });

  it('[1]', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.from(createFromArray([1]))).toStrictEqual([1]);
  });

  it('[-5, 5]', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.from(createFromArray([-5, 5]))).toStrictEqual([5, -5]);
  });

  it('[1,2,3,4,5]', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.from(createFromArray([1, 2, 3, 4, 5]))).toStrictEqual([5, 4, 3, 2, 1]);
  });
});
