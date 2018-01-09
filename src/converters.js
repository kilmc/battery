import { regexStringFromArray } from './helpers';
import {
  generateAtom,
  formatLengthUnitValue
} from './formatters';

// ------------------------------------------------------------------
// =====================  C O N V E R T E R S  ======================
// ------------------------------------------------------------------

// Colors
// ------------------------------------------------------------------

export const colorsConverter = (arr, config) => {
  const { props, colors } = config;
  const colorKeys = Object.keys(colors);

  // Filters out only propConfig objects with enableColors: true
  const colorProps = Object.keys(props)
    .map(prop => props[prop])
    .filter(prop => prop.enableColors === true)

  // Checks for a key of empty string as the propName for any prop

  const colorClasses = colorProps
    .reduce((allClasses, propConfig) => {
      const { prop, propName, separator = '' } = propConfig;

      const matchedClasses = arr
        .filter(cx => cx.match(propName+separator))

      const convertedClasses = matchedClasses
        .reduce((accum,cx) => {
          const valueName = cx.replace(
            new RegExp(`(.*?)${regexStringFromArray(colorKeys)}(.*)`), '$2');
          accum = {
            ...accum,
            ...generateAtom({
              className: cx,
              cssProps: prop,
              value: colors[valueName]
            })
          }

          return accum
        },{})

      allClasses = { ...allClasses, ...convertedClasses }
      return allClasses
    },{})

  return colorClasses;
};


// Length Units
// ------------------------------------------------------------------

export const lengthUnitsConverter = (arr, config) => {
  const { units, props } = config;

  let matchNoSuffix;
  let unitsKeys = Object.keys(units);
  const hasEmptyStringIndicator = unitsKeys.indexOf('') !== -1;

  if (hasEmptyStringIndicator) {
    unitsKeys.splice(unitsKeys.indexOf(''),1);

    matchNoSuffix = `(.*?)(\\d+)${regexStringFromArray(unitsKeys, x => `\\B${x}`)}(.*)`;
  }

  const lengthUnitProps = Object.keys(props)
    .map(prop => props[prop])
    .filter(prop => prop.enableLengthUnits === true)

  const lengthUnitClasses = lengthUnitProps
    .reduce((allClasses, propConfig) => {
      const { prop, propName, separator = '' } = propConfig;

      const matchedClasses = arr
        .filter(cx => cx.match(new RegExp(`(${propName}${separator}(\\d+|-\\d))`)));

      const convertedClasses = matchedClasses
        .reduce((accum,cx) => {
          const [ ,,, length, lengthUnit] = cx.match(new RegExp(`(.*?)(${propName}${separator})(\\d+|-\\d)(.*)`))
          let value = '';

          if (hasEmptyStringIndicator && cx.match(matchNoSuffix)) {
            value = formatLengthUnitValue(length,lengthUnit,config)
          } else {
            value = formatLengthUnitValue(length,"",config)
          }

          accum = {
            ...accum,
            ...generateAtom({
              className: cx,
              cssProps: prop,
              value
            })
          }

          return accum
        },{})

      allClasses = { ...allClasses, ...convertedClasses }
      return allClasses
    },{})

  return lengthUnitClasses
};

// Integers
// ------------------------------------------------------------------

export const integersConverter = (arr, config) => {
  const { props } = config;

  const integerProps = Object.keys(props)
    .map(prop => props[prop])
    .filter(prop => prop.enableIntegers === true)

  const integerClasses = integerProps
    .reduce((allClasses, propConfig) => {
      const { prop, propName, separator = '' } = propConfig;

      const matchedClasses = arr
        .filter(cx => cx.match(propName+separator))

      const convertedClasses = matchedClasses
        .reduce((accum,cx) => {
          const value = cx.replace(
            new RegExp(`(.*?)(${propName}${separator})(\\d+|-\\d)(.*)`), '$3');
          accum = {
            ...accum,
            ...generateAtom({
              className: cx,
              cssProps: prop,
              value
            })
          }

          return accum
        },{})

      allClasses = { ...allClasses, ...convertedClasses }
      return allClasses
    },{})

  return integerClasses;
}

// Manual Class Names
// ------------------------------------------------------------------

export const manualClassNameConverter = (arr, config) => {
  const { props } = config;

  const generatedAtoms = Object.keys(props)
    .map(prop => props[prop])
    .filter(propConfig => typeof propConfig.manual === 'object' )
    .reduce((accumClassNames, propConfig) => {

      // For readability we desctructure the prop to get the
      // component parts of the class names we want to generate
      const { prop, propName, manual: { separator = '', values } } = propConfig;

      const classNames = Object.keys(values)
        .reduce((accumAtoms,valueName) => {
          accumAtoms = {
            ...accumAtoms,
            ...generateAtom({
              className: `${propName}${separator}${valueName}`,
              cssProps: prop,
              value: values[valueName]
            })
          }
          return accumAtoms
        },{})
      accumClassNames = {
        ...accumClassNames,
        ...classNames
      }
      return accumClassNames
    },{});

  const generatedAtomsKeys = Object.keys(generatedAtoms)
  const returnedAtoms = arr
    .reduce((accum, cx) => {
      const cleanClass = cx.replace(
        new RegExp(`(.*?)${regexStringFromArray(generatedAtomsKeys)}(.*)`), '$2')
      accum[cx] = generatedAtoms[cleanClass]
      return accum
    },{})

  return returnedAtoms
};

// Pseudo Selectors
// ------------------------------------------------------------------

export const addPseudoSelectors = (classes,pseudoConfig) => {
  const processedClasses = classes;

  Object.keys(pseudoConfig)
    .reduce((accum,selector) => {
      const { pseudoName, pseudo } = pseudoConfig[selector]

      Object.keys(processedClasses)
        .filter(x => x.match(pseudoName))
        .reduce((accumCxs, cx) => {
          processedClasses[`${cx}:${pseudo}`] = processedClasses[cx]
          Reflect.deleteProperty(processedClasses,cx)
        },{})

    },{})
  return processedClasses
}
