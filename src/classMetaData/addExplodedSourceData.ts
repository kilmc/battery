import { ClassMetaData, ExplodedClassSource } from 'types/classname';
import { BatteryConfig } from 'types/battery-config';
import { Matchers, Matcher } from 'types/matchers';
import { Plugin } from 'types/plugin-config';
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
  plugins: Plugin[],
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

const setClassModifierData = (
  affixType: 'prefix' | 'suffix',
  match: string,
  plugins: Plugin[],
) => {
  const prefixModifiers = plugins
    .filter(plugin => plugin.affixType === affixType)
    .map(plugin => plugin.modifiers)
    .reduce((xs, x) => xs.concat(x));

  const { separator = '' } = prefixModifiers.find(m =>
    new RegExp(m.identifier).test(match),
  );

  const replacerRegex =
    affixType === 'prefix'
      ? new RegExp(`${separator}$`)
      : new RegExp(`^${separator}`);
  const affixIdentifier = match.replace(replacerRegex, '');
  const affixSeparator = separator;

  return {
    [affixType]: affixIdentifier ? affixIdentifier : '',
    [`${affixType}Separator`]: affixSeparator ? affixSeparator : '',
  };
};

const setPrefixSuffixData = (
  explodedSource: ExplodedClassSource,
  classMeta: ClassMetaData,
  matchers: Matchers,
  plugins: Plugin[],
) => {
  const matcherArr = Object.entries(matchers).find(([matcherName, _]) => {
    return (
      matcherName === classMeta.valuePlugin ||
      (classMeta.keyword && matcherName === 'keyword')
    );
  });

  if (!matcherArr) {
    return explodedSource;
  }

  const matcher = matcherArr[1];

  let matchedPrefix: string;
  let matchedSuffix: string;
  let prefixData: {};
  let suffixData: {};

  if (classMeta.keyword) {
    const groups = classMeta.source.match(matcher);
    matchedPrefix = groups[1];
    matchedSuffix = groups[3];
  } else {
    const groups = classMeta.source.match(matcher);
    matchedPrefix = groups[1];
    matchedSuffix = groups[4];
  }

  if (matchedPrefix) {
    prefixData = setClassModifierData('prefix', matchedPrefix, plugins);
  }

  if (matchedSuffix) {
    suffixData = setClassModifierData('suffix', matchedSuffix, plugins);
  }

  return { ...explodedSource, ...prefixData, ...suffixData };
};

export const addExplodedSourceData = (
  classMetaArr: ClassMetaData[],
  config: BatteryConfig,
  matchers: Matchers,
  plugins: Plugin[],
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

    const withPrefixSuffixData = setPrefixSuffixData(
      withValueIdentifier,
      classMeta,
      matchers,
      plugins,
    );

    classMeta.explodedSource = withPrefixSuffixData;
    return classMeta;
  });
};
