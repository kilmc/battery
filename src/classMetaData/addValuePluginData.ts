import { ClassMetaData } from '../types/classname';
import { Matchers } from '../types/matchers';
import { PluginConfig } from '../types/plugin-config';

export const addValuePluginData = (
  classMetaArr: ClassMetaData[],
  valuePluginMatchers: Matchers,
  plugins: PluginConfig[],
): ClassMetaData[] => {
  return classMetaArr.map(classMeta => {
    if (classMeta.keyword) return classMeta;
    const pluginName = Object.entries(valuePluginMatchers).find(([, regex]) => {
      return regex.test(classMeta.source);
    });

    const plugin: PluginConfig = plugins.find(
      pluginConfig => pluginConfig.name === pluginName[0],
    );

    classMeta.valuePlugin = plugin;

    if (plugin.type === 'lookup' || plugin.type === 'pattern') {
      classMeta.valuePluginType = plugin.type;
    }

    return classMeta;
  });
};
