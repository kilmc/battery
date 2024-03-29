import { ClassMetaData } from '../types/classname';

export const classMetaToCSS = (classMeta: ClassMetaData) => {
  const desclarations = Object.entries(classMeta.classObject)
    .reduce((accum, [property, value]) => {
      return accum.concat(`${property}: ${value}`);
    }, [])
    .join(';');

  if (classMeta.selectorPlugin) {
    const selectorModifier = classMeta.selectorPlugin.modifiers.find(
      modifier => modifier.name === classMeta.selectorModifier,
    );

    classMeta.selector = selectorModifier.modifierFn(
      classMeta.selector,
      classMeta.explodedSource.prefix,
    );

    return `.${classMeta.selector} { ${desclarations} }`;
  }

  return `.${classMeta.selector.replace(
    /(:|\.)/,
    '\\$1',
  )} { ${desclarations} }`;
};
