import each from 'jest-each';
import { mergeSort, mergeListsInLoop, mergeListsRecursive, collectSubArrays, countSubArrays } from './utils';
import { createFromArray } from './ListNode';

describe('merge lists', () => {
  const cases = [
    {
      list1: [],
      list2: [1],
      expected: [1]
    },
    {
      list1: [2, 2],
      list2: [1],
      expected: [1, 2, 2]
    },
    {
      list1: [-1, 0],
      list2: [-1, 0],
      expected: [-1, -1, 0, 0]
    },
    {
      list1: [-1, 0],
      list2: [-1, 0],
      expected: [-1, -1, 0, 0]
    },
    {
      list1: [-1, 0, 5, 100],
      list2: [-1, 2, 5, 99, 200, 300],
      expected: [-1, -1, 0, 2, 5, 5, 99, 100, 200, 300]
    }
  ];

  describe('iterative', () => {
    it('list1: [], list2: []', () => {
      expect(mergeListsInLoop(createFromArray([]), createFromArray([]))).toStrictEqual(null);
    });

    // it('---', () => {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   expect([...mergeListsInLoop(createFromArray([-1, 0]), createFromArray([-1, 0]))]).toStrictEqual([-1, -1, 0, 0]);
    // });

    each(cases).it('list1: $list1, list2: $list2', ({ list1, list2, expected }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect([...mergeListsInLoop(createFromArray(list1), createFromArray(list2))]).toStrictEqual(expected);
    });
  });

  describe('recursive', () => {
    it('list1: [], list2: []', () => {
      expect(mergeListsRecursive(createFromArray([]), createFromArray([]))).toStrictEqual(null);
    });

    each(cases).it('list1: [], list2: []', () => {
      expect(mergeListsRecursive(createFromArray([]), createFromArray([]))).toStrictEqual(null);
    });
  });
});

describe('sort', () => {
  const cases = [
    {
      list: [],
      expected: []
    },
    {
      list: [1],
      expected: [1]
    },
    {
      list: ['a'],
      expected: ['a']
    },
    {
      list: [true],
      expected: [true]
    },
    {
      list: [0, 1],
      expected: [0, 1]
    },
    {
      list: [-1, -3],
      expected: [-3, -1]
    },
    {
      list: [2, 8, -2, -10, 100, 99],
      expected: [-10, -2, 2, 8, 99, 100]
    }
  ];

  describe('mergeSort', () => {
    each(cases).it('$list', ({ list, expected }) => {
      expect(mergeSort(list)).toStrictEqual(expected);
    });
  });

  function medianSlidingWindow(nums: number[], k: number): number[] {
    const medians: number[] = [];
    const n = nums.length;
    const steps = n - k;
    const isEven = k % 2 === 0;

    for (let i = 0; i <= steps; i++) {
      const slice = nums.slice(i, i + k).sort((n1, n2) => n1 - n2);
      if (isEven) {
        medians.push((slice[k / 2] + slice[k / 2 + 1]) / 2);
      } else {
        medians.push(slice[Math.floor(k / 2)]);
      }
    }

    return medians;
  }

  /**
   * @param {number[]} nums
   * @return {number}
   */
  function findDuplicate(nums: number[]): number {
    // https://leetcode.com/problems/find-the-duplicate-number/
    let slow = nums[0];
    let fast = nums[nums[0]];

    while (slow != fast) {
      // we are guaranteed to have a cycle
      slow = nums[slow];
      fast = nums[nums[fast]];
    }

    slow = 0;

    while (slow != fast) {
      slow = nums[slow];
      fast = nums[fast];
    }

    return slow;
  }

  it('findDuplicate [1, 6, 3, 4, 2, 5, 2, 7]', () => {
    expect(findDuplicate([1, 6, 3, 4, 2, 5, 2, 7])).toBe(2);
  });

  function removeDuplicates(nums: number[]): number {
    let i = 0;

    for (let j = 1; j < nums.length; j++) {
      if (nums[j] != nums[i]) {
        nums[++i] = nums[j];
      }
    }

    return i + 1;
  }

  it('removeDuplicates [1,1,2,2,2,3]', () => {
    expect(removeDuplicates([1, 1, 2, 2, 2, 3])).toBe(3);
  });

  const squaresSum = (n: number): number => {
    const div = 10;
    let sum = 0;

    while (n > 0) {
      const digit = n % div;
      sum += digit * digit;
      n = Math.floor(n / div);
    }

    return sum;
  };

  describe('squaresSum', () => {
    it('t1', () => {
      expect(squaresSum(0)).toBe(0);
    });
    it('11', () => {
      expect(squaresSum(11)).toBe(2);
    });
    it('22', () => {
      expect(squaresSum(22)).toBe(8);
    });
    it('234', () => {
      expect(squaresSum(234)).toBe(29);
    });
  });

  describe('collectSubArrays', () => {
    it('0', () => {
      expect(collectSubArrays([])).toStrictEqual([]);
    });

    it('1', () => {
      expect(collectSubArrays([1])).toStrictEqual([[1]]);
    });

    it('2', () => {
      expect(collectSubArrays([2, 2])).toStrictEqual([[2, 2], [2], [2]]);
    });

    it('3', () => {
      expect(collectSubArrays([1, 2, 3])).toStrictEqual([[1, 2, 3], [1, 2], [2, 3], [1], [2], [3]]);
    });

    it('10', () => {
      expect(collectSubArrays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).length).toStrictEqual(55);
    });

    it('count 10', () => {
      expect(countSubArrays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toStrictEqual(55);
    });
  });
});
