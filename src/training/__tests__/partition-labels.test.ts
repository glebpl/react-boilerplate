describe('partition labels', () => {
  function partitionLabels(s: string): number[] {
    const result: number[] = [];
    const lastIndexes: Record<string, number> = {};

    for (let i = 0; i < s.length; i++) {
      lastIndexes[s[i]] = i;
    }

    let maxIndex = 0;
    let start = 0;

    for (let i = 0; i < s.length; i++) {
      maxIndex = Math.max(maxIndex, lastIndexes[s[i]]);
      if (maxIndex === i) {
        result.push(i - start + 1);
        start = i + 1;
      }
    }

    return result;
  }

  it('ababcbacadefegdehijhklij', () => {
    expect(partitionLabels('ababcbacadefegdehijhklij')).toStrictEqual([9, 7, 8]);
  });

  it('abcd', () => {
    expect(partitionLabels('abcd')).toStrictEqual([1, 1, 1, 1]);
  });

  it('aaad', () => {
    expect(partitionLabels('aaad')).toStrictEqual([3, 1]);
  });
});
