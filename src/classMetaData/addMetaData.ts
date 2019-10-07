import { ClassMetaData } from 'types/classname';
import { BatteryConfig } from 'types/battery-config';
import { addClassObjectData } from './addClassObjectData';
import { addKeywordData } from './addKeywordData';
import { addSourceData } from './addSourceData';
import { generateMatchers } from 'matchers/generateMatchers';
import { keywordToMetaData } from './keywordToMetaData';
import { addPropertyData } from './addPropertyData';
import { addValuePluginData } from './addValuePluginData';
import { Matchers } from 'types/matchers';
import { Plugin } from 'types/plugin-config';
import { addExplodedSourceData } from './addExplodedSourceData';
import { addModifierPluginData } from './addModifierPluginData';

const getPlugins = (
  pluginTypes: string[],
  matchers: Matchers,
  plugins: Plugin[],
) => {
  if (!plugins) return {};

  return Object.entries(matchers)
    .filter(([matcherName, _]) => {
      const valuePlugins = plugins
        .filter(plugin => pluginTypes.includes(plugin.type))
        .map(plugin => `${plugin.name}`);

      return valuePlugins.includes(matcherName);
    })
    .reduce(
      (accum, [matcherName, regex]) => {
        accum[matcherName] = regex;
        return accum;
      },
      {} as Matchers,
    );
};

const sortValidAndInvalid = (classMeta: ClassMetaData[]) =>
  classMeta.reduce(
    (accum, obj) => {
      if (!accum['invalidClassMeta']) {
        accum['invalidClassMeta'] = [];
      }
      if (!accum['validClassMeta']) {
        accum['validClassMeta'] = [];
      }

      accum[obj.invalid ? 'invalidClassMeta' : 'validClassMeta'].push(obj);
      return accum;
    },
    {} as {
      validClassMeta: ClassMetaData[];
      invalidClassMeta: ClassMetaData[];
    },
  );

export const addMetaData = (
  classNames: string[],
  config: BatteryConfig,
): ClassMetaData[] => {
  const keywords = keywordToMetaData(config);
  const matchers = generateMatchers(config, keywords);
  const valuePluginMatchers = getPlugins(
    ['pattern', 'lookup'],
    matchers,
    config.plugins,
  );

  const withSourceData = addSourceData(classNames, matchers);
  const { validClassMeta, invalidClassMeta } = sortValidAndInvalid(
    withSourceData,
  );

  const withKeywordData = addKeywordData(validClassMeta, matchers);
  const withValuePluginData = addValuePluginData(
    withKeywordData,
    valuePluginMatchers,
    config.plugins,
  );

  const withPropertyData = addPropertyData(
    withValuePluginData,
    matchers,
    config.props,
    keywords,
  );

  const withExplodedSourceData = addExplodedSourceData(
    withPropertyData,
    config,
    matchers,
    config.plugins,
  );

  const withModifierPlugin = addModifierPluginData(
    withExplodedSourceData,
    config.plugins,
  );

  const withClassObject = addClassObjectData(withModifierPlugin, config);

  return withClassObject;
};
