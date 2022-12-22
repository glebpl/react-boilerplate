import { createFromArray, ListNode } from './ListNode';

describe('Linked List Cycle II', () => {
  // https://leetcode.com/problems/linked-list-cycle-ii/

  const detectCycle = (head: ListNode): ListNode | null => {
    if (head === null) {
      return null;
    }
    let fast: ListNode | null = head;
    let slow: ListNode | null = head;
    while (slow && fast.next && fast.next.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
        let slow2: ListNode = head;
        while (slow && slow2 !== slow) {
          slow = slow.next;
          slow2 = slow2.next as ListNode;
        }
        return slow;
      }
    }
    return null;
  };

  it('debug', () => {
    const list = createFromArray([0, 1, 2, 3, 4, 5, 6]) as ListNode;
    const tail = list.getTail();
    const el = list.getK(3);
    expect(el?.val).toBe(3);
    // expect(tail?.val).toBe(6);
    tail.next = el as ListNode;
    expect(detectCycle(list)?.val).toBe(el?.val);
  });
});
