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
