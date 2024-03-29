import { BatteryConfig } from './types/battery-config';
import { classMetaToCSS } from './css/classMetaToCSS';
import { addMetaData } from './classMetaData/addMetaData';
import { ClassMetaData } from './types/classname';
import { PluginConfig } from './types/plugin-config';
import { convertSubProps } from './config/processSubProps';
import { sortAlphaNum } from './utils/string';
import { generateStaticValueClassNames } from './static/generateStaticValueClassNames';
import {
  PropertyConfig,
  DeveloperPropertyConfig,
} from './types/property-config';

const processAtRulePlugins = (
  classMetaArr: ClassMetaData[],
  plugins: PluginConfig[],
) => {
  const atRuleProcessingOrder: [PluginConfig, string[]][] = plugins
    .filter(plugin => plugin.atrule)
    .map(plugin => {
      const pluginModifiers = plugin.modifiers.map(modifier => modifier.name);

      return [plugin, pluginModifiers];
    });

  return atRuleProcessingOrder.reduce(
    (accum, [atRulePlugin, modifierNames]) => {
      const atRuleClassMeta = classMetaArr.filter(
        classMeta => !!classMeta.atrulePlugin,
      );

      const atRuleCSSArr = modifierNames.reduce(
        (cssArr, modifierName) => {
          const modifierClassMeta = atRuleClassMeta.filter(
            cm => cm.atruleModifier === modifierName,
          );

          if (modifierClassMeta.length < 1) {
            return cssArr;
          }

          const modifierCSS = modifierClassMeta
            .map(classMeta => classMeta.css)
            .join('');

          const plugin = plugins.find(plugin => plugin === atRulePlugin);

          const modifier = plugin.modifiers.find(
            pluginModifier => pluginModifier.name === modifierName,
          );

          const atRuleCss = `
            @${plugin.atrule} ${modifier.condition} { ${modifierCSS} }
          `;

          return cssArr.concat(atRuleCss);
        },
        [] as string[],
      );

      return accum.concat(atRuleCSSArr);
    },
    [],
  );
};

const sortClassMetaByProperty = (classMetaArr: ClassMetaData[]) =>
  [...classMetaArr].sort((a, b) => sortAlphaNum(a.property[0], b.property[0]));

const sortGroupedClassMetaBySource = (classMetaArr: ClassMetaData[]) =>
  Object.values(
    classMetaArr.reduce<{ [k: string]: ClassMetaData[] }>(
      (accum, classMeta) => {
        accum[classMeta.property[0]]
          ? (accum[classMeta.property[0]] = accum[classMeta.property[0]].concat(
              classMeta,
            ))
          : (accum[classMeta.property[0]] = [classMeta]);

        return accum;
      },
      {},
    ),
  )
    .map(propGroup =>
      propGroup.sort((a, b) => sortAlphaNum(a.source, b.source)),
    )
    .reduce((xs, x) => xs.concat(x));

const autoAndInheritToBottom = (classMetaArr: ClassMetaData[]) => {
  const hasOverrideValues = (classMeta: ClassMetaData) =>
    Object.values(classMeta.classObject).every(value =>
      ['auto', 'inherit'].includes(value),
    );
  const withoutOverrideValues = classMetaArr.filter(
    classMeta => !hasOverrideValues(classMeta),
  );
  const overrideValues = [...classMetaArr].filter(hasOverrideValues);

  return withoutOverrideValues.concat(overrideValues);
};

const processRootCSS = (rootClasses: ClassMetaData[]) => {
  if (rootClasses.length < 1) {
    return [];
  } else {
    const groupedByProperty = sortClassMetaByProperty(rootClasses);
    const sortedBySource = sortGroupedClassMetaBySource(groupedByProperty);
    const withOverridesAtTheBottom = autoAndInheritToBottom(sortedBySource);

    return withOverridesAtTheBottom.map(c => c.css);
  }
};

const generateStaticValuesArr = (
  propertyConfig: DeveloperPropertyConfig,
  autoGenerateStaticValues: boolean = false,
): DeveloperPropertyConfig => {
  return autoGenerateStaticValues || propertyConfig.static
    ? {
        ...propertyConfig,
        static: {
          values: Object.keys(propertyConfig.values),
        },
      }
    : propertyConfig;
};

const wrapCSSPropertyInArray = (
  propertyConfig: PropertyConfig,
): DeveloperPropertyConfig => {
  return {
    ...propertyConfig,
    cssProperty: [propertyConfig.cssProperty],
  };
};

const processConfig = (config: BatteryConfig) => {
  const withStatic: BatteryConfig = {
    ...config,
    static: {
      generateAllValues:
        (config.static && config.static.generateAllValues) || false,
    },
  };

  const withProcessedPropertyConfigs = {
    ...withStatic,
    props: config.props
      .map(wrapCSSPropertyInArray)
      .map(propertyConfig =>
        generateStaticValuesArr(
          propertyConfig,
          withStatic.static.generateAllValues,
        ),
      ),
  };
  const withSubProps = convertSubProps(withProcessedPropertyConfigs);
  return withSubProps;
};

export const generateCSS = (
  classNames: string[],
  config: BatteryConfig,
  generateStaticLibrary: boolean = false,
): string => {
  const processedConfig = processConfig(config);
  let processedClassNames: string[];

  if (generateStaticLibrary) {
    processedClassNames = processedConfig.props.flatMap(
      generateStaticValueClassNames,
    );
  } else {
    processedClassNames = classNames;
  }

  const classMetaArr = addMetaData(processedClassNames, processedConfig);

  const withCssData = classMetaArr.map(classMeta => {
    classMeta.css = classMetaToCSS(classMeta);
    return classMeta;
  });

  const atRuleClasses = withCssData.filter(c => !!c.atrulePlugin);
  const rootClasses = withCssData.filter(x => !atRuleClasses.includes(x));

  const rootCSS = processRootCSS(rootClasses);
  let atRuleCSS = [];
  if (atRuleClasses.length > 0) {
    atRuleCSS = processAtRulePlugins(atRuleClasses, processedConfig.plugins);
  }

  return [...rootCSS, ...atRuleCSS].join(' ');
};
