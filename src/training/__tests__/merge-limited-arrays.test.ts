import each from 'jest-each';

describe('88. Merge Sorted Array', () => {
  // https://leetcode.com/problems/merge-sorted-array/

  // nums1.length == m + n
  // nums2.length == n
  // 0 <= m, n <= 200
  // 1 <= m + n <= 200
  // -109 <= nums1[i], nums2[j] <= 109

  // The final sorted array SHOULD NOT be returned by the function,
  // but instead be stored inside the array nums1.
  // To accommodate this, nums1 has a length of m + n,
  // where the first m elements denote the elements that should be merged,
  // and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

  const deepClone = (source: any): any => JSON.parse(JSON.stringify(source));

  const cases = [
    {
      nums1: [],
      m: 0,
      nums2: [],
      n: 0,
      expected: []
    },
    {
      nums1: [1, 2, 3, 0, 0, 0],
      m: 3,
      nums2: [2, 5, 6],
      n: 3,
      expected: [1, 2, 2, 3, 5, 6]
    },
    {
      nums1: [1, 2, 3, 9, 11, 12],
      m: 6,
      nums2: [],
      n: 0,
      expected: [1, 2, 3, 9, 11, 12]
    },
    {
      nums1: [0, 0, 0, 0, 0],
      m: 0,
      nums2: [-3, 0, 10, 12, 14],
      n: 5,
      expected: [-3, 0, 10, 12, 14]
    },
    {
      nums1: [4, 5, 6, 0, 0, 0],
      m: 3,
      nums2: [1, 2, 3],
      n: 3,
      expected: [1, 2, 3, 4, 5, 6]
    }
  ];

  const merge = (nums1: number[], m: number, nums2: number[], n: number): void => {
    if (n <= 0) return;

    for (let i = 0, j = 0; i < nums1.length && j < nums2.length; i++) {
      const shift = nums2[j] < nums1[i] ? 1 : 0;
      if (i >= m || shift) {
        for (let k = m - 1; k >= i; k--) {
          // splice may be used instead
          nums1[k + 1] = nums1[k];
        }
        m += shift;
        nums1[i] = nums2[j];
        j++;
      }
    }
  };

  function mergeFast(nums1: number[], m: number, nums2: number[]) {
    if (!nums2.length) return nums1;

    let i = 0;
    const toDelete = nums1.length - m; // detect extra part

    while (i < m && nums2.length) {
      if (nums1[i] > nums2[0]) {
        nums1.splice(i, 0, <number>nums2.shift());
        m++;
      }
      i++;
    }

    nums1.splice(-toDelete);
    nums1.push(...nums2);
  }

  describe('my merge', () => {
    each(deepClone(cases)).it('nums1 = $nums1, nums2 = $nums2, m = $m, n = $n', ({ nums1, m, nums2, n, expected }) => {
      merge(nums1, m, nums2, n);
      expect(nums1).toStrictEqual(expected);
    });
  });

  describe('mergeFast', () => {
    each(deepClone(cases)).it('nums1 = $nums1, nums2 = $nums2, m = $m, n = $n', ({ nums1, m, nums2, n, expected }) => {
      mergeFast(nums1, m, nums2);
      expect(nums1).toStrictEqual(expected);
    });

    it('s', () => {
      const nums1 = [4, 5, 6, 0, 0, 0];
      mergeFast(nums1, 3, [1, 2, 8]);
      expect(nums1).toStrictEqual([1, 2, 4, 5, 6, 8]);
    });
  });
});
