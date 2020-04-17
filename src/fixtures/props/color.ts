import { colorPlugin } from 'fixtures/plugins/color';
import { UserPropConfig } from 'types/prop-config';

export const textColor: UserPropConfig = {
  cssProperty: ['color'],
  classNamespace: 'text',
  pluginDefault: true,
  valuePlugin: colorPlugin,
};
