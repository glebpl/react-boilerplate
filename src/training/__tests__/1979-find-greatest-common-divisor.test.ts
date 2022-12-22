// https://leetcode.com/problems/find-greatest-common-divisor-of-array/

function findGCD(nums: number[]): number {
  let min = Infinity;
  let max = 0;
  for (const n of nums) {
    min = Math.min(min, n);
    max = Math.max(max, n);
  }

  let step = 1;
  let div = min;

  while (div > 1) {
    div = min / step;
    if (min % div === 0 && max % div === 0) {
      return div;
    }
    step++;
  }

  return div;
}
