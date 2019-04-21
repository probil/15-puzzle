import { toMMSS } from '..';

describe('toMMSS()', () => {
  it('is a function', () => {
    expect(toMMSS).toEqual(expect.any(Function));
  });
  it('returns 00:00 for 0', () => {
    expect(toMMSS(0)).toBe('00:00');
  });
  it('returns `00:10` for `10`', () => {
    expect(toMMSS(10)).toBe('00:10');
  });
  it('returns `01:00` for `60`', () => {
    expect(toMMSS(60)).toBe('01:00');
  });
  it('returns `06:00` for `360`', () => {
    expect(toMMSS(360)).toBe('06:00');
  });
  it('returns `--:--` for non-integer values', () => {
    [null, undefined, new Date(), 'test', 11.11, {}, []].forEach((value) => {
      expect(toMMSS(value)).toBe('--:--');
    });
  });
});
