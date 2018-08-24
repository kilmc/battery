export const parseStyleBlock = (string) => {
  const [selectors, body] = string
    .match(/(.*)\{([^}]+)\}/)
    .splice(1);

  const parsedBody = body
    .replace(/\s/g,'')
    .split(';')
    .filter(x => x !== '')
    .reduce((acc,declaration) => {
      const [prop,value] = declaration.split(':');
      acc[prop] = value;

      return acc;
    },{});

  return { [selectors.trim()]: parsedBody };
};

export const parseStyleBlocks = (string) => {
  const parsedBlocks = string.match(/.*\{[^}]+\}/g);

  return parsedBlocks.map(parseStyleBlock);
};

export const formatKeywordValue = (srcValue,keywordValuesConfig) => {
  const { values, separator = '' } = keywordValuesConfig;
  const value = Object
    .entries(values)
    .filter(([,value]) => value === srcValue)[0][0];

  return `${separator}${value}`;
};

export const formatPluginValue = (srcValue,propConfig,config) => {
  const { enablePlugin } = propConfig;
  const { type, values } = config.plugins.filter(plugin => plugin.name === enablePlugin)[0];

  if (type === 'pattern') {
    return srcValue;
  } else if (type === 'lookup') {
    return Object.entries(values)
      .filter(([,value]) => value.toLowerCase() === srcValue.toLowerCase())[0][0];
  } else {
    return undefined;
  }
};

export const determineValueType = (srcValue,propConfig,config) => {
  const { keywordValues, enablePlugin } = propConfig;

  let isKeywordValue;
  let isPluginValue;

  if (keywordValues) {
    isKeywordValue = Object
      .entries(keywordValues.values)
      .filter(([,value]) => value === srcValue)[0];
  }

  if (enablePlugin) {
    const { valueRegexString } = config.plugins
      .filter(plugin => plugin.name === enablePlugin);

    isPluginValue = new RegExp(valueRegexString).test(srcValue);
  }

  if (isKeywordValue) {
    return 'keyword';
  } else if (isPluginValue) {
    return 'plugin';
  }
  else {
    return undefined;
  }
};

export const determineValue = (srcValue,propConfig,config) => {
  const valueType = determineValueType(srcValue,propConfig,config);

  switch(valueType) {
    case 'keyword':
      return formatKeywordValue(srcValue,propConfig.keywordValues);
    case 'plugin':
      return formatPluginValue(srcValue,propConfig,config);
    default:
      return `[no value found for '${srcValue}']`;
  }
};

export const declarationsToClassName = (declarations,config) => {
  return Object.entries(declarations).reduce((acc,declaration) => {
    const [srcProp,srcValue] = declaration;
    const propConfig = config.props
      .filter(({ prop }) => prop === srcProp)[0];

    const value = determineValue(srcValue,propConfig,config);
    const { propName, separator = ''} = propConfig;

    return acc.concat(`${propName}${separator}${value}`);
  },[]);
};

export const styleBlockToClassNames = (string,config) => {
  const parsedBlock = parseStyleBlock(string);

  return Object.keys(parsedBlock).reduce((acc,selector) => {
    acc[selector] = declarationsToClassName(parsedBlock[selector],config);
    return acc;
  },{});
};
