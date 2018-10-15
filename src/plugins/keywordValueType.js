import { subtractArrays } from '../utils';

export const getKeywordClassObjs = (classNames, precompiledClassObjects) => {
  if (!precompiledClassObjects) return null;

  const atomKeys = Object.keys(precompiledClassObjects);
  const keywordRegex = new RegExp(
    `(.*?)(${atomKeys.sort((a, b) => b.length - a.length).join('|')})(.*)`
  );

  const matchedClassNames = classNames.filter(x => x.match(keywordRegex));

  const returnedAtoms = matchedClassNames.reduce((accum, cx) => {
    const cleanClass = cx.replace(keywordRegex, '$2');

    accum[cx] = precompiledClassObjects[cleanClass];
    return accum;
  }, {});

  subtractArrays(classNames, matchedClassNames);
  return returnedAtoms;
};
