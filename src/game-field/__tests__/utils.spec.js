import { generateField } from '../utils';

describe('generateField()', () => {
  it('is a function', () => {
    expect(generateField).toEqual(expect.any(Function));
  });
  it('throws an error if height is less then 2', () => {
    const cases = [1, 0, -4];
    cases.forEach((height) => {
      const fn = () => generateField({ height, width: 4 });
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });
  it('throws an error if width is less then 2', () => {
    const cases = [1, 0, -4];
    cases.forEach((width) => {
      const fn = () => generateField({ height: 4, width });
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });
  it('generates 2-dimensional square array with given size', () => {
    const actual = generateField({ width: 5, height: 5 });
    expect(actual).toHaveLength(5);
    actual.forEach((row) => {
      expect(row).toHaveLength(5);
    });
  });
  it('generates 2-dimensional non-square array with given size', () => {
    const actual = generateField({ width: 4, height: 3 });
    expect(actual).toHaveLength(3);
    actual.forEach((row) => {
      expect(row).toHaveLength(4);
    });
  });
  it('generates array filled with zeros', () => {
    expect(generateField({ width: 4, height: 3 })).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(generateField({ width: 2, height: 2 })).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });
});
