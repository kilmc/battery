import { PropertyConfig } from 'types/property-config';

export const backgroundSize: PropertyConfig = {
  cssProperty: 'background-size',
  classNamespace: 'bg',
  valueSeparator: '-',
  values: {
    contain: 'contain',
    cover: 'cover',
  },
  valuePlugin: 'lengthUnit',
};
