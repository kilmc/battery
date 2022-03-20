import { PropertyConfig } from '../../types/property-config';
import { colorPlugin } from '../plugins/color';

export const textColor: PropertyConfig = {
  cssProperty: 'color',
  classNamespace: 'text',
  pluginDefault: true,
  valuePlugin: colorPlugin(),
};
