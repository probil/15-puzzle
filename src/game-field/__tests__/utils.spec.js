import { generateField, fillWithInitialData, shuffle } from '../utils';

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
