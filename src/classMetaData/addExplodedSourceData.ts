import { ClassMetaData, ExplodedClassSource } from 'types/classname';
import { BatteryConfig } from 'types/battery-config';
import { Matchers, Matcher } from 'types/matchers';
import { ValuePlugin } from 'types/plugin-config';
import { generateValueMatcher } from 'matchers/generateValuePluginMatcher';
import { UserPropConfig } from 'types/prop-config';
import { generateModifierMatchers } from 'matchers/generateModifierMatchers';
import { getMatcherName } from 'matchers/utils';

const setPropIdentifier = (
  explodedSource: ExplodedClassSource,
  propConfig: UserPropConfig,
): ExplodedClassSource => {
  const propIdentifier = propConfig.propIdentifier
    ? propConfig.propIdentifier
    : '';

  return { ...explodedSource, propIdentifier };
};

const setValueSeparator = (
  explodedSource: ExplodedClassSource,
  propConfig: UserPropConfig,
  classMeta: ClassMetaData,
): ExplodedClassSource => {
  const { keywordSeparator = '', pluginSeparator = '' } = propConfig;
  const valueSeparator = classMeta.keyword ? keywordSeparator : pluginSeparator;

  return { ...explodedSource, valueSeparator };
};

const setModifierData = (
  explodedSource: ExplodedClassSource,
  classMeta: ClassMetaData,
  matchers: Matchers,
  plugins: ValuePlugin[],
): ExplodedClassSource => {
  const value = classMeta.source.match(matchers[classMeta.valuePlugin])[3];
  const plugin = plugins.find(
    pluginConfig => pluginConfig.name === classMeta.valuePlugin,
  );

  if (plugin.modifiers) {
    const valuePluginMatcher = generateValueMatcher(plugin, true);
    const matchedModifier = value.match(valuePluginMatcher)[3];
    const modifierName = getMatcherName(
      generateModifierMatchers(plugin),
      classMeta.source,
    );

    if (!modifierName) {
      return { ...explodedSource };
    }

    const modifier = plugin.modifiers.find(m => m.name === modifierName[0]);
    const { separator: modifierSeparator = '' } = modifier;
    return {
      ...explodedSource,
      modifierSeparator,
      modifierIdentifier:
        typeof modifier.identifier === 'string'
          ? modifier.identifier
          : matchedModifier.replace(modifier.separator, ''),
    };
  } else {
    return { ...explodedSource };
  }
};

const determineKeywordValueIdentifier = (
  explodedSource: ExplodedClassSource,
  classMeta: ClassMetaData,
  keywordMatcher: Matcher,
) => {
  const classNameBody = classMeta.source.match(keywordMatcher)[2];
  const { propIdentifier, valueSeparator } = explodedSource;
  const valueIdentifier = classNameBody
    .replace(propIdentifier, '')
    .replace(valueSeparator, '');

  return valueIdentifier;
};

const determinePluginValueIdentifier = (
  explodedSource: ExplodedClassSource,
  classMeta: ClassMetaData,
  matchers: Matchers,
) => {
  const value = classMeta.source.match(matchers[classMeta.valuePlugin])[3];
  const { modifierIdentifier, modifierSeparator } = explodedSource;

  return value.replace(modifierIdentifier, '').replace(modifierSeparator, '');
};

const setValueIdentifier = (
  explodedSource: ExplodedClassSource,
  classMeta: ClassMetaData,
  matchers: Matchers,
): ExplodedClassSource => {
  const valueIdentifier = classMeta.keyword
    ? determineKeywordValueIdentifier(
        explodedSource,
        classMeta,
        matchers.keyword,
      )
    : determinePluginValueIdentifier(explodedSource, classMeta, matchers);

  return { ...explodedSource, valueIdentifier };
};

export const addExplodedSourceData = (
  classMetaArr: ClassMetaData[],
  config: BatteryConfig,
  matchers: Matchers,
  plugins: ValuePlugin[],
) => {
  const { props } = config;

  return classMetaArr.map(classMeta => {
    const explodedSource: ExplodedClassSource = {
      prefix: '',
      prefixSeparator: '',
      propIdentifier: '',
      valueSeparator: '',
      valueIdentifier: '',
      modifierSeparator: '',
      modifierIdentifier: '',
      suffixSeparator: '',
      suffix: '',
    };

    const propConfig = props.find(
      propConfig => propConfig.prop === classMeta.property,
    );

    const withPropIdentifier = setPropIdentifier(explodedSource, propConfig);
    const withValueSeparator = setValueSeparator(
      withPropIdentifier,
      propConfig,
      classMeta,
    );

    let withModifierData;
    if (classMeta.keyword) {
      withModifierData = withValueSeparator;
    } else {
      withModifierData = setModifierData(
        withValueSeparator,
        classMeta,
        matchers,
        plugins,
      );
    }

    const withValueIdentifier = setValueIdentifier(
      withModifierData,
      classMeta,
      matchers,
    );

    classMeta.explodedSource = withValueIdentifier;
    return classMeta;
  });
};
