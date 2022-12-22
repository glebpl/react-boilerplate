import each from 'jest-each';

describe('11. Container With Most Water', () => {
  // https://leetcode.com/problems/container-with-most-water/

  // n == height.length
  // 2 <= n <= 105
  // 0 <= height[i] <= 104
  const cases = [
    { height: [1, 1], expected: 1 },
    { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 }
  ];

  function maxArea(height: number[]): number {
    let maxValue = 0;
    for (let i = 0; i < height.length - 1; ++i) {
      for (let j = i + 1; j < height.length; ++j) {
        const v = Math.min(height[i], height[j]) * (j - i);
        maxValue = Math.max(maxValue, v);
      }
    }
    return maxValue;
  }

  each(cases).it('$height', ({ height, expected }) => {
    expect(maxArea1(height)).toBe(expected);
  });
});
