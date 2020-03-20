import { PropertyConfig } from 'types/prop-config';

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
