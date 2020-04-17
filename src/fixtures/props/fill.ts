import { colorPlugin } from 'fixtures/plugins/color';
import { PropertyConfig } from '../../types/property-config';

export const fillColor: PropertyConfig = {
  cssProperty: 'fill',
  classNamespace: 'fill',
  pluginSeparator: '-',
  valuePlugin: colorPlugin,
};
