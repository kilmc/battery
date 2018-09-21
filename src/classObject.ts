import { createPluginsObject } from './plugins/index';
import { generateValuePluginRegexObj } from './sequencers';
import { getPluginPropConfigs } from './plugins/index';

import {
  getKeywordClassObjs,
  generateKeywordValueObjs
} from './plugins/keywordValueType';

import {
  ClassObject,
  PropConfig,
  PluginConfig,
  ConcattablePropConfigKeys
} from './types/index';

export const generateClassObject = ({
  className,
  cssProps,
  value
}: {
  className: string;
  cssProps: string;
  value: string;
}): ClassObject => {
  const eachProp = cssProps
    .split(' ')
    .reduce((props: { [key: string]: string }, prop: string) => {
      props[prop] = value;
      return props;
    }, {});
  return { [className]: eachProp };
};

const getPropConfigValue = (key: ConcattablePropConfigKeys) => (
  cxPropName: string,
  propConfigs: PropConfig[]
) => {
  if (cxPropName === '') {
    return propConfigs
      .filter(x => x.pluginDefault === true)
      .map(x => x[key])
      .reduce((xs: string[], x) => xs.concat(x), [])
      .filter(x => x !== undefined);
  } else {
    return propConfigs
      .filter(x => {
        const { propName, separator = '' } = x;
        return cxPropName === propName + separator;
      })
      .map(x => x[key])
      .reduce((xs: string[], x) => xs.concat(x), [])
      .filter(x => x !== undefined);
  }
};

const getProps = getPropConfigValue('prop');

const modifyValue = (
  value: string,
  modifier: string,
  pluginConfig: PluginConfig
): string => {
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

const getValue = (
  value: string,
  modifier: string,
  pluginConfig: PluginConfig,
  lookupValues: { [key: string]: string }
): string => {
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

const isRestrictedValue = (
  value: string,
  propName: string,
  propConfigs: PropConfig[]
): boolean => {
  const allowedValues = getAllowedValues(propName, propConfigs);
  const disallowedValues = getDisallowedValues(propName, propConfigs);

  if (allowedValues.length) return !allowedValues.includes(value);
  if (disallowedValues.length) return disallowedValues.includes(value);
  return false;
};

const convertClassNameToClassObj = (
  className: string,
  sequencedRegexes: { [key: string]: string },
  pluginConfig: PluginConfig,
  propConfigs: PropConfig[],
  lookupValues?: { [key: string]: string }
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

function sortObjKeysAlphabetically(obj: {
  [key: string]: string;
}): { [key: string]: string } {
  let ordered: { [key: string]: string } = {};
  Object.keys(obj)
    .sort()
    .forEach(function(key) {
      ordered[key] = obj[key];
    });
  return ordered;
}

export const convertClassNamestoClassObjs = (
  sortedClassNames: { [key: string]: string[] },
  plugins: PluginConfig[],
  props: PropConfig[]
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

      classNames.forEach((cx: string) => {
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
