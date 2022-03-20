import { PropertyConfig } from '../../types/property-config';
import { integerPlugin } from '../plugins/integer';

export const flex: PropertyConfig = {
  cssProperty: 'flex',
  classNamespace: 'flex',
  valuePlugin: integerPlugin(),
};
