import each from 'jest-each';

describe('stock series', () => {
  // https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/discuss/75924/Most-consistent-ways-of-dealing-with-the-series-of-stock-problems

  // Base cases:
  // T[-1][k][0] = 0, T[-1][k][1] = -Infinity
  // T[i][0][0] = 0, T[i][0][1] = -Infinity
  //
  // Recurrence relation:
  // T[i][k][0] = max(T[i-1][k][0], T[i-1][k][1] + prices[i])
  // T[i][k][1] = max(T[i-1][k][1], T[i-1][k-1][0] - prices[i])

  describe('121. Best Time to Buy and Sell Stock', () => {
    // https://leetcode.com/problems/best-time-to-buy-and-sell-stock/#/description
    const maxProfit = (prices: number[]): number => {
      let T_i10 = 0;
      // let profitIfSell = 0;
      let T_i11 = -Infinity;
      // let profitIfBuy

      for (const price of prices) {
        // max between rest and sell on cur day
        T_i10 = Math.max(T_i10, T_i11 + price);
        // max between rest and buy on cur day
        // T[i-1][k-1][0] is 0 because k === 1 and T[i][0][0] is always 0
        T_i11 = Math.max(T_i11, -price);
      }

      return T_i10;
    };

    const cases = [
      { value: [7, 1, 5, 3, 6, 4], expected: 5 },
      { value: [1, 1], expected: 0 },
      { value: [2, 1, 0], expected: 0 },
      { value: [1, 2, 3, 4], expected: 3 }
    ];

    each(cases).it('Test for $value', ({ value, expected }) => {
      expect(maxProfit(value)).toStrictEqual(expected);
    });
  });

  const cases = [{ value: 0, expected: 0 }];

  each(cases).it('Test for $value', ({ value, expected }) => {
    expect(value).toStrictEqual(expected);
  });

  it('separate test 1', () => {
    expect(1).toBe(1);
  });
});
