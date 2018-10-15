import { createPluginsObject } from './plugins/';
import { generateValuePluginRegexObj } from './sequencers';
import { getPluginPropConfigs } from './plugins/';

import { getKeywordClassObjs } from './plugins/keywordValueType';

export const generateClassObject = ({ className, cssProps, value }) => {
  const eachProp = cssProps.split(' ').reduce((props, prop) => {
    props[prop] = value;
    return props;
  }, {});
  return { [className]: eachProp };
};

export const generateKeywordValueObjs = props => {
  const propConfigsWithKeywordValues = Object.keys(props)
    .map(prop => props[prop])
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

const getPropConfigValue = key => (cxPropName, propConfigs) => {
  if (cxPropName === '') {
    return propConfigs
      .filter(x => x.pluginDefault === true)
      .map(x => x[key])
      .reduce((xs, x) => xs.concat(x), [])
      .filter(x => x !== undefined);
  } else {
    return propConfigs
      .filter(x => {
        const { propName, separator = '' } = x;
        return cxPropName === propName + separator;
      })
      .map(x => x[key])
      .reduce((xs, x) => xs.concat(x), [])
      .filter(x => x !== undefined);
  }
};

const getProps = getPropConfigValue('prop');

const modifyValue = (value, modifier, pluginConfig) => {
  const hasDefaultModifier = pluginConfig.valueModifiers.some(
    x => x.default === true
  );
  let modifierValue;

  if (hasDefaultModifier && modifier === undefined) {
    modifier = '';
  }

  if (modifier !== undefined) {
    const valueModifier = pluginConfig.valueModifiers
      .sort((a, b) => b.indicator.length - a.indicator.length)
      .filter(x => {
        const { separator = '', indicator } = x;
        const regex = new RegExp(`${separator + indicator}`);

        if (indicator === '' && modifier !== '') {
          return false;
        } else if (modifier === separator + indicator) {
          return true;
        } else if (regex.test(modifier)) {
          modifierValue = modifier.replace(separator, '');
          return true;
        } else {
          return false;
        }
      })[0];

    return valueModifier.modifierFn(value, modifierValue);
  } else {
    return value;
  }
};

const getValue = (value, modifier, pluginConfig, lookupValues) => {
  if (lookupValues) {
    value = lookupValues[value];
  }
  if (pluginConfig.valueModifiers) {
    value = modifyValue(value, modifier, pluginConfig);
  }

  return value;
};

const getAllowedValues = getPropConfigValue('allowedValues');
const getDisallowedValues = getPropConfigValue('disallowedValues');

const isRestrictedValue = (value, propName, propConfigs) => {
  const allowedValues = getAllowedValues(propName, propConfigs);
  const disallowedValues = getDisallowedValues(propName, propConfigs);

  if (allowedValues.length) return !allowedValues.includes(value);
  if (disallowedValues.length) return disallowedValues.includes(value);
  return false;
};

const convertClassNameToClassObj = (
  className,
  sequencedRegexes,
  pluginConfig,
  propConfigs,
  lookupValues
) => {
  let previouslyMatched = 0;

  return Object.keys(sequencedRegexes).reduce((zs, pluginName) => {
    if (previouslyMatched === 1) return zs;

    const regexString = sequencedRegexes[pluginConfig.name];
    if (regexString === undefined) return zs;

    const classNameArr = className.match(regexString);
    if (classNameArr === null) return zs;

    previouslyMatched = 1;

    const propName = classNameArr[2];

    let value = classNameArr[3];
    if (isRestrictedValue(value, propName, propConfigs)) return zs;
    const valueModifier = classNameArr[4];

    const convertedClassObj = generateClassObject({
      className: className,
      cssProps: getProps(propName, propConfigs).join(''),
      value: getValue(value, valueModifier, pluginConfig, lookupValues)
    });

    zs = { ...zs, ...convertedClassObj };
    return zs;
  }, {});
};

function sortObjKeysAlphabetically(obj) {
  var ordered = {};
  Object.keys(obj)
    .sort()
    .forEach(function(key) {
      ordered[key] = obj[key];
    });
  return ordered;
}

export const convertClassNamestoClassObjs = (
  sortedClassNames,
  plugins,
  props
) => {
  const pluginNames = Object.keys(sortedClassNames);
  const pluginRegexes = generateValuePluginRegexObj(plugins, props);
  const pluginsObject = createPluginsObject(plugins);

  const convertedClassNames = pluginNames.reduce((xs, pluginName) => {
    const classNames = sortedClassNames[pluginName];

    if (pluginName === 'keyword') {
      const preCompiledKeywordObjs = generateKeywordValueObjs(props);
      xs = {
        ...xs,
        ...getKeywordClassObjs(classNames, preCompiledKeywordObjs)
      };
    } else {
      const pluginConfig = pluginsObject[pluginName];
      const { name, values } = pluginConfig;

      const propConfigs = getPluginPropConfigs(name, props);

      classNames.forEach(cx => {
        let convertedClassName;
        if (values) {
          convertedClassName = convertClassNameToClassObj(
            cx,
            pluginRegexes,
            pluginConfig,
            propConfigs,
            values
          );
        } else {
          convertedClassName = convertClassNameToClassObj(
            cx,
            pluginRegexes,
            pluginConfig,
            propConfigs
          );
        }

        xs = { ...xs, ...convertedClassName };
      });
    }

    return xs;
  }, {});

  return sortObjKeysAlphabetically(convertedClassNames);
};
