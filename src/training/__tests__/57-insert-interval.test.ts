import each from 'jest-each';

describe('57. Insert Interval', () => {
  // https://leetcode.com/problems/insert-interval/
  // 0 <= intervals.length <= 104
  // intervals[i].length == 2
  // 0 <= starti <= endi <= 105
  // intervals is sorted by starti in ascending order.
  // newInterval.length == 2
  // 0 <= start <= end <= 105

  const cases = [
    { intervals: [], newInterval: [0, 0], expected: [[0, 0]] },
    { intervals: [], newInterval: [1, 2], expected: [[1, 2]] },
    {
      intervals: [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
        [12, 16]
      ],
      newInterval: [4, 8],
      expected: [
        [1, 2],
        [3, 10],
        [12, 16]
      ]
    },
    {
      intervals: [
        [1, 3],
        [6, 9]
      ],
      newInterval: [2, 5],
      expected: [
        [1, 5],
        [6, 9]
      ]
    }
  ];

  function insert(intervals: number[][], newInterval: number[]): number[][] {
    return [];
  }

  each(cases).it('Test for $newInterval', ({ intervals, newInterval, expected }) => {
    expect(insert(intervals, newInterval)).toStrictEqual(expected);
  });

  // it('separate test 1', () => {
  //   expect(testFn(1)).toBe(1);
  // });
});
