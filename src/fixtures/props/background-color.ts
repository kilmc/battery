import { PropertyConfig } from '../../types/property-config';
import { colorPlugin } from '../plugins/color';

export const backgroundColor: PropertyConfig = {
  cssProperty: 'background-color',
  classNamespace: 'bg',
  valuePlugin: colorPlugin({ separator: '-' }),
};
