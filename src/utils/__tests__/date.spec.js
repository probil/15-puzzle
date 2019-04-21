import { differenceInSeconds } from '../date';

describe('toMMSS()', () => {
  it('is a function', () => {
    expect(differenceInSeconds).toEqual(expect.any(Function));
  });
  it('returns 0 when date is the same', () => {
    const date = new Date();
    expect(differenceInSeconds(date, date)).toBe(0);
  });
  it('returns correct positive number when first date is less then second', () => {
    const date1 = new Date('2019-04-21T18:04:00.000Z');
    const date2 = new Date('2019-04-21T18:04:20.000Z');
    expect(differenceInSeconds(date1, date2)).toBe(20);
    const date3 = new Date('2019-04-21T18:04:00.000Z');
    const date4 = new Date('2019-04-21T19:04:00.000Z');
    expect(differenceInSeconds(date3, date4)).toBe(3600);
  });
  it('returns correct negative number when first date is greater then second', () => {
    const date1 = new Date('2019-04-21T18:04:20.000Z');
    const date2 = new Date('2019-04-21T18:04:00.000Z');
    expect(differenceInSeconds(date1, date2)).toBe(-20);
  });
});
