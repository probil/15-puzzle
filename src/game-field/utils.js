/**
 * 2D array of positive numbers that represents game field
 * @typedef {(number[][])} GameField
 * @example
 * [
 *  [1,   2,  3,  4],
 *  [5,   6,  7,  8],
 *  [9,  10, 11, 12],
 *  [13, 14, 15,  0],
 * ]
 */

/**
 * @param {number} height
 * @param {number} width
 * @return {GameField}
 */
export const generateField = ({ height, width }) => {
  if (height < 2) throw new Error('Field height should be larger then 2 squares');
  if (width < 2) throw new Error('Field width should be larger then 2 squares');
  return Array(height).fill(0)
    .map(() => Array(width).fill(0));
};

/**
 * @param {GameField} field
 * @returns {GameField}
 */
export const fillWithInitialData = (field) => {
  let startNumber = 0;
  const newField = field.map(row => (
    row.map(() => {
      startNumber += 1;
      return startNumber;
    })
  ));
  newField[field.length - 1][field[0].length - 1] = 0;
  return newField;
};

/**
 * Generates random int 0..to (inclusive)
 * @param to - max value
 * @return {number}
 */
const randomInt = to => Math.floor(Math.random() * to);

/**
 * @param {*} value
 * @return {*}
 */
const deepCopy = value => JSON.parse(JSON.stringify(value));

/**
 * TODO: Rewrite to generate only solvable fields
 * @param {GameField} field
 * @param {number=10} iterations
 * @returns {GameField}
 */
export const shuffle = (field, iterations = 100) => {
  /** @type {GameField} */
  const intermediateField = deepCopy(field);
  const fieldHeight = field.length;
  const fieldWidth = field[0].length;
  for (let i = 0; i < iterations; i += 1) {
    const firstRandomPointX = randomInt(fieldWidth);
    const firstRandomPointY = randomInt(fieldHeight);
    const secondRandomPointX = randomInt(fieldWidth);
    const secondRandomPointY = randomInt(fieldHeight);

    const firstPointValue = intermediateField[firstRandomPointY][firstRandomPointX];
    const secondPointValue = intermediateField[secondRandomPointY][secondRandomPointX];

    intermediateField[firstRandomPointY][firstRandomPointX] = secondPointValue;
    intermediateField[secondRandomPointY][secondRandomPointX] = firstPointValue;
  }
  return intermediateField;
};
