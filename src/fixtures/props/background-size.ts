import { PropertyConfig } from '../../types/property-config';
import { lengthUnitsPlugin } from '../../fixtures/plugins/lengthUnits';

export const backgroundSize: PropertyConfig = {
  cssProperty: 'background-size',
  classNamespace: 'bg',
  valueSeparator: '-',
  values: {
    contain: 'contain',
    cover: 'cover',
  },
  valuePlugin: lengthUnitsPlugin(),
};
