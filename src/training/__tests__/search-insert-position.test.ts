import each from 'jest-each';

describe('Search Insert Position', () => {
  // https://leetcode.com/problems/search-insert-position/
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  const searchInsert = (nums: number[], target: number) => {
    let left = 0;
    let right = nums.length - 1;

    while (right - left > 1) {
      const mid = Math.floor((left + right) / 2);
      if (target >= nums[mid]) {
        left = mid;
      } else {
        right = mid;
      }
    }

    return target <= nums[left] ? left : target <= nums[right] ? right : right + 1;
  };

  // /**
  //  * @param {number[]} nums
  //  * @param {number} target
  //  * @return {number}
  //  */
  function searchInsertFaster(nums: number[], target: number) {
    let left = 0;
    let right = nums.length;

    while (left < right) {
      const mid = Math.floor((right + left) / 2);
      if (nums[mid] == target) return mid;

      if (nums[mid] < target) left = mid + 1;
      else right = mid;
    }
    return left;
  }

  const cases = [
    {
      nums: [1],
      x: 1,
      expected: 0
    },
    {
      nums: [0],
      x: 1,
      expected: 1
    },
    {
      nums: [1],
      x: 0,
      expected: 0
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: -2,
      expected: 0
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: -1,
      expected: 0
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: 0,
      expected: 1
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: 2,
      expected: 1
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: 7,
      expected: 2
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: 8,
      expected: 2
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: 15,
      expected: 4
    },
    {
      nums: [-1, 2, 8, 10, 15],
      x: 20,
      expected: 5
    },
    {
      nums: [-1, 2, 8, 10, 15, 20],
      x: 10,
      expected: 3
    }
  ];

  each(cases).it(`nums = $nums, x = $x`, ({ nums, x, expected }) => {
    expect(searchInsert(nums, x)).toBe(expected);
  });
});
