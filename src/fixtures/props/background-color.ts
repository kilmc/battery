import { colorPlugin } from 'fixtures/plugins/color';
import { PropertyConfig } from '../../types/property-config';

export const backgroundColor: PropertyConfig = {
  cssProperty: 'background-color',
  classNamespace: 'bg',
  pluginSeparator: '-',
  valuePlugin: colorPlugin,
};
