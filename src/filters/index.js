/* eslint-disable import/prefer-default-export */

/**
 * @param {Number} number
 * @returns {String}
 */
const pad = number => (`0${number}`).slice(-2);

/**
 * @param {Number} value
 * @return {string}
 */
export const toMMSS = (value) => {
  if (!Number.isInteger(value)) return '--:--';
  const minutes = Math.trunc(value / 60);
  const seconds = value % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
};
