import { PropertyConfig } from '../types/property-config';

export const generateStaticValueClassNames = (
  propertyConfig: PropertyConfig,
) => {
  if (!propertyConfig.static) {
    return [];
  }
  const { valueSeparator = '', classNamespace } = propertyConfig;
  return propertyConfig.static.values.map(
    value => `${classNamespace}${valueSeparator}${value}`,
  );
};
