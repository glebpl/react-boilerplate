import each from 'jest-each';
import { createFromArray, ListNode } from './ListNode';

describe('876. Middle of the Linked List', () => {
  // https://leetcode.com/problems/middle-of-the-linked-list/
  // 1 <= Node.val <= 100
  // The number of nodes in the list is in the range [1, 100]

  /**
   * @param {ListNode} head
   * @return {ListNode}
   */

  // const getLength = (head: ListNode | undefined): number => {
  //   let len = 0;
  //   while (head) {
  //     len++;
  //     head = head.next;
  //   }
  //   return len;
  // };

  // function middleNodeSlow(head: ListNode): ListNode {
  //   const length = getLength(head);
  //   const mid = Math.floor(length / 2);
  //   for (let i = 0; i < mid; i++) {
  //     head = head.next as ListNode;
  //   }
  //   return head;
  // }

  // while(fast && fast.next){
  //         fast=fast.next.next
  //         slow=slow.next
  //         count+=2
  //     }

  function middleNode(head: ListNode): ListNode {
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (slow && fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    }

    return slow as ListNode;
  }

  it('[1]', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.from(middleNode(createFromArray([1])))).toStrictEqual([1]);
  });

  it('[1,2,3,4,5]', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.from(middleNode(createFromArray([1, 2, 3, 4, 5])))).toStrictEqual([3, 4, 5]);
  });

  it('[1,2,3,4,5,6]', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.from(middleNode(createFromArray([1, 2, 3, 4, 5, 6])))).toStrictEqual([4, 5, 6]);
  });
});
