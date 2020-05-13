import { DeveloperPropertyConfig } from './../types/property-config';
import { ClassMetaData } from '../types/classname';
import { Matchers } from '../types/matchers';

export const addValuePluginData = (
  classMetaArr: ClassMetaData[],
  valuePluginMatchers: Matchers,
  propConfigs: DeveloperPropertyConfig[],
): ClassMetaData[] => {
  return classMetaArr.map(classMeta => {
    if (classMeta.keyword) return classMeta;

    const [matcherName, regex] = Object.entries(valuePluginMatchers).find(
      ([, regex]) => regex.test(classMeta.source),
    );

    const propConfig = propConfigs.find(
      config => config.cssProperty.join('') === matcherName,
    );

    classMeta.valuePlugin = propConfig.valuePlugin;

    return classMeta;
  });
};
