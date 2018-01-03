export const nestedKey = (obj,key) => Object.keys(obj).map(x => obj[x][key]);

export const regexStringFromArray = (arr, fn = x => `${x}`) => {
  const propMatches = arr
    .map(fn)
    .join("|");
  return `(${propMatches})`;
};
