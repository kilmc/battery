import { ClassMetaData } from 'types/classname';
import { Matchers } from 'types/matchers';
import { Plugin } from 'types/plugin-config';

export const addValuePluginData = (
  classMetaArr: ClassMetaData[],
  valuePluginMatchers: Matchers,
  plugins: Plugin[],
): ClassMetaData[] => {
  return classMetaArr.map(classMeta => {
    if (classMeta.keyword) return classMeta;
    const pluginName = Object.entries(valuePluginMatchers).find(
      ([_, regex]) => {
        return regex.test(classMeta.source);
      },
    );

    const plugin: Plugin = plugins.find(
      pluginConfig => pluginConfig.name === pluginName[0],
    );

    classMeta.valuePlugin = plugin.name;

    if (plugin.type === 'lookup' || plugin.type === 'pattern') {
      classMeta.valuePluginType = plugin.type;
    }

    return classMeta;
  });
};
