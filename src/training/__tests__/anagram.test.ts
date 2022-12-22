const isAnagramByCharCodes = (s: string, t: string): boolean => {
  if (s.length != t.length) return false;
  const count = Array(26).fill(0);
  const len = s.length;
  for (let i = 0; i < len; i++) {
    count[s.charCodeAt(i) - 97]++;
  }
  for (let i = 0; i < len; i++) {
    if (--count[t.charCodeAt(i) - 97] < 0) {
      return false;
    }
  }
  return true;
};

const stringToMap = (str: string): Map<string, number> => {
  const map = new Map<string, number>();
  for (const char of str) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }
  return map;
};

const stringToCharCodeArray = (str: string): number[] => {
  const arr: number[] = [];
  for (const char of str) {
    const code = char.charCodeAt(0);
    arr[code] = (arr[code] ?? 0) + 1;
  }
  return arr;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagramTwoMaps = (s: string, t: string): boolean => {
  const map1 = stringToMap(s);
  const map2 = stringToMap(t);
  if (map1.size === map2.size) {
    for (const [char1, n1] of map2.entries()) {
      const n2 = map1.get(char1);
      if (n2 !== n1) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

const isAnagramByMap = (s: string, t: string): boolean => {
  if (s.length === t.length) {
    const map = stringToMap(s);
    for (const char of t) {
      const q = map.get(char);
      if (!q) {
        return false;
      } else {
        map.set(char, q - 1);
      }
    }
    return true;
  }
  return false;
};

// Runtime: 247 ms, faster than 50.89% of TypeScript online submissions for Find All Anagrams in a String.
// Memory Usage: 50.1 MB, less than 34.32% of TypeScript online submissions for Find All Anagrams in a String.
function findAnagrams(s: string, p: string): number[] {
  const result = [];
  const pMap = stringToMap(p);
  const pLen = p.length;
  let map: Map<string, number> | undefined;

  for (let i = 0; i <= s.length - pLen; i++) {
    if (map) {
      const n = map.get(s[i - 1]) as number;
      if (n > 1) {
        map.set(s[i - 1], n - 1);
      } else {
        map.delete(s[i - 1]);
      }
      map.set(s[i + pLen - 1], (map.get(s[i + pLen - 1]) ?? 0) + 1);
    } else {
      map = stringToMap(s.slice(0, p.length));
    }

    if (isAnagramMaps(map, pMap)) {
      result.push(i);
    }
  }

  return result;
}

// sample 123 ms submission
const findAnagramsOthers = (s: string, p: string) => {
  // initialize output array to be returned at the end and need object to store the chars in p.
  const output = [];
  const need: Record<string, number> = {};

  // populate need to contain every char in p as a key and how many times that char appears in p as its value.
  for (const char of p) {
    if (char in need) {
      need[char]++;
    } else {
      need[char] = 1;
    }
  }

  // initialize window pointers and the total number of chars needed to form an anagram.
  let left = 0;
  let right = 0;
  let count = p.length;

  // start sliding the window
  while (right < s.length) {
    if (need[s[right]] > 0) count--;

    need[s[right]]--;
    right++;

    //means that there is an anagram starting at the left index so push left into the output array.
    if (count === 0) output.push(left);

    if (right - left === p.length) {
      // increase the total number of chars currently needed to form an anagram.
      if (need[s[left]] >= 0) count++;
      need[s[left]]++;
      left++;
    }
  }
  return output;
};

// Runtime: 8596 ms, faster than 5.33% of TypeScript online submissions for Find All Anagrams in a String.
const isAnagramByCharCodeArray = (s: string, t: string): boolean => {
  if (s.length === t.length) {
    const codeMap = stringToCharCodeArray(s);
    for (const char of t) {
      const code = char.charCodeAt(0);
      const q = codeMap[code];
      if (!q) {
        return false;
      } else {
        codeMap[code]--;
      }
    }
    return true;
  }
  return false;
};

const isAnagramMaps = (map1: Map<string, number>, map2: Map<string, number>): boolean => {
  if (map1.size === map2.size) {
    for (const [char1, n1] of map2.entries()) {
      const n2 = map1.get(char1);
      if (n2 !== n1) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

function findAnagramsByCodeMaps(s: string, p: string): number[] {
  const result = [];
  const pLen = p.length;

  for (let i = 0; i <= s.length - pLen; i++) {
    if (isAnagramByCharCodeArray(s.slice(i, i + pLen), p)) {
      result.push(i);
    }
  }

  return result;
}

// Time Limit Exceeded on very long example
function findAnagramsMakeEachTime(s: string, p: string): number[] {
  const result = [];
  const pMap = stringToMap(p);
  const pLen = p.length;

  for (let i = 0; i <= s.length - pLen; i++) {
    if (isAnagramMaps(stringToMap(s.slice(i, i + pLen)), pMap)) {
      result.push(i);
    }
  }

  return result;
}

// Time Limit Exceeded on very long example
function findAnagramsMakeEachTime1(s: string, p: string): number[] {
  const result = [];
  const pLen = p.length;

  for (let i = 0; i <= s.length - pLen; i++) {
    if (isAnagramByMap(s.slice(i, i + pLen), p)) {
      result.push(i);
    }
  }

  return result;
}

// Time Limit Exceeded on very long example
function findAnagramsByStringSort(s: string, p: string): number[] {
  const result = [];
  const pLen = p.length;
  p = p.split('').sort().join('');

  for (let i = 0; i <= s.length - pLen; i++) {
    if (
      s
        .slice(i, i + pLen)
        .split('')
        .sort()
        .join('') === p
    ) {
      result.push(i);
    }
  }

  return result;
}
