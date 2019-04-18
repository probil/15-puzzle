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
