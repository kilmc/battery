import { ClassMetaData } from '../types/classname';
import { getMatcherName } from '../matchers/utils';
import { generateModifierMatchers } from '../matchers/generateModifierMatchers';

export const addValueModifierPluginData = (classMetaArr: ClassMetaData[]) => {
  return classMetaArr.map(classMeta => {
    const { modifierIdentifier } = classMeta.explodedSource;
    const hasNonDefaultModifier = modifierIdentifier.length > 0;
    const plugin = classMeta.valuePlugin;

    if (!plugin || !plugin.modifiers) return classMeta;

    const defaultModifier = plugin.modifiers.find(
      modifier => modifier.defaultModifier,
    );

    if (hasNonDefaultModifier) {
      const modifierName = getMatcherName(
        generateModifierMatchers(plugin),
        classMeta.source,
      )[0];

      classMeta.valueModifier = modifierName;
    } else if (defaultModifier) {
      classMeta.valueModifier = defaultModifier.name;
    }

    return classMeta;
  });
};
