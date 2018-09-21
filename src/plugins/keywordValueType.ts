import { subtractArrays } from '../utils';
import { generateClassObject } from '../classObject';
import { PropConfig } from '../types/index';

export const generateKeywordValueObjs = (
  props: PropConfig[]
): { [key: string]: { [key: string]: string } } => {
  const propConfigsWithKeywordValues = Object.keys(props)
    .map((prop: string) => props[prop])
    .filter(propConfig => typeof propConfig.keywordValues === 'object');

  return propConfigsWithKeywordValues.reduce((accum, propConfig) => {
    const {
      prop,
      propName,
      keywordValues: { separator = '', values }
    } = propConfig;

    const classNames = Object.keys(values).reduce((classObjects, valueName) => {
      classObjects = {
        ...classObjects,
        ...generateClassObject({
          className: `${propName}${
            valueName === 'default' ? '' : separator + valueName
          }`,
          cssProps: prop,
          value: values[valueName]
        })
      };

      return classObjects;
    }, {});

    accum = {
      ...accum,
      ...classNames
    };
    return accum;
  }, {});
};

export const getKeywordClassObjs = (
  classNames: string[],
  precompiledClassObjects: { [key: string]: { [key: string]: string } }
) => {
  if (!precompiledClassObjects) return null;

  const atomKeys = Object.keys(precompiledClassObjects);
  const keywordRegex = new RegExp(
    `(.*?)(${atomKeys.sort((a, b) => b.length - a.length).join('|')})(.*)`
  );

  const matchedClassNames = classNames.filter(x => x.match(keywordRegex));

  const returnedAtoms = matchedClassNames.reduce(
    (accum: { [key: string]: { [key: string]: string } }, cx) => {
      const cleanClass = cx.replace(keywordRegex, '$2');

      accum[cx] = precompiledClassObjects[cleanClass];
      return accum;
    },
    {}
  );

  subtractArrays(classNames, matchedClassNames);
  return returnedAtoms;
};
