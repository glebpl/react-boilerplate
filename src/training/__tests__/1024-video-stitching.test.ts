import each from 'jest-each';
import { left } from '@popperjs/core';

describe('1024. Video Stitching', () => {
  // https://leetcode.com/problems/video-stitching/

  // 1 <= clips.length <= 100
  // 0 <= starti <= endi <= 100
  // 1 <= time <= 100

  const cases = [
    {
      clips: [
        [0, 4],
        [2, 8]
      ],
      time: 5,
      expected: 2
    },
    {
      clips: [[0, 6]],
      time: 6,
      expected: 1
    },
    {
      clips: [
        [0, 2],
        [4, 6],
        [8, 10],
        [1, 9],
        [1, 5],
        [5, 9]
      ],
      time: 10,
      expected: 3
    },
    {
      clips: [[0, 5]],
      time: 6,
      expected: -1
    },
    {
      clips: [
        [0, 1],
        [1, 2]
      ],
      time: 5,
      expected: -1
    },
    {
      clips: [
        [1, 2],
        [2, 5]
      ],
      time: 5,
      expected: -1
    },
    {
      clips: [
        [0, 1],
        [6, 8],
        [0, 2],
        [5, 6],
        [0, 4],
        [0, 3],
        [6, 7],
        [1, 3],
        [4, 7],
        [1, 4],
        [2, 5],
        [2, 6],
        [3, 4],
        [4, 5],
        [5, 7],
        [6, 9]
      ],
      time: 9,
      expected: 3
    },
    {
      clips: [
        [5, 7],
        [1, 8],
        [0, 0],
        [2, 3],
        [4, 5],
        [0, 6],
        [5, 10],
        [7, 10]
      ],
      time: 5,
      expected: 1
    }
  ];

  function videoStitchingOrig(clips: number[][], time: number): number {
    let res = 0;
    let st = 0;
    let et = 0;

    clips.sort((clip1, clip2) => clip1[0] - clip2[0]);

    for (let i = 0; st < time; ++res) {
      for (; i < clips.length && clips[i][0] <= st; ++i) {
        et = Math.max(et, clips[i][1]);
      }
      if (st === et) return -1; // nothing changed
      st = et;
    }
    return res;
  }

  function videoStitching(clips: number[][], time: number): number {
    let res = 0;
    let st = 0;
    let et = 0;
    let i = 0;

    clips.sort((clip1, clip2) => clip1[0] - clip2[0]);

    while (st < time) {
      while (i < clips.length && clips[i][0] <= st) {
        et = Math.max(et, clips[i][1]);
        i++;
      }

      if (st === et) {
        // nothing changed: there is a gap ar not enough clips
        return -1;
      } else {
        // shift and process next portion of clips
        res++;
        st = et;
      }
    }

    return res;
  }

  each(cases).it('Test for clips: $clips and time: $time', ({ clips, time, expected }) => {
    expect(videoStitching1(clips, time)).toStrictEqual(expected);
  });

  it('separate test 1', () => {
    expect(
      videoStitching(
        [
          [11, 28],
          [35, 40],
          [28, 38],
          [0, 10],
          [37, 39],
          [40, 40],
          [18, 34],
          [32, 38],
          [14, 36],
          [33, 36]
        ],
        8
      )
    ).toBe(1);
  });
});
