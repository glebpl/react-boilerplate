describe('22. Generate Parentheses', () => {
  interface TreeNode {
    left?: TreeNode;
    right?: TreeNode;
  }

  const generateParenthesis = (n: number) => {
    const res: string[] = [];
    generateSequence('', n, n, res);
    return res;
  };

  const generateSequence = (s: string, frontCount: number, backCount: number, res: string[]) => {
    if (frontCount === 0) {
      while (backCount > 0) {
        s += ')';
        backCount--;
      }
      res.push(s);
      return;
    }
    if (frontCount <= backCount) {
      generateSequence(s + '(', frontCount - 1, backCount, res);
      if (frontCount != backCount) {
        generateSequence(s + ')', frontCount, backCount - 1, res);
      }
    }
  };

  it('1', () => {
    expect(generateParenthesis(1)).toStrictEqual(['()']);
  });

  it('2', () => {
    expect(generateParenthesis(2)).toEqual(expect.arrayContaining(['()()', '(())']));
  });

  it('3', () => {
    expect(generateParenthesis(3)).toEqual(expect.arrayContaining(['((()))', '(()())', '(())()', '()(())', '()()()']));
  });
});
