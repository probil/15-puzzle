import { EMPTY_CELL_VALUE } from '../../../constants';
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
 * @typedef {Object} Point
 * @property {number} x - Horizontal location
 * @property {number} y - Vertical location
 * @example
 * { x: 1, y: 0}
 */

/**
 * @param {GameField} field
 * @return {number}
 */
const getFieldHeight = field => field.length;

/**
 * @param {GameField} field
 * @return {number}
 */
const getFieldWidth = field => field[0].length;

/**
 * @param {GameField} field
 * @return {Point}
 */
const getInitialEmptyCellPoint = field => ({
  x: getFieldWidth(field) - 1,
  y: getFieldHeight(field) - 1,
});

/**
 * @param {*} value
 * @return {*}
 */
const deepCopy = value => JSON.parse(JSON.stringify(value));

/**
 * @param {GameField} field
 * @param {Point} point
 * @param {number|string} value
 * @return {GameField}
 */
const setPointValue = (field, point, value) => {
  const newField = deepCopy(field);
  newField[point.y][point.x] = value;
  return newField;
};

/**
 * @param {GameField} field
 * @param {Point} point
 * @return {number|string}
 */
const getPointValue = (field, point) => field[point.y][point.x];

/**
 * Generates random int 0..to (inclusive)
 * @param to - max value
 * @return {number}
 */
const randomInt = to => Math.floor(Math.random() * to);


/**
 * @param {number} height
 * @param {number} width
 * @param {number|string} valueToFill
 * @return {GameField}
 */
export const generateField = ({ height, width, valueToFill = EMPTY_CELL_VALUE }) => {
  if (height < 2) throw new Error('Field height should be larger then 2 squares');
  if (width < 2) throw new Error('Field width should be larger then 2 squares');
  return Array(height).fill(0)
    .map(() => Array(width).fill(valueToFill));
};

/**
 * @param {GameField} field
 * @param {number|string} emptyCellValue
 * @returns {GameField}
 */
export const fillWithInitialData = (field, emptyCellValue = EMPTY_CELL_VALUE) => {
  let startNumber = 0;
  const newField = field.map(row => (
    row.map(() => {
      startNumber += 1;
      return startNumber;
    })
  ));
  const emptyCellPoint = getInitialEmptyCellPoint(newField);
  return setPointValue(newField, emptyCellPoint, emptyCellValue);
};

/**
 * TODO: Rewrite to generate only solvable fields
 * @param {GameField} field
 * @param {number=100} iterations
 * @returns {GameField}
 */
export const shuffle = (field, iterations = 100) => {
  /** @type {GameField} */
  const intermediateField = deepCopy(field);
  const fieldHeight = getFieldHeight(field);
  const fieldWidth = getFieldWidth(field);
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

/**
 * @param {number|EMPTY_CELL_VALUE} value
 * @param {GameField} field
 * @returns {?Point}
 */
export const findPointByValue = (value, field) => {
  for (let y = 0; y < field.length; y += 1) {
    for (let x = 0; x < field[y].length; x += 1) {
      if (field[y][x] === value) {
        return { x, y };
      }
    }
  }
  return undefined;
};

/**
 * @param {GameField} field
 * @param {string|number} emptyCellValue
 * @return {boolean}
 */
export const isSolved = (field, emptyCellValue = EMPTY_CELL_VALUE) => {
  let desiredValue = 1;
  const emptyCellPoint = getInitialEmptyCellPoint(field);
  const isEmptyCellPoint = point => point.x === emptyCellPoint.x && point.y === emptyCellPoint.y;
  for (let y = 0; y < field.length; y += 1) {
    for (let x = 0; x < field[y].length; x += 1) {
      const currentPoint = { x, y };
      const valueToCompare = isEmptyCellPoint(currentPoint) ? emptyCellValue : desiredValue;
      if (field[y][x] !== valueToCompare) return false;
      desiredValue += 1;
    }
  }
  return true;
};

/**
 * @param {Point} point1
 * @param {Point} point2
 * @param {GameField} field
 * @return {GameField}
 */
export const swapPoints = (point1, point2, field) => {
  const point1Value = getPointValue(field, point1);
  const point2Value = getPointValue(field, point2);
  const newField = setPointValue(field, point1, point2Value);
  return setPointValue(newField, point2, point1Value);
};

/**
 * @param {Point} point
 * @param {GameField} field
 * @return {boolean}
 */
const isPointInField = (field, point) => {
  const fieldHeight = getFieldHeight(field);
  const fieldWidth = getFieldWidth(field);
  const { x, y } = point;
  return x >= 0 && y >= 0 && x < fieldWidth && y < fieldHeight;
};

/**
 * @param {GameField} field
 * @param {Point} point
 * @return {Point[]}
 */
export const getValidMovesForPoint = (field, point) => {
  const isPointInCurrentField = isPointInField.bind(null, field);
  return [
    { ...point, x: point.x + 1 },
    { ...point, x: point.x - 1 },
    { ...point, y: point.y + 1 },
    { ...point, y: point.y - 1 },
  ].filter(isPointInCurrentField);
};

/**
 * @param {Point} point1
 * @param {Point} point2
 * @return {boolean}
 */
export const isPointsAreEqual = (point1, point2) => point1.x === point2.x && point1.y === point2.y;

/**
 * @param {GameField} field
 * @param {Point} point
 * @param {number|string} emptyCellValue
 * @return {boolean}
 */
export const isValidMove = (field, point, emptyCellValue = EMPTY_CELL_VALUE) => {
  const emptyCellPoint = findPointByValue(emptyCellValue, field);
  const possibleMoves = getValidMovesForPoint(field, emptyCellPoint);
  return possibleMoves.some(isPointsAreEqual.bind(null, point));
};
