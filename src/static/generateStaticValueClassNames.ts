import { DeveloperPropertyConfig } from '../types/property-config';

export const generateStaticValueClassNames = (
  propertyConfig: DeveloperPropertyConfig,
) => {
  if (!propertyConfig.static) {
    return [];
  }
  const { valueSeparator = '', classNamespace } = propertyConfig;
  return propertyConfig.static.values.map(
    value => `${classNamespace}${valueSeparator}${value}`,
  );
};
