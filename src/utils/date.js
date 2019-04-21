// eslint-disable-next-line import/prefer-default-export
export const differenceInSeconds = (from, to) => {
  const diff = +new Date(to) - new Date(from);
  return Math.round(diff / 1000);
};
