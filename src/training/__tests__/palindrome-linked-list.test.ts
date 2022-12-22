import { ListNode } from './ListNode';

describe('234. Palindrome Linked List', () => {
  const createFromArray = (values: number[]): ListNode | null => {
    let head: ListNode | null = null;
    let pointer: ListNode | null;

    values.forEach(v => {
      if (!pointer) {
        head = new ListNode(v);
        pointer = head;
      } else {
        pointer.next = new ListNode(v);
        pointer = pointer.next;
      }
    });

    return head;
  };

  function getReversedList(head: ListNode | null) {
    const values: number[] = [];
    while (head) {
      values.push(head.val);
      head = head.next;
    }

    return createFromArray(values.reverse());
  }

  function getReversedList1(head: ListNode) {
    let current: ListNode | null = head;
    let prev = null;

    while (current) {
      const node = new ListNode(current.val);
      node.next = prev;
      current = current.next;
      prev = node;
    }

    return prev;
  }

  // var isPalindrome = function(head) {
  //     let hh = head;
  //   let arr = [];
  //   while (hh) {
  //     arr.push(hh.val);
  //     hh = hh.next;
  //   }
  //   return arr.join("") === arr.reverse().join("");
  // };

  /**
   * @param {ListNode} head
   * @return {boolean}
   */
  function isPalindrome(head: ListNode | null): boolean {
    if (!head) return false;
    let reversed = getReversedList1(head);
    while (head && reversed) {
      if (head.val !== reversed.val) return false;
      head = head.next;
      reversed = reversed.next;
    }
    return true;
  }

  it('[1,2,2,1]', () => {
    expect(isPalindrome(createFromArray([1, 2, 2, 1]))).toStrictEqual(true);
  });

  it('[1,2]', () => {
    expect(isPalindrome(createFromArray([1, 2]))).toStrictEqual(false);
  });
});
