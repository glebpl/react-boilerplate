import each from 'jest-each';

describe('20. Valid Parentheses', () => {
  // 1 <= s.length <= 104
  // s consists of parentheses only '()[]{}'.
  const invalidCases = ['(', '}', '(((', '[(((]', '((}}', '}(){', '[(])', '[()[]'];

  const validCases = ['()', '()[]{}', '{[()([{()}])]}[{}]', '{{{{{[[[((()))]]]}}}}}'];

  const parens: Record<'(' | '[' | '{', string> = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  const isValid = (s: string): boolean => {
    const stack = [];
    for (let i = 0; i < s.length; ++i) {
      const char = s[i];
      if (char in parens) {
        stack.push(char);
      } else {
        const opening = stack.pop();
        if (parens[opening as '(' | '[' | '{'] !== char) {
          return false;
        }
      }
    }
    return stack.length === 0;
  };

  describe('Invalid', () => {
    each(invalidCases).it('$s', sequence => {
      expect(isValid(sequence)).toStrictEqual(false);
    });
  });

  describe('Valid', () => {
    each(validCases).it('$s', sequence => {
      expect(isValid(sequence)).toStrictEqual(true);
    });
  });
});
