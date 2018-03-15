import { createPluginsObject } from './plugins/';
import { generateValuePluginRegexSequencer } from './sequencers';
import {
  getPluginPropConfigs,
  PLUGIN_TYPES
} from './plugins/';

export const generateClassObject = ({
  className,
  cssProps,
  value,
}) => {
  const eachProp = cssProps
    .split(' ')
    .reduce((props,prop) => {
      props[prop] = value;
      return props;
    },{});
  return ( { [className]: eachProp } );
};

const getProps = (cxPropName,propConfigs) => propConfigs
  .filter(x => {
    const { propName, separator = '' } = x;
    return cxPropName === propName+separator;
  })
  .map(x => x.prop)
  .join('');

const convertClassNameToClassObj = (className,sequencedRegexes,pluginName,propConfigs,lookupValues) =>
  Object.keys(sequencedRegexes)
    .sort((a,b) => b - a)
    .reduce((zs,charLength) => {
      const regexString = sequencedRegexes[charLength][pluginName];
      if (regexString === undefined) return zs;

      const classNameArr = className.match(regexString);
      if (classNameArr === null) return zs;

      const propName = classNameArr[2];
      let value = classNameArr[3];

      if (lookupValues) { value = lookupValues[value]; }

      console.log(className);
      console.log(getProps(propName,propConfigs));

      const convertedClassObj = generateClassObject({
        className: className,
        cssProps: getProps(propName,propConfigs),
        value
      });

      zs = { ...zs, ...convertedClassObj };
      return zs;
    },{});


export const convertClassNamestoClassObjs = (sortedClassNames,plugins,props) => {
  const pluginNames = Object.keys(sortedClassNames);
  const pluginRegexes = generateValuePluginRegexSequencer(plugins,props);
  const pluginsObject = createPluginsObject(plugins);

  const convertedClassNames = pluginNames
    .reduce((xs,pluginName) => {
      const { name, type, values } = pluginsObject[pluginName];

      const classNames = sortedClassNames[name];
      const propConfigs = getPluginPropConfigs(name,props);
      const sequencedRegexes = pluginRegexes[type];

      classNames.forEach(cx => {
        let convertedClassName;
        if (values) {
          convertedClassName = convertClassNameToClassObj(cx,sequencedRegexes,name,propConfigs,values);
        } else {
          convertedClassName =convertClassNameToClassObj(cx,sequencedRegexes,name,propConfigs);
        }

        xs = { ...xs, ...convertedClassName };
      });
      return xs;
    },{});

  return convertedClassNames;
};
