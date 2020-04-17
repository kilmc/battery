import { colorPlugin } from 'fixtures/plugins/color';
import { UserPropConfig } from 'types/prop-config';

export const backgroundColor: UserPropConfig = {
  cssProperty: ['background-color'],
  classNamespace: 'bg',
  pluginSeparator: '-',
  valuePlugin: colorPlugin,
};
