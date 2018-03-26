import { subtractArrays } from '../utils';
import { generateClassObject } from '../classObject';

export const generateKeywordValueObjs = (props) => {
  const propConfigsWithKeywordValues =
    Object.keys(props)
      .map(prop => props[prop])
      .filter(propConfig => typeof propConfig.keywordValues === 'object');

  return propConfigsWithKeywordValues
    .reduce((accum, propConfig) => {
      const {
        prop, propName,
        keywordValues: {
          separator = '',
          values
        }
      } = propConfig;

      const classNames = Object.keys(values)
        .reduce((classObjects,valueName) => {
          classObjects = {
            ...classObjects,
            ...generateClassObject({
              className: `${propName}${separator}${valueName}`,
              cssProps: prop,
              value: values[valueName]
            })
          };

          return classObjects;
        },{});

      accum = {
        ...accum,
        ...classNames
      };
      return accum;
    },{});
};

export const getKeywordClassObjs = (classNames, precompiledClassObjects) => {
  if (!precompiledClassObjects) return null;

  const atomKeys = Object.keys(precompiledClassObjects);
  const keywordRegex = new RegExp(`(.*?)(${atomKeys.sort((a,b) => b.length - a.length).join('|')})(.*)`);

  const matchedClassNames = classNames
    .filter(x => x.match(keywordRegex));

  const returnedAtoms = matchedClassNames
    .reduce((accum, cx) => {
      const cleanClass = cx.replace(keywordRegex, '$2');

      accum[cx] = precompiledClassObjects[cleanClass];
      return accum;
    },{});

  subtractArrays(classNames,matchedClassNames);
  return returnedAtoms;
};
