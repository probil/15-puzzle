/**
 * @param {number} height
 * @param {number} width
 * @return {number[][]}
 */
export const generateField = ({ height, width }) => {
  if (height < 2) throw new Error('Field height should be larger then 2 squares');
  if (width < 2) throw new Error('Field width should be larger then 2 squares');
  return Array(height).fill(0)
    .map(() => Array(width).fill(0));
};

/**
 * @param {number[][]} field
 * @returns {number[][]}
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
