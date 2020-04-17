import { colorPlugin } from 'fixtures/plugins/color';
import { PropertyConfig } from '../../types/property-config';

export const textColor: PropertyConfig = {
  cssProperty: 'color',
  classNamespace: 'text',
  pluginDefault: true,
  valuePlugin: colorPlugin(),
};
