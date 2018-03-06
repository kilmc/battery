import deepmerge from 'deepmerge';

import {
  regexStringFromArray,
  subtractArrays,
} from './helpers';

import {
  getConfigs,
  getFeatureConfigs
} from './features';

import { formatPrefixOrSuffix } from './formatters';

// ------------------------------------------------------------------
// ================  R E G E X  G E N E R A T O R S  ================
// ------------------------------------------------------------------

export const generateRegexGroups = (groupName,arr,regexFn) => {
  const sorted = arr.reduce((xs,x) => {
    const charCount = x.length;

    if (!xs[charCount]) {
      xs[charCount] = { [groupName]: [x] };
    } else {
      xs[charCount][groupName].push(x);
    }
    return xs;
  },{});

  Object.keys(sorted).forEach(x => {
    sorted[x][groupName] = regexFn(sorted[x][groupName]);
  });
  return sorted;
};

export const generateFeatureRegex = ({
  name,
  regexFn,
  config
}) => {
  const propNames = getFeatureConfigs(name,config)
    .reduce((xs,x) => xs.concat(x.propName),[]);

  return generateRegexGroups(name,propNames,regexFn);
};


// Colors regex
// ------------------------------------------------------------------

export const generateColorsRegex = (colorConfig) =>
  generateRegexGroups(
    'colors',
    Object.keys(colorConfig),
    (x) => `(${x.join('|')})`
  );


// Predefined Classes regex
// ------------------------------------------------------------------

export const generateManualClassNameRegex = (propsConfig) => {
  const generatedClassNames = getConfigs(
    propConfig => typeof propConfig.manual === 'object',
    propsConfig
  ).reduce((accumClassNames, propConfig) => {

    const { propName, manual: { separator = '', values } } = propConfig;

    const classNames = Object.keys(values)
      .reduce((accumValues,value) => (
        accumValues.concat(`${propName}${separator}${value}`)
      ),[]);

    return accumClassNames.concat(classNames);
  },[]);

  return generateRegexGroups(
    'manualClasses',
    generatedClassNames,
    (x) => `(${x.join('|')})`
  );
};


// Length Units regex
// ------------------------------------------------------------------
export const generateLengthUnitRegex = (propConfigs) => (
  generateFeatureRegex({
    name: 'lengthUnits',
    regexFn: (x) => `((${x.join('|')})(\\d+|-\\d+))`,
    config: propConfigs
  })
);


// Integers regex
// ------------------------------------------------------------------

export const generateIntegerRegex = (propConfigs) => (
  generateFeatureRegex({
    name: 'integers',
    regexFn: (x) => `((${x.join('|')})(\\d+|-\\d+))`,
    config: propConfigs
  })
);


// Regex object
// ------------------------------------------------------------------

export const generateRegexes = (config) => {
  let regexes = {};
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
    regexes = deepmerge(
      regexes,
      generateColorsRegex(colors)
    );
  }

  if (hasManualConfigs) {
    regexes = deepmerge(
      regexes,
      generateManualClassNameRegex(props)
    );
  }

  if (hasIntegers) {
    regexes = deepmerge(
      regexes,
      generateIntegerRegex(props)
    );
  }

  if (hasLengthUnits) {
    regexes = deepmerge(
      regexes,
      generateLengthUnitRegex(props)
    );
  }

  return regexes;
};


// ------------------------------------------------------------------
// ========================  S O R T E R S  =========================
// ------------------------------------------------------------------

export const sortClasses = (arr, config) => {
  let sortingArr = [...arr];
  const regexes = generateRegexes(config);

  const orderedLengthGroups = Object.keys(regexes).sort((a,b) => b - a);

  const sortedClasses = orderedLengthGroups.reduce((xs,x) => {
    Object.keys(regexes[x]).forEach(y => {
      const matchedClasses = sortingArr
        .filter(cx => cx.match(regexes[x][y]));

      if(matchedClasses.length !== 0) {
        if (!xs[y]) {
          xs[y] = matchedClasses;
        } else {
          xs[y] = [...xs[y], ...matchedClasses];
        }
      }
      sortingArr = subtractArrays(sortingArr,matchedClasses);
    });
    return xs;
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
