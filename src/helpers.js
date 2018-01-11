export const regexStringFromArray = (arr, fn = x => `${x}`) => {
  const propMatches = arr
    .map(fn)
    .join('|');
  return `(${propMatches})`;
};

export const subtractArrays = (arr1,arr2) => {
  let returnArr = arr1;

  arr2.map(remove => {
    const index = arr1.indexOf(remove);
    if (index !== -1) {
      returnArr.splice(index, 1);
    }
  });
  return returnArr;
};
