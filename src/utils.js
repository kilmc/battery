// Strings
// ------------------------------------------------------------------
export const capitalize = (key) => key
  .replace(
    key.charAt(0),
    key.charAt(0).toUpperCase()
  );

// Objects
// ------------------------------------------------------------------
export const filterObject = (filterFn, obj) => Object.keys(obj)
  .map(x => obj[x])
  .filter(filterFn);

// Arrays
// ------------------------------------------------------------------
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

// Matching
// ------------------------------------------------------------------
export const hasX = (obj,matchFn) => Object.keys(obj)
  .map(x => obj[x])
  .some(matchFn);


// Formatters
export const formatPrefixOrSuffix = (x,y,prefixOrSuffix) => {
  return prefixOrSuffix === 'prefix' ? `${x}${y}` : `${y}${x}`;
};

export const sortAndJoin = (arr) => arr.sort((a,b) => b.length - a.length).join('|');