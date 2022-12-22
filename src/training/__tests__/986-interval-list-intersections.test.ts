import each from 'jest-each';

describe('986. Interval List Intersections', () => {
  // https://leetcode.com/problems/interval-list-intersections/?envType=study-plan&id=algorithm-ii

  const cases = [
    { firstList: [[1, 1]], secondList: [], expected: [] },
    { firstList: [[1, 1]], secondList: [[1, 1]], expected: [[1, 1]] },
    { firstList: [[1, 2]], secondList: [[2, 3]], expected: [[2, 2]] },
    {
      firstList: [
        [0, 5],
        [12, 14],
        [15, 18]
      ],
      secondList: [
        [11, 15],
        [18, 19]
      ],
      expected: [
        [12, 14],
        [15, 15],
        [18, 18]
      ]
    },
    {
      firstList: [
        [10, 15],
        [16, 20]
      ],
      secondList: [
        [2, 3],
        [6, 7],
        [8, 11],
        [12, 13],
        [15, 18]
      ],
      expected: [
        [10, 11],
        [12, 13],
        [15, 15],
        [16, 18]
      ]
    },
    {
      firstList: [
        [0, 2],
        [5, 10],
        [13, 23],
        [24, 25]
      ],
      secondList: [
        [1, 5],
        [8, 12],
        [15, 24],
        [25, 26]
      ],
      expected: [
        [1, 2],
        [5, 5],
        [8, 10],
        [15, 23],
        [24, 24],
        [25, 25]
      ]
    }
  ];

  const intervalIntersection = (firstList: number[][], secondList: number[][]): number[][] => {
    if (firstList.length === 0 || secondList.length === 0) return [];

    const result = [];

    for (
      let i = 0, j = 0;
      i < firstList.length && j < secondList.length && firstList[i][0] <= secondList[secondList.length - 1][1];
      i++
    ) {
      const clip = firstList[i];

      // collect matching from second
      const candidates = [];
      while (j < secondList.length && secondList[j][0] <= clip[1]) {
        if (secondList[j][1] >= clip[0]) {
          candidates.push(secondList[j]);
        }
        j++;
      }

      for (const candidate of candidates) {
        result.push([Math.max(candidate[0], clip[0]), Math.min(candidate[1], clip[1])]);
      }

      if (j > 0 && secondList[j - 1][1] > clip[1]) {
        j--;
      }
    }

    return result;
  };

  function intervalIntersectionBetter(firstList: number[][], secondList: number[][]): number[][] {
    if (firstList.length === 0 || secondList.length === 0) return [];

    const result = [];
    let i = 0;
    let j = 0;

    while (i < firstList.length && j < secondList.length) {
      const lo = Math.max(firstList[i][0], secondList[j][0]);
      const hi = Math.min(firstList[i][1], secondList[j][1]);

      if (lo <= hi) {
        result.push([lo, hi]);
      }

      if (firstList[i][1] < secondList[j][1]) {
        i++;
      } else {
        j++;
      }
    }

    return result;
  }

  each(cases).it('Test for $firstList, $secondList', ({ firstList, secondList, expected }) => {
    expect(intervalIntersectionBetter(firstList, secondList)).toStrictEqual(expected);
  });

  // it('separate test 1', () => {
  //   expect(testFn(1)).toBe(1);
  // });
});
