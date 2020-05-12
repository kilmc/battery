import { PropertyConfig } from '../../types/property-config';
import { lengthUnitsPlugin } from '../../fixtures/plugins/lengthUnits';

export const width: PropertyConfig = {
  cssProperty: 'width',
  classNamespace: 'w',
  valuePlugin: lengthUnitsPlugin(),
};
