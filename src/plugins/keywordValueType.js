import { filterObject, subtractArrays } from '../utils';
import { generateClassObject } from '../classObject';

export const precompileClasses = (props) => (
  filterObject(
    props,
    propConfig => typeof propConfig.keywordValues === 'object'
  ).reduce((accum, propConfig) => {
    const {
      prop,
      propName,
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
  },{})
);

export const convertKeywordClassNames = (classNames, precompiledAtoms) => {
  if (!precompiledAtoms) return null;

  const atomKeys = Object.keys(precompiledAtoms);
  const keywordRegex = new RegExp(`(.*?)(${atomKeys.join('|')})(.*)`);

  const matchedClassNames = classNames.filter(x => x.match(keywordRegex));

  const returnedAtoms = matchedClassNames
    .reduce((accum, cx) => {
      const cleanClass = cx.replace(keywordRegex, '$2');

      accum[cx] = precompiledAtoms[cleanClass];
      return accum;
    },{});

  subtractArrays(classNames,matchedClassNames);
  return returnedAtoms;
};