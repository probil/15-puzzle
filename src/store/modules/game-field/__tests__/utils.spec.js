import {
  generateField,
  fillWithInitialData,
  shuffle,
  findPointByValue,
  isSolved,
  swapPoints,
  getValidMovesForPoint,
  isPointsAreEqual,
} from '../utils';

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
  it('generates array filled with zeros by default', () => {
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
  it('generates array filled with custom value', () => {
    expect(generateField({ width: 4, height: 3, valueToFill: 'test' })).toEqual([
      ['test', 'test', 'test', 'test'],
      ['test', 'test', 'test', 'test'],
      ['test', 'test', 'test', 'test'],
    ]);
  });
});

describe('fillWithInitialData()', () => {
  it('is a function', () => {
    expect(fillWithInitialData).toEqual(expect.any(Function));
  });
  it('creates an array the same size as given field', () => {
    const actual = fillWithInitialData([
      [0, 0],
      [0, 0],
    ]);
    expect(actual).toHaveLength(2);
    expect(actual[0]).toHaveLength(2);
    expect(actual[1]).toHaveLength(2);

    const actual2 = fillWithInitialData([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(actual2).toHaveLength(4);
    expect(actual2[0]).toHaveLength(3);
    expect(actual2[1]).toHaveLength(3);
    expect(actual2[1]).toHaveLength(3);
    expect(actual2[1]).toHaveLength(3);
  });
  it('doesn\'t modify initial matrix', () => {
    const initialField = Object.freeze([
      Object.freeze([0, 0, 0]),
      Object.freeze([0, 0, 0]),
      Object.freeze([0, 0, 0]),
      Object.freeze([0, 0, 0]),
    ]);
    expect(() => {
      const newField = fillWithInitialData(initialField);
      newField[0][0] = 1000;
    }).not.toThrow();
  });
  it.each([
    {
      initial: [
        [0, 0],
        [0, 0],
      ],
      expected: [
        [1, 2],
        [3, 0],
      ],
    },
    {
      initial: [
        [0, 0, 0],
        [0, 0, 0],
      ],
      expected: [
        [1, 2, 3],
        [4, 5, 0],
      ],
    },
    {
      initial: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      expected: [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 0],
      ],
    },
  ])('correctly fills matrix with values', ({ initial, expected }) => {
    const actual = fillWithInitialData(initial);
    expect(actual).toEqual(expected);
  });

  it('uses custom empty cell value when provided', () => {
    const customEmptyCellValue = 'test';
    const initial = [[0, 0], [0, 0]];
    const expected = [[1, 2], [3, customEmptyCellValue]];
    const actual = fillWithInitialData(initial, customEmptyCellValue);
    expect(actual).toEqual(expected);
  });
});

describe('shuffle()', () => {
  it('is a function', () => {
    expect(shuffle).toEqual(expect.any(Function));
  });
  it('shuffles given field', () => {
    const field = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ];
    const shuffledField = shuffle(field);
    expect(shuffledField).not.toEqual(field);
  });

  it('works with non-square field', () => {
    const field = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ];
    let shuffledField;
    expect(() => {
      shuffledField = shuffle(field);
    }).not.toThrow();
    expect(shuffledField).not.toEqual(field);
  });
});

describe('findPointByValue()', () => {
  it('is a function', () => {
    expect(findPointByValue).toEqual(expect.any(Function));
  });

  it('returns value if point is inside field', () => {
    const field = [[1, 2], [3, 0]];
    expect(findPointByValue(1, field)).toEqual({ x: 0, y: 0 });
    expect(findPointByValue(2, field)).toEqual({ x: 1, y: 0 });
    expect(findPointByValue(0, field)).toEqual({ x: 1, y: 1 });
  });

  it('returns undefined when point is outside of the field', () => {
    const field = [[1, 2], [3, 0]];
    expect(findPointByValue(-1, field)).toBeUndefined();
    expect(findPointByValue(4, field)).toBeUndefined();
  });
});

describe('isSolved()', () => {
  it('is a function', () => {
    expect(isSolved).toEqual(expect.any(Function));
  });
  it('returns true for solved field (without custom empty cell value)', () => {
    const field = [[1, 2], [3, 0]];
    expect(isSolved(field)).toBe(true);
  });
  it('returns true for solved field (with custom empty cell value)', () => {
    const emptyCellValue = 'test';
    const field = [[1, 2], [3, emptyCellValue]];
    expect(isSolved(field, emptyCellValue)).toBe(true);
  });
  it('returns false for incorrectly solved field (without custom empty cell value)', () => {
    const field = [[2, 1], [3, 0]];
    expect(isSolved(field)).toBe(false);
  });
  it('returns false for incorrectly solved field (with custom empty cell value)', () => {
    const emptyCellValue = 'test';
    const field = [[1, 2], [emptyCellValue, 3]];
    expect(isSolved(field)).toBe(false);
  });
});

describe('swapPoints()', () => {
  it('is a function', () => {
    expect(swapPoints).toEqual(expect.any(Function));
  });
  it('swaps point values', () => {
    const initial = [[1, 2], [3, 0]];
    const expected = [[0, 2], [3, 1]];
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 1, y: 1 };
    const actual = swapPoints(point1, point2, initial);
    expect(actual).toEqual(expected);
  });
  it('throws an error when first point is outside of the field', () => {
    const initial = [[1, 2], [3, 0]];
    const point1 = { x: 3, y: 3 };
    const point2 = { x: 1, y: 1 };
    expect(() => swapPoints(point1, point2, initial)).toThrow();
  });
  it('throws an error when second point is outside of the field', () => {
    const initial = [[1, 2], [3, 0]];
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 4, y: 4 };
    expect(() => swapPoints(point1, point2, initial)).toThrow();
  });
  it('does nothing when first and second point are equal', () => {
    const initial = [[1, 2], [3, 0]];
    const expected = [[1, 2], [3, 0]];
    const point1 = { x: 1, y: 0 };
    const point2 = { x: 1, y: 0 };
    const actual = swapPoints(point1, point2, initial);
    expect(actual).toEqual(expected);
  });
});

describe('getValidMovesForPoint()', () => {
  it('is a function', () => {
    expect(getValidMovesForPoint).toEqual(expect.any(Function));
  });
  it('returns two points for upper left corner and 2x2 field', () => {
    const field = [[1, 2], [3, 0]];
    const expected = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
    const actual = getValidMovesForPoint(field, { x: 0, y: 0 });
    expect(actual).toEqual(expected);
  });
  it('returns two points for lower right corner and 2x2 field', () => {
    const field = [[1, 2], [3, 0]];
    const expected = [{ x: 0, y: 1 }, { x: 1, y: 0 }];
    const actual = getValidMovesForPoint(field, { x: 1, y: 1 });
    expect(actual).toEqual(expected);
  });
  it('returns empty array for 1x1 field', () => {
    const field = [[0]];
    const expected = [];
    const actual = getValidMovesForPoint(field, { x: 0, y: 0 });
    expect(actual).toEqual(expected);
  });
  it('returns four points for center of 3x3 field', () => {
    const field = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    const expected = [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }];
    const actual = getValidMovesForPoint(field, { x: 1, y: 1 });
    expect(actual).toEqual(expected);
  });
});

describe('isPointsAreEqual()', () => {
  it('is a function', () => {
    expect(isPointsAreEqual).toEqual(expect.any(Function));
  });
  it('returns true for equal points', () => {
    const point1 = { x: 1, y: 15 };
    const point2 = { x: 1, y: 15 };
    expect(isPointsAreEqual(point1, point2)).toBe(true);
  });
  it('returns false for non-equal points', () => {
    const point1 = { x: 1, y: 15 };
    const point2 = { x: 2, y: 15 };
    const point3 = { x: 1, y: 16 };
    expect(isPointsAreEqual(point1, point2)).toBe(false);
    expect(isPointsAreEqual(point1, point3)).toBe(false);
  });
});
