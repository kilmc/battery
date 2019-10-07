import { ClassMetaData } from 'types/classname';
import { Plugin } from 'types/plugin-config';
import { getMatcherName } from 'matchers/utils';
import { generateModifierMatchers } from 'matchers/generateModifierMatchers';

export const addModifierPluginData = (
  classMetaArr: ClassMetaData[],
  plugins: Plugin[],
) => {
  return classMetaArr.map(classMeta => {
    if (!plugins || plugins.length < 1) return classMeta;

    const { modifierIdentifier } = classMeta.explodedSource;
    const hasNonDefaultModifier = modifierIdentifier.length > 0;
    const plugin = plugins.find(plugin => {
      return plugin.name === classMeta.valuePlugin;
    });

    if (!plugin || !plugin.modifiers) return classMeta;

    const defaultModifier = plugin.modifiers.find(
      modifier => modifier.defaultModifier,
    );

    if (hasNonDefaultModifier) {
      const modifierName = getMatcherName(
        generateModifierMatchers(plugin),
        classMeta.source,
      )[0];

      classMeta.modifierPlugin = modifierName;
    } else if (defaultModifier) {
      classMeta.modifierPlugin = defaultModifier.name;
    }

    return classMeta;
  });
};
