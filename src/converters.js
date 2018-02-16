import { regexStringFromArray, subtractArrays } from './helpers';
import _ from 'lodash';

import {
  generateAtom,
  formatBorderProp,
  formatLengthUnitValue
} from './formatters';

// ------------------------------------------------------------------
// =====================  C O N V E R T E R S  ======================
// ------------------------------------------------------------------

export const convertSubProps = (config) => {
  const { props: propsConfigs } = config;

  const subPropConfigs = Object.keys(propsConfigs)
    .map(x => propsConfigs[x])
    .filter(x => typeof x.subProps === 'object');

  const convertedPropConfigs = subPropConfigs
    .map(subPropConfig => {
      const { prop, propName, subProps, subPropSeparator = '', ...rest } = subPropConfig;

      return Object.keys(subProps)
        .reduce((accumPropConfigs, x) => {
          const propConfigName = _.camelCase(`${prop} ${subProps[x]}`);
          const subProp = subProps[x].split(' ');
          const processedSubProp = prop.match('border')
            ? subProp.map(y => formatBorderProp(prop,y)).join(' ')
            : subProp.map(y => `${prop}-${y}`).join(' ');

          accumPropConfigs[propConfigName] = {
            prop: processedSubProp,
            propName: `${propName}${subPropSeparator}${x}`,
            ...rest
          };

          return accumPropConfigs;
        },{});
    }).reduce((accum,x) => accum = { ...accum, ...x },{});

  return {
    ...config,
    props: { ...config.props, ...convertedPropConfigs }
  };
};

// Colors
// ------------------------------------------------------------------

export const colorsConverter = (arr, config) => {
  if (!arr) return null;
  const { props, colors } = config;
  const colorKeys = Object.keys(colors);
  let sortingArr = arr;
  let emptyStringProp;

  // Filters out only propConfig objects with enableColors: true
  let colorProps = Object.keys(props)
    .map(prop => props[prop])
    .filter(prop => prop.enableColors === true);

  // Checks for a key of empty string as the propName for any prop
  const hasEmptyStringPropName = colorProps
    .some(x => x.propName === '');


  // Splits the colorProps in two to process the empty string propName
  // separately below
  if (hasEmptyStringPropName) {
    emptyStringProp = colorProps
      .filter(x => x.propName === '')
      .map(x => `${x.prop}`)
      .toString();
    colorProps = colorProps.filter(x => x.propName !== '');
  }

  const colorClasses = colorProps
    .reduce((allClasses, propConfig) => {
      const { prop, propName, separator = '' } = propConfig;

      const matchedClasses = sortingArr
        .filter(cx => cx.match(propName+separator));

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
          };

          return accum;
        },{});

      allClasses = { ...allClasses, ...convertedClasses };
      sortingArr = subtractArrays(sortingArr,matchedClasses);
      return allClasses;
    },{});

  if (hasEmptyStringPropName) {
    const emptyStringPropNameColorClasses = sortingArr
      .reduce((accum,cx) => {
        const valueName = cx
          .replace(new RegExp(`(.*?)(${regexStringFromArray(colorKeys)})(.*)`), '$2');

        accum = {
          ...accum,
          ...generateAtom({
            className: cx,
            cssProps: emptyStringProp,
            value: colors[valueName]
          })
        };

        return accum;
      },{});
    return { ...emptyStringPropNameColorClasses, ...colorClasses };
  } else {
    return colorClasses;
  }
};


// Length Units
// ------------------------------------------------------------------

export const lengthUnitsConverter = (arr, config) => {
  if (!arr) return null;
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
    .filter(prop => prop.enableLengthUnits === true);

  const lengthUnitClasses = lengthUnitProps
    .reduce((allClasses, propConfig) => {
      const { prop, propName, separator = '' } = propConfig;

      const matchedClasses = arr
        .filter(cx => cx.match(new RegExp(`(${propName}${separator}(\\d+|-\\d))`)));

      const convertedClasses = matchedClasses
        .reduce((accum, cx) => {
          const [,,, length, lengthUnit] = cx.match(new RegExp(`(.*?)(${propName}${separator})(\\d+|-\\d)(.*)`));
          let value = '';

          if (hasEmptyStringIndicator && cx.match(matchNoSuffix)) {
            value = formatLengthUnitValue(length, lengthUnit, config);
          } else {
            value = formatLengthUnitValue(length, '', config);
          }

          accum = {
            ...accum,
            ...generateAtom({
              className: cx,
              cssProps: prop,
              value,
            }),
          };

          return accum;
        },{});

      allClasses = { ...allClasses, ...convertedClasses };
      return allClasses;
    },{});

  return lengthUnitClasses;
};

// Integers
// ------------------------------------------------------------------

export const integersConverter = (arr, config) => {
  if (!arr) return null;
  const { props } = config;

  const integerProps = Object.keys(props)
    .map(prop => props[prop])
    .filter(prop => prop.enableIntegers === true);

  const integerClasses = integerProps
    .reduce((allClasses, propConfig) => {
      const { prop, propName, separator = '' } = propConfig;

      const matchedClasses = arr
        .filter(cx => cx.match(propName+separator));

      const convertedClasses = matchedClasses
        .reduce((accum,cx) => {
          const value = cx.replace(
            new RegExp(`(.*?)(${propName}${separator})(\\d+|-\\d+)(.*)`), '$3');
          accum = {
            ...accum,
            ...generateAtom({
              className: cx,
              cssProps: prop,
              value
            })
          };

          return accum;
        },{});

      allClasses = { ...allClasses, ...convertedClasses };
      return allClasses;
    },{});

  return integerClasses;
};

// Manual Class Names
// ------------------------------------------------------------------

export const generateManualAtoms = (props) => (
  Object.keys(props)
    .map(prop => props[prop])
    .filter(propConfig => typeof propConfig.manual === 'object' )
    .reduce((accumClassNames, propConfig) => {

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
          };

          return accumAtoms;
        },{});

      accumClassNames = {
        ...accumClassNames,
        ...classNames
      };
      return accumClassNames;
    },{})
);

export const manualClassNameConverter = (arr, config) => {
  if (!arr) return null;
  const { props } = config;

  const generatedAtoms = generateManualAtoms(props);

  const generatedAtomsKeys = Object.keys(generatedAtoms);
  const returnedAtoms = arr
    .reduce((accum, cx) => {
      const cleanClass = cx.replace(
        new RegExp(`(.*?)${regexStringFromArray(generatedAtomsKeys)}(.*)`), '$2');
      accum[cx] = generatedAtoms[cleanClass];
      return accum;
    },{});

  return returnedAtoms;
};

// Pseudo Selectors
// ------------------------------------------------------------------

export const addPseudoSelectors = (classes,pseudoConfig) => {
  // TODO: Possible issue with mutation
  Object.keys(pseudoConfig)
    .reduce((accum,selector) => {
      const { pseudoName, pseudo } = pseudoConfig[selector];

      Object.keys(classes)
        .filter(x => x.match(pseudoName))
        .reduce((accumCxs, cx) => {
          classes[`${cx}:${pseudo}`] = classes[cx];
          Reflect.deleteProperty(classes,cx);
        },{});

    },{});
  return classes;
};
