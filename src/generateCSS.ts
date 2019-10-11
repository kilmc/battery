import { BatteryConfig } from 'types/battery-config';
import { classMetaToCSS } from 'css/classMetaToCSS';
import { addMetaData } from 'classMetaData/addMetaData';
import { ClassMetaData } from 'types/classname';
import { Plugin } from 'types/plugin-config';

const unique = (arr: any[]) => [...new Set(arr)];
const capitalizeFirstLetter = (x: string) =>
  x.charAt(0).toUpperCase() + x.slice(1);

const groupByAtRuleAttribute = (
  attribute: 'atruleModifier' | 'atrulePlugin',
  classMetaArr: ClassMetaData[],
) => {
  return classMetaArr.reduce(
    (accum, classMeta) => {
      if (classMeta[attribute]) {
        accum[classMeta[attribute]]
          ? accum[classMeta[attribute]].push(classMeta)
          : (accum[classMeta[attribute]] = [classMeta]);

        return accum;
      } else {
        return accum;
      }
    },
    {} as { [k: string]: ClassMetaData[] },
  );
};

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
  const classMetaArr = addMetaData(classNames, config);

  const processedClasses = classMetaArr.map(classMeta => {
    classMeta.css = classMetaToCSS(classMeta, config.plugins);
    return classMeta;
  });

  const atRuleClasses = processedClasses.filter(c => !!c.atrulePlugin);
  const nonAtRuleClasses = processedClasses.filter(
    x => !atRuleClasses.includes(x),
  );

  const nonAtRuleCSS = nonAtRuleClasses.map(c => c.css);
  let atRuleCSS = [];
  if (atRuleClasses.length > 0) {
    atRuleCSS = processAtRulePlugins(atRuleClasses, config.plugins);
  }

  return [...nonAtRuleCSS, ...atRuleCSS].join(' ');
};
