import { ClassMetaData } from '../types/classname';
import { PluginConfig } from '../types/plugin-config';

const addAffixData = (
  affixType: 'prefix' | 'suffix',
  affix: string,
  plugins: PluginConfig[],
) => {
  const affixPlugins = plugins.filter(plugin => plugin.affixType === affixType);
  const matchedPlugin = affixPlugins.find(plugin => {
    return plugin.modifiers
      .map(modifier => modifier.identifier)
      .includes(affix);
  });

  if (!matchedPlugin) {
    return {};
  }

  const matchedModifier = matchedPlugin.modifiers.find(
    modifier => modifier.identifier === affix,
  );

  const pluginType = matchedPlugin.type;
  const modifierName = matchedModifier.name;

  let affixData: {
    atrulePlugin?: PluginConfig;
    atruleModifier?: string;
    selectorPlugin?: PluginConfig;
    selectorModifier?: string;
  } = {};

  if (pluginType === 'at-rule') {
    affixData.atrulePlugin = matchedPlugin;
    affixData.atruleModifier = modifierName;
  } else if (pluginType === 'selector') {
    affixData.selectorPlugin = matchedPlugin;
    affixData.selectorModifier = modifierName;
  }

  return affixData;
};

export const addClassPluginData = (
  classMetaArr: ClassMetaData[],
  plugins: PluginConfig[],
): ClassMetaData[] => {
  if (plugins && plugins.filter(plugin => plugin.affixType).length < 1) {
    return classMetaArr;
  }

  return classMetaArr.map(classMeta => {
    const { prefix, suffix } = classMeta.explodedSource;
    let prefixData = {};
    let suffixData = {};

    if (prefix) {
      prefixData = addAffixData('prefix', prefix, plugins);
    }

    if (suffix) {
      suffixData = addAffixData('suffix', suffix, plugins);
    }
    return { ...classMeta, ...prefixData, ...suffixData };
  });
};
