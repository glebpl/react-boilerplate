/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  s = s.trim();
  let ans = 0;
  let min = -(2 ** 31);
  let max = 2 ** 31 - 1;
  let startIdx = s[0] === '-' || s[0] === '+' ? 1 : 0;
  for (let i = startIdx; i < s.length; i++) {
    if (s[i] === ' ' || isNaN(+s[i])) break;
    ans = ans * 10 + +s[i];
  }
  if (s[0] === '-') {
    return Math.max(min, -ans);
  } else {
    return Math.min(max, ans);
  }
};

/**
 * @param {string} s
 * @return {number}
 */
var myAtoiMy = function (s) {
  let sign = 1;
  let n = 0;
  let started = false;

  for (let char of s) {
    if (char !== ' ') {
      if (!started && (char === '-' || char === '+')) {
        sign = char === '-' ? -1 : 1;
        started = true;
      } else if (!/[0-9]/.test(char)) {
        break;
      } else {
        n = n * 10 + Number(char);
        started = true;
      }
    } else if (started) {
      break;
    }
  }

  n *= sign;
  const limit = 2 ** 31;
  return Math.min(Math.max(n, -limit), limit - 1);
};
