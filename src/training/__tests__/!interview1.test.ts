import each from 'jest-each';

describe('task 1', () => {
  const cases = [{ value: 0, expected: 0 }];

  const testFn = (value: any): any => value;
  // const testFn = (arr: number[]): number => {};
  // const testFn = (arr: number[], k: number): number => {};
  // const testFn = (s: string, k: number): number => {};

  each(cases).it('Test for $value', ({ value, expected }) => {
    expect(testFn(value)).toStrictEqual(expected);
  });

  it('separate test 1', () => {
    expect(testFn(1)).toBe(1);
  });
});

describe('task 2', () => {
  const cases = [{ value: 0, expected: 0 }];

  const testFn = (value: any): any => value;

  each(cases).it('Test for $value', ({ value, expected }) => {
    expect(testFn(value)).toStrictEqual(expected);
  });

  it('separate test 1', () => {
    expect(testFn(1)).toBe(1);
  });
});
