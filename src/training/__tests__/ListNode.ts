export class ListNode implements Iterable<number> {
  public val: number;
  public next: ListNode | null;

  constructor(val?: number, next?: ListNode) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  [Symbol.iterator]() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let pointer: ListNode | null = this;
    return {
      next() {
        if (pointer) {
          const value = pointer.val;
          pointer = pointer.next;
          return { value, done: false } as IteratorResult<number>;
        } else {
          return {
            done: true
          } as IteratorResult<number>;
        }
      }
    };
  }

  getTail(): ListNode {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let tail: ListNode = this;
    while (tail) {
      if (!tail.next) break;
      tail = tail.next;
    }
    return tail;
  }

  getTail2(): ListNode {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let tail: ListNode = this;
    let pointer: ListNode | null = this.next;
    while (pointer) {
      tail = pointer;
      pointer = pointer.next;
    }
    return tail;
  }

  getK(k: number): ListNode | null {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let head: ListNode | null = this;
    for (let i = 1; i <= k && head; i++) {
      head = head.next;
    }
    return head;
  }
}

export const createFromArray = (values: number[]): ListNode | null => {
  let head: ListNode | null = null;
  let pointer: ListNode | null = null;

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
