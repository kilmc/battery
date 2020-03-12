export const capitalizeFirstLetter = (x: string) =>
  x.charAt(0).toUpperCase() + x.slice(1);

export function sortAlphaNum(a: string, b: string) {
  const alphaRegex = /[^a-zA-Z]/g;
  const numberRegex = /[^0-9]/g;
  const aAlpha = a.replace(alphaRegex, '');
  const bAlpha = b.replace(alphaRegex, '');

  if (aAlpha === bAlpha) {
    const aNumbers = parseInt(a.replace(numberRegex, ''), 10);
    const bNumber = parseInt(b.replace(numberRegex, ''), 10);
    return aNumbers === bNumber ? 0 : aNumbers > bNumber ? 1 : -1;
  } else {
    return aAlpha > bAlpha ? 1 : -1;
  }
}
