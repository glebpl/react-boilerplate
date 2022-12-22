import each from 'jest-each';

describe('binary search', () => {
  const cases = [
    { arr: [], x: 0, expected: -1 },
    { arr: [0], x: 0, expected: 0 },
    { arr: [0], x: 1, expected: -1 },
    { arr: [0, 1], x: 1, expected: 1 },
    { arr: [0, 1], x: 2, expected: -1 },
    { arr: [0, 1, 3], x: 0, expected: 0 },
    { arr: [0, 1, 3], x: 3, expected: 2 },
    { arr: [0, 1, 3, 5], x: 1, expected: 1 },
    { arr: [0, 1, 3, 5], x: 8, expected: -1 },
    { arr: [0, 1, 3, 5, 8], x: 3, expected: 2 }
  ];

  const binSearch = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = (left + right) >>> 1;

      if (nums[mid] === target) return mid;

      if (target > nums[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  };

  each(cases).it('Test for $arr, x = $x', ({ arr, x, expected }) => {
    expect(binSearch(arr, x)).toStrictEqual(expected);
  });

  function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = (left + right) >>> 1;
      const midV = nums[mid];

      if (midV === target) return mid;

      if (midV <= nums[right]) {
        // end is to the left
        if (target > midV && target <= nums[right]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      } else {
        // end is in the middle or to the right of the mid
        if (target < midV && target >= nums[left]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    }

    return -1;
  }

  it('separate test 1', () => {
    expect(search([4, 5, 6, 7, 8, 1, 2, 3], 8)).toBe(4);
  });

  it('separate test 2', () => {
    expect(search([7, 8, 1], 8)).toBe(1);
  });

  it('separate test 3', () => {
    expect(search([8, 1, 7], 8)).toBe(0);
  });

  it('separate test 4', () => {
    expect(search([5, 1, 2, 3, 4], 1)).toBe(1);
  });

  it('separate test 4', () => {
    expect(search([5, 5, 5, 5], 5)).toBe(0);
  });
});
