import { BatteryConfig } from 'types/battery-config';
import { classMetaToCSS } from 'css/classMetaToCSS';
import { addMetaData } from 'classMetaData/addMetaData';
import { ClassMetaData } from 'types/classname';
import { Plugin } from 'types/plugin-config';
import { convertSubProps } from 'config/processSubProps';
import { sortAlphaNum } from 'utils/string';

const processAtRulePlugins = (
  classMetaArr: ClassMetaData[],
  plugins: Plugin[],
) => {
  const atRuleProcessingOrder: [string, string[]][] = plugins
    .filter(plugin => plugin.atrule)
    .map(plugin => {
      const pluginModifiers = plugin.modifiers.map(modifier => modifier.name);
      return [plugin.name, pluginModifiers];
    });

  return atRuleProcessingOrder.reduce((accum, [atRuleName, modifierNames]) => {
    const atRuleClassMeta = classMetaArr.filter(
      classMeta => classMeta.atrulePlugin === atRuleName,
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
        const plugin = plugins.find(plugin => plugin.name === atRuleName);
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
  }, []);
};

const sortClassMetaByProperty = (classMetaArr: ClassMetaData[]) =>
  [...classMetaArr].sort((a, b) => sortAlphaNum(a.property[0], b.property[0]));

const sortGroupedClassMetaBySource = (classMetaArr: ClassMetaData[]) =>
  Object.values(
    classMetaArr.reduce(
      (accum, classMeta) => {
        accum[classMeta.property[0]]
          ? (accum[classMeta.property[0]] = accum[classMeta.property[0]].concat(
              classMeta,
            ))
          : (accum[classMeta.property[0]] = [classMeta]);

        return accum;
      },
      {} as { [k: string]: ClassMetaData[] },
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

const processConfig = (config: BatteryConfig) => {
  const withStringCSSProperties = {
    ...config,
    props: config.props.map(prop => {
      return { ...prop, cssProperty: [prop.cssProperty] };
    }),
  };
  const withSubProps = convertSubProps(withStringCSSProperties);
  return withSubProps;
};

export const generateCSS = (
  classNames: string[],
  config: BatteryConfig,
): string => {
  const processedConfig = processConfig(config);
  const classMetaArr = addMetaData(classNames, processedConfig);

  const withCssData = classMetaArr.map(classMeta => {
    classMeta.css = classMetaToCSS(classMeta, processedConfig.plugins);
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
