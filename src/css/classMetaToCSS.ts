import { ClassMetaData } from 'types/classname';

export const classMetaToCSS = (metaData: ClassMetaData) => {
  const desclarations = Object.entries(metaData.classObject)
    .reduce((accum, [property, value]) => {
      return accum.concat(`${property}: ${value}`);
    }, [])
    .join(';');
  return `.${metaData.source} { ${desclarations} }`;
};
