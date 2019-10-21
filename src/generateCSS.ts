import { BatteryConfig } from 'types/battery-config';
import { classMetaToCSS } from 'css/classMetaToCSS';
import { addMetaData } from 'classMetaData/addMetaData';
import { ClassMetaData } from 'types/classname';
import { Plugin } from 'types/plugin-config';
import { convertSubProps } from 'config/processSubProps';

const unique = (arr: any[]) => [...new Set(arr)];
const capitalizeFirstLetter = (x: string) =>
  x.charAt(0).toUpperCase() + x.slice(1);

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

        const atRuleCss = `@${plugin.atrule} ${
          modifier.condition
        } { ${modifierCSS} }`;
        return cssArr.concat(atRuleCss);
      },
      [] as string[],
    );

    return accum.concat(atRuleCSSArr);
  }, []);
};

export const generateCSS = (
  classNames: string[],
  config: BatteryConfig,
): string => {
  const processedConfig = {
    ...config,
    props: [...convertSubProps(config.props)],
  };
  const classMetaArr = addMetaData(classNames, processedConfig);

  const processedClasses = classMetaArr.map(classMeta => {
    classMeta.css = classMetaToCSS(classMeta, processedConfig.plugins);
    return classMeta;
  });

  const atRuleClasses = processedClasses.filter(c => !!c.atrulePlugin);
  const nonAtRuleClasses = processedClasses.filter(
    x => !atRuleClasses.includes(x),
  );

  const nonAtRuleCSS = nonAtRuleClasses.map(c => c.css);
  let atRuleCSS = [];
  if (atRuleClasses.length > 0) {
    atRuleCSS = processAtRulePlugins(atRuleClasses, processedConfig.plugins);
  }

  return [...nonAtRuleCSS, ...atRuleCSS].join(' ');
};
