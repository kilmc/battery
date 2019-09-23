import { ClassMetaData } from 'types/classname';
import { ValuePlugin } from 'types/plugin-config';
import { getMatcherName } from 'matchers/utils';
import { generateModifierMatchers } from 'matchers/generateModifierMatchers';

export const addModifierPluginData = (
  classMetaArr: ClassMetaData[],
  plugins: ValuePlugin[],
) => {
  return classMetaArr.map(classMeta => {
    if (!plugins || plugins.length < 1) return classMeta;

    const { modifierIdentifier } = classMeta.explodedSource;
    const hasModifier = modifierIdentifier.length > 0;
    const plugin = plugins.find(plugin => {
      return plugin.name === classMeta.valuePlugin;
    });

    if (hasModifier) {
      const modifierName = getMatcherName(
        generateModifierMatchers(plugin),
        classMeta.source,
      )[0];

      classMeta.modifierPlugin = modifierName;
    }

    return classMeta;
  });
};
