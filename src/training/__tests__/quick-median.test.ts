import each from 'jest-each';

describe('quick median', () => {
  function quickSelectMedian(arr: number[]): number {
    const L = arr.length,
      halfL = L / 2;
    if (L % 2 == 1) {
      return quickSelectK(arr, halfL);
    } else {
      return 0.5 * (quickSelectK(arr, halfL - 1) + quickSelectK(arr, halfL));
    }
  }

  const quickSelectK = (arr: number[], k: number): number => {
    // Select the kth element in arr
    // arr: List of numerics
    // k: Index
    // return: The kth element (in numerical order) of arr
    if (arr.length == 1) {
      return arr[0];
    } else {
      const pivot = arr[0];
      const lows = arr.filter(e => e < pivot);
      const highs = arr.filter(e => e > pivot);
      const pivots = arr.filter(e => e == pivot);
      if (k < lows.length) {
        // the pivot is too high
        return quickSelectK(lows, k);
      } else if (k < lows.length + pivots.length) {
        // We got lucky and guessed the median
        return pivot;
      } else {
        // the pivot is too low
        return quickSelectK(highs, k - lows.length - pivots.length);
      }
    }
  };

  // function partition(arr, l, r, x) {
  //   // Search for x in arr[l..r] and move it to end
  //   let i;
  //   for (i = l; i < r; i++) if (arr[i] == x) break;
  //   swap(arr, i, r);
  //
  //   // Standard partition algorithm
  //   i = l;
  //   for (let j = l; j <= r - 1; j++) {
  //     if (arr[j] <= x) {
  //       swap(arr, i, j);
  //       i++;
  //     }
  //   }
  //   swap(arr, i, r);
  //   return i;
  // }

  describe('quickSelectK', () => {
    const cases = [
      { arr: [1], k: 0, expected: 1 },
      { arr: [1, 2], k: 0, expected: 1 },
      { arr: [1, 2, 3], k: 1, expected: 2 },
      { arr: [4, 3, 2, 1], k: 3, expected: 4 },
      { arr: [5, 1, 3, 2, 4], k: 2, expected: 3 }
    ];

    each(cases).it('Test for $k in $arr returns $expected', ({ arr, k, expected }) => {
      expect(quickSelectK(arr, k)).toStrictEqual(expected);
    });
  });
});

describe('findKthLargest/Smallest and quickMedian: quick sort', () => {
  //O(N)time O(logN)space

  // Largest from the end!!! Starting from 1!!!! last has index 1 from the end
  const findKthLargest = (nums: number[], k: number): number => {
    return quickSelect(nums, 0, nums.length - 1, nums.length - k);
  };

  // k starts from 1 !!!
  const findKthSmallest = (nums: number[], k: number): number => {
    return quickSelect(nums, 0, nums.length - 1, k - 1);
  };

  const quickSelect = (nums: number[], left: number, right: number, index: number): number => {
    // int q = randomPartition(a, l, r);
    // finds index where most right element should be placed
    const qIndex = partition(nums, left, right);
    if (qIndex == index) {
      return nums[qIndex];
    } else {
      return qIndex < index
        ? // required element is greater
          quickSelect(nums, qIndex + 1, right, index)
        : quickSelect(nums, left, qIndex - 1, index);
    }
  };

  /**
   * Finds index where most right element should be placed
   */
  const partition = (nums: number[], left: number, right: number) => {
    const x = nums[right];
    let i = left - 1;
    for (let j = left; j < right; ++j) {
      if (nums[j] <= x) {
        // swap(a, ++i, j);
        i++;
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
    // swap(a, i + 1, r);
    const result = i + 1;
    // swap right and most left which is greater than most right
    [nums[result], nums[right]] = [nums[right], nums[result]];

    return result;
  };

  describe('findKthSmallest', () => {
    const cases = [
      { arr: [1], k: 1, expected: 1 },
      { arr: [1, 2], k: 1, expected: 1 },
      { arr: [1, 2, 3], k: 2, expected: 2 },
      { arr: [4, 3, 2, 1], k: 4, expected: 4 },
      { arr: [5, 1, 3, 2, 4], k: 3, expected: 3 },
      { arr: [5, 6, 3, 2, 4, 1], k: 5, expected: 5 },
      { arr: [5, 5, 5, 6, 3, 2, 4, 1], k: 5, expected: 5 }
    ];

    each(cases).it('$k Smallest in $arr returns $expected', ({ arr, k, expected }) => {
      expect(findKthSmallest(arr, k)).toStrictEqual(expected);
    });
  });

  describe('findKthLargest', () => {
    const cases = [
      { arr: [1], k: 1, expected: 1 },
      { arr: [1, 2], k: 1, expected: 2 },
      { arr: [1, 2, 3], k: 1, expected: 3 },
      { arr: [4, 3, 2, 1], k: 3, expected: 2 },
      { arr: [5, 1, 3, 2, 4], k: 2, expected: 4 },
      { arr: [5, 6, 3, 2, 4, 1], k: 4, expected: 3 },
      { arr: [5, 6, 3, 3, 3, 2, 4, 1], k: 4, expected: 3 }
    ];

    each(cases).it('$k Largest in $arr returns $expected', ({ arr, k, expected }) => {
      expect(findKthLargest(arr, k)).toStrictEqual(expected);
    });
  });

  function quickMedian(arr: number[]): number {
    const n = arr.length;
    // relates to findKthSmallest numbers starting from 1
    const mid = Math.ceil(n / 2);

    if (n % 2 === 1) {
      return findKthSmallest(arr, mid);
    } else {
      return 0.5 * (findKthSmallest(arr, mid) + findKthSmallest(arr, mid + 1));
    }
  }

  describe('quickMedian', () => {
    const cases = [
      { arr: [1], expected: 1 },
      { arr: [1, 2], expected: 1.5 },
      { arr: [1, 2, 3], expected: 2 },
      { arr: [1, 2, 2, 2, 3], expected: 2 },
      { arr: [1, 2, 2, 2, 2, 3], expected: 2 },
      { arr: [4, 3, 2, 1], expected: 2.5 },
      { arr: [5, 1, 3, 2, 4], expected: 3 },
      { arr: [5, 6, 3, 2, 4, 1], expected: 3.5 }
    ];

    each(cases).it('Test for $k in $arr returns $expected', ({ arr, k, expected }) => {
      expect(quickMedian(arr)).toStrictEqual(expected);
    });
  });

  //     Random random = new Random();
  //
  //     public int findKthLargest(int[] nums, int k) {
  //         return quickSelect(nums, 0, nums.length - 1, nums.length - k);
  //     }
  //
  //     public int quickSelect(int[] a, int l, int r, int index) {
  //         int q = randomPartition(a, l, r);
  //         if (q == index) {
  //             return a[q];
  //         } else {
  //             return q < index ? quickSelect(a, q + 1, r, index) : quickSelect(a, l, q - 1, index);
  //         }
  //     }
  //
  //     public int randomPartition(int[] a, int l, int r) {
  //         int i = random.nextInt(r - l + 1) + l;
  //         swap(a, i, r);
  //         return partition(a, l, r);
  //     }
  //
  //     public int partition(int[] a, int l, int r) {
  //         int x = a[r], i = l - 1;
  //         for (int j = l; j < r; ++j) {
  //             if (a[j] <= x) {
  //                 swap(a, ++i, j);
  //             }
  //         }
  //         swap(a, i + 1, r);
  //         return i + 1;
  //     }
  //
  //     public void swap(int[] a, int i, int j) {
  //         int temp = a[i];
  //         a[i] = a[j];
  //         a[j] = temp;
  //     }
});
