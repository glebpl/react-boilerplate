import { ListNode } from './ListNode';

type ListItem = string | number | boolean;

// https://dev.to/alisabaj/recursion-and-iteration-what-are-they-and-how-to-use-them-to-merge-sorted-lists-4ofp

export function mergeListsRecursive(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1) return l2;
  if (!l2) return l1;

  if (l1.val === l2.val) {
    l1.next = l2;
    l2.next = mergeListsRecursive(l1.next, l2.next);
    return l1;
  } else if (l1.val < l2.val) {
    l1.next = mergeListsRecursive(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeListsRecursive(l1, l2.next);
    return l2;
  }
}

export const mergeListsInLoop = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
  // create new linked list pointer
  const head = new ListNode();
  let prev = head;

  // while both linked lists are not empty
  while (list1 !== null && list2 !== null) {
    const val1 = list1.val;
    const val2 = list2.val;
    if (val1 === val2) {
      prev.next = list1;
      list1 = list1.next;
      prev.next.next = list2;
      list2 = list2.next;
      prev = prev.next.next;
    } else {
      if (val1 < val2) {
        prev.next = list1;
        list1 = list1.next;
      } else {
        prev.next = list2;
        list2 = list2.next;
      }
      prev = prev.next;
    }
  }

  // once we reach end of a linked list, append the other
  // list because we know it is already sorted
  if (list1 === null) {
    prev.next = list2;
  } else if (list2 === null) {
    prev.next = list1;
  }

  return head.next;
};

export const mergeArraysInLoop = <T extends ListItem>(list1: T[], list2: T[]): T[] => {
  if (!list1.length) return list2;
  if (!list2.length) return list1;

  const target: T[] = [];

  for (let i = 0, j = 0; i < list1.length || j < list2.length; ) {
    const a = list1[i];
    const b = list2[j];

    if (b < a) {
      target.push(b);
      j++;
    } else if (a < b) {
      target.push(a);
      i++;
    } else {
      target.push(a);
      target.push(b);
      i++;
      j++;
    }
  }

  return target;
};

const mergeArraysRecursive = <T extends ListItem>(list1: T[], list2: T[]): T[] => {
  if (!list1.length) return list2;
  if (!list2.length) return list1;

  const a = list1[0];
  const b = list2[0];

  if (b < a) {
    return [b, ...mergeArraysRecursive(list1, list2.slice(1))];
  } else if (a < b) {
    return [a, ...mergeArraysRecursive(list1.slice(1), list2)];
  } else {
    return [a, b, ...mergeArraysRecursive(list1.slice(1), list2.slice(1))];
  }
};

// Returns new array
export const mergeSort = <T extends ListItem>(list: T[]): T[] => {
  if (list.length < 2) return [...list];
  const mid = Math.floor(list.length / 2);
  return mergeArraysRecursive(mergeSort(list.slice(0, mid)), mergeSort(list.slice(mid)));
};

// Javascript program in-place Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
// Inplace Implementation
export const mergeSortInPlaceBad = <T extends ListItem>(arr: T[], start?: number, end?: number): void => {
  start ??= 0;
  end ??= arr.length - 1;
  let mid = Math.floor((start + end) / 2);
  let start2 = mid + 1;

  // If the direct merge is already sorted
  if (arr[mid] <= arr[start2]) {
    return;
  }

  // Two pointers to maintain start
  // of both arrays to merge
  while (start <= mid && start2 <= end) {
    // If element 1 is in right place
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      const value = arr[start2];
      let index = start2;

      // Shift all the elements between element 1
      // element 2, right by 1.
      while (index != start) {
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;

      // Update all the pointers
      start++;
      mid++;
      start2++;
    }
  }
};

export function quickselectMedian(arr: number[]): number {
  const n = arr.length;
  const halfL = n / 2;
  if (n % 2 == 1) return quickselect(arr, halfL);
  else return 0.5 * (quickselect(arr, halfL - 1) + quickselect(arr, halfL));
}

export function quickselect(arr: number[], k: number): number {
  // Select the kth element in arr
  // arr: List of numerics
  // k: Index
  // return: The kth element (in numerical order) of arr
  if (arr.length == 1) return arr[0];
  else {
    const pivot = arr[0];
    const lows = arr.filter(e => e < pivot);
    const highs = arr.filter(e => e > pivot);
    const pivots = arr.filter(e => e == pivot);
    if (k < lows.length) {
      // the pivot is too high
      return quickselect(lows, k);
    } else if (k < lows.length + pivots.length) {
      // We got lucky and guessed the median
      return pivot;
    } else {
      // the pivot is too low
      return quickselect(highs, k - lows.length - pivots.length);
    }
  }
}

export const buildHeap = (arr: number[], n: number): void => {
  for (let i = Math.floor(n / 2); i >= 0; i--) {
    heapify(arr, i, n);
  }
};

const heapify = (arr: number[], i: number, n: number): void => {
  const l = i * 2 + 1;
  const r = i * 2 + 2;
  let max = i;

  if (r < n) {
    if (arr[r] > arr[max]) max = r;
  }

  if (l < n) {
    if (arr[l] > arr[max]) max = l;
  }

  if (max != i) {
    [arr[i], arr[max]] = [arr[max], arr[i]];
    heapify(arr, max, n);
  }
};

export const collectSubArrays = (arr: any[]): any[] => {
  const result = [];
  let len = arr.length;
  while (len > 0) {
    for (let start = 0; start <= arr.length - len; start++) {
      result.push(arr.slice(start, start + len));
    }
    len--;
  }

  return result;
};

// progression
export const countSubArrays = (arr: any[]): number => {
  const n = arr.length;
  return ((1 + n) * n) / 2;
};
