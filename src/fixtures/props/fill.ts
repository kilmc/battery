import { PropertyConfig } from '../../types/property-config';
import { colorPlugin } from '../plugins/color';

export const fillColor: PropertyConfig = {
  cssProperty: 'fill',
  classNamespace: 'fill',
  valuePlugin: colorPlugin({ separator: '-' }),
};
