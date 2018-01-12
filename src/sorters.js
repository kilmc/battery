import _ from 'lodash';
import {
  regexStringFromArray,
  subtractArrays
} from './helpers';

import { formatPrefixOrSuffix } from './formatters';

// ------------------------------------------------------------------
// ================  R E G E X  G E N E R A T O R S  ================
// ------------------------------------------------------------------

export const generateBucketRegex = (
  bucketName,
  bucketRegexTemplate,
  propsConfig
) => {
  const enableBucket = _.camelCase(`enable ${bucketName}`);
  const propNames = Object.keys(propsConfig)
    .map(prop => propsConfig[prop])
    .filter(prop => prop[enableBucket] === true)
    .reduce((xs,x) => xs.concat(x.propName),[]);

  const fullBucketRegex = bucketRegexTemplate
    .replace('propNames',regexStringFromArray(propNames));

  return { [bucketName]: fullBucketRegex };
};


// Colors regex
// ------------------------------------------------------------------

export const generateColorsRegex = (colorConfig) => (
  { 'colors': regexStringFromArray(Object.keys(colorConfig)) }
);


// Predefined Classes regex
// ------------------------------------------------------------------

export const generateManualClassNameRegex = (propsConfig) => {
  const generatedClassNames = Object.keys(propsConfig)
    .map(prop => propsConfig[prop])
    .filter(propConfig => typeof propConfig.manual === 'object' )
    .reduce((accumClassNames, propConfig) => {

      // For readability we desctructure the prop to get the
      // component parts of the class names we want to generate
      const { propName, manual: { separator = '', values } } = propConfig;

      const classNames = Object.keys(values).reduce((accumValues,value) => (
        accumValues.concat(`${propName}${separator}${value}`)
      ),[]);

      return accumClassNames.concat(classNames);
    },[]);

  return { 'manualClasses': regexStringFromArray(generatedClassNames) };
};


// Length Units regex
// ------------------------------------------------------------------
export const generateLengthUnitRegex = (config) => (
  generateBucketRegex(
    'lengthUnits',
    '(propNames(\\d+|-\\d+))',
    config
  )
);


// Integers regex
// ------------------------------------------------------------------

export const generateIntegerRegex = (config) => (
  generateBucketRegex(
    'integers',
    '(propNames(\\d+|-\\d+))',
    config
  )
);


// Regex object
// ------------------------------------------------------------------

export const generateRegexes = (config) => {
  let regexes;
  const { props, colors } = config;
  const propsKeys = Object.keys(props);

  const hasColors = typeof colors === 'object';

  const hasIntegers = propsKeys
    .map(prop => props[prop].enableIntegers)
    .some(x => x === true);

  const hasLengthUnits = propsKeys
    .map(prop => props[prop].enableLengthUnits)
    .some(x => x === true);

  const hasManualConfigs = propsKeys
    .map(prop => props[prop].manual)
    .some(x => typeof x === 'object');

  if (hasColors) {
    regexes = {
      ...regexes,
      ...generateColorsRegex(colors)
    };
  }

  if (hasManualConfigs) {
    regexes = {
      ...regexes,
      ...generateManualClassNameRegex(props)
    };
  }

  if (hasIntegers) {
    regexes = {
      ...regexes,
      ...generateIntegerRegex(props)
    };
  }

  if (hasLengthUnits) {
    regexes = {
      ...regexes,
      ...generateLengthUnitRegex(props)
    };
  }

  return regexes;
};


// ------------------------------------------------------------------
// ========================  S O R T E R S  =========================
// ------------------------------------------------------------------

export const sortClasses = (arr, config) => {
  let sortingArr = arr;
  const regexes = generateRegexes(config);

  const sortedClasses = Object.keys(regexes)
    .reduce((sortGroups, sortGroup) => {
      const matchedClasses = sortingArr
        .filter(cx => cx.match(regexes[sortGroup]));

      sortGroups[sortGroup] = matchedClasses;

      // Remove any sorted classes from the sortingArr
      sortingArr = subtractArrays(sortingArr,matchedClasses);

      return sortGroups;
    },{});

  return {
    ...sortedClasses,
    leftovers: sortingArr
  };
};

// Breakpoints
// ------------------------------------------------------------------

export const sortBreakpoints = (classes,breakpointsConfig) => {
  const { breakpoints, prefixorSuffix, separator } = breakpointsConfig;
  let allClasses = classes;

  const breakpointsRegex = regexStringFromArray(
    Object.keys(breakpoints)
      .map(breakpoint =>
        formatPrefixOrSuffix(breakpoint,separator,prefixorSuffix)));

  const breakpointClasses = Object.keys(classes)
    .filter(x => x.match(breakpointsRegex))
    .reduce((accum,cx) => {
      const matchedBreakpoint = cx
        .match(breakpointsRegex)[0]
        .replace(separator,'');

      accum[matchedBreakpoint] = {
        ...accum[matchedBreakpoint],
        [cx]: classes[cx]
      };
      Reflect.deleteProperty(allClasses,cx);
      return accum;
    },{});

  return {
    all: allClasses,
    ...breakpointClasses
  };
};
