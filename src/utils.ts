import { PrefixOrSuffix } from './types/';

// Strings
// ------------------------------------------------------------------

export const camelize = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

// Arrays
// ------------------------------------------------------------------
export const subtractArrays = (arr1: any[], arr2: any[]): any[] => {
  let returnArr = arr1;

  arr2.map(remove => {
    const index = arr1.indexOf(remove);
    if (index !== -1) {
      returnArr.splice(index, 1);
    }
  });
  return returnArr;
};

// Formatters
export const formatPrefixOrSuffix = (
  x: string,
  y: string,
  prefixOrSuffix: PrefixOrSuffix
): string => {
  return prefixOrSuffix === 'prefix' ? `${x}${y}` : `${y}${x}`;
};

export const sortAndJoin = (arr: string[]): string =>
  arr.sort((a, b) => b.length - a.length).join('|');

export const renameKeys = (
  obj: { [key: string]: any },
  filterFn: () => boolean,
  modifierFn: Function
) => {
  Object.keys(obj)
    .filter(filterFn)
    .forEach(key => {
      obj[`${modifierFn(key)}`] = obj[key];
      Reflect.deleteProperty(obj, key);
    });
};

export const escapeCharacters = (str: string) => {
  const escapeRegex = new RegExp('([^a-zA-Zd-_])', 'g');
  return str.replace(escapeRegex, '\\$1');
};
