import { PropertyConfig } from '../types/property-config';

export const generateStaticValueClassNames = (
  propertyConfig: PropertyConfig,
) => {
  if (!propertyConfig.static) {
    return [];
  }

  const { valueSeparator = '', classNamespace } = propertyConfig;
  const values = propertyConfig.static.values;

  return values.map(value => `${classNamespace}${valueSeparator}${value}`);
};
