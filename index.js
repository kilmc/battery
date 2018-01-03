import {
  regexStringFromArray
} from './helpers';

// ------------------------------------------------------------------
// ================  R E G E X  G E N E R A T O R S  ================
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
      ),[])

      return accumClassNames.concat(classNames)
    },[]);

  return { "manualClassNameRegex": regexStringFromArray(generatedClassNames) };
};

export const generateLengthUnitRegex = (propsConfig) => {
  const propNames = Object.keys(propsConfig)
    .map(prop => propsConfig[prop])
    .filter(prop => prop.enableLengthUnits === true)
    .reduce((xs,x) => xs.concat(x.propName),[]);

  return {
    "lengthUnitRegex": `${regexStringFromArray(propNames)}(\\d+|-\\d+)?)`
  }
};

export const generateColorsRegex = (colorConfig) => (
  { "colorsRegex": regexStringFromArray(Object.keys(colorConfig)) }
);

export const generateRegexes = (propsConfig) => (
  {
    ...generateManualClassNameRegex(propsConfig.props),
    ...generateLengthUnitRegex(propsConfig.props),
    ...generateColorsRegex(propsConfig.colors)
  }
);

export const generate = (classNames, config) => {
  const processInput = (xs) => xs.split(' ');

  const makeLibrary = (arrAtoms) => arrAtoms.reduce((xs, x) => {
    xs[x] = { [config[x]]: '' }
    return xs
  },{});

  return JSON.stringify(makeLibrary(processInput(classNames)));
};
