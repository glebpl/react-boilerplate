describe('Squares of a Sorted Array', () => {
  // https://leetcode.com/problems/squares-of-a-sorted-array/

  function sortedSquares(nums: number[]) {
    const results = [];
    let left = 0;
    let right = nums.length - 1;
    let idx = right;

    while (idx >= 0) {
      const leftSquare = nums[left] * nums[left];
      const rightSquare = nums[right] * nums[right];
      if (leftSquare > rightSquare) {
        results[idx] = leftSquare;
        left++;
      } else {
        results[idx] = rightSquare;
        right--;
      }
      idx--;
    }

    return results;
  }

  it('[-7,-3,2,3,11]', () => {
    expect(sortedSquares([-7, -3, 2, 3, 11])).toStrictEqual([4, 9, 9, 49, 121]);
  });
});
