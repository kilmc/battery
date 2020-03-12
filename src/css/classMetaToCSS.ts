import { ClassMetaData } from 'types/classname';
import { Plugin } from 'types/plugin-config';

export const classMetaToCSS = (classMeta: ClassMetaData, plugins: Plugin[]) => {
  const desclarations = Object.entries(classMeta.classObject)
    .reduce((accum, [property, value]) => {
      return accum.concat(`${property}: ${value}`);
    }, [])
    .join(';');

  if (classMeta.selectorPlugin) {
    const selectorModifier = plugins
      .find(plugin => plugin.name === classMeta.selectorPlugin)
      .modifiers.find(modifier => modifier.name === classMeta.selectorModifier);

    classMeta.selector = selectorModifier.modifierFn(
      classMeta.selector,
      classMeta.explodedSource.prefix,
    );
  }

  return `.${classMeta.selector} { ${desclarations} }`;
};
