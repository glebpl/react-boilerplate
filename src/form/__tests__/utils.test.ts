import { isNameValid } from '../utils';

describe('isNameValid', () => {
  it('returns false for string with length less than 2', () => {
    expect(isNameValid('')).toBe(false);
    expect(isNameValid('a')).toBe(false);
    expect(isNameValid('ё')).toBe(false);
    expect(isNameValid('史')).toBe(false);
    expect(isNameValid('✈')).toBe(false);
  });

  it('returns true for string with length greater or equal to 2', () => {
    expect(isNameValid('me')).toBe(true);
    expect(isNameValid('00')).toBe(true);
    expect(isNameValid('john')).toBe(true);
    expect(isNameValid('史✈')).toBe(true);
  });
});
