import each from 'jest-each';

describe('fibonacci', () => {
  const cases = [
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 5],
    [5, 8],
    [6, 13],
    [7, 21]
  ];

  const fibLoop = (n: number): number => {
    if (n < 2) return 1;
    let a = 1;
    let b = 1;
    for (let m = 2; m < n; m++) {
      [a, b] = [a + b, a];
    }
    return a + b;
  };

  const fibRec = (n: number): number => {
    if (n < 2) return 1;
    return fibRec(n - 1) + fibRec(n - 2);
  };

  describe('loop', () => {
    each(cases).it('%s', (n, expected) => {
      expect(fibLoop(n)).toBe(expected);
    });
  });

  describe('recursive', () => {
    each(cases).it('%s', (n, expected) => {
      expect(fibRec(n)).toBe(expected);
    });
  });
});
