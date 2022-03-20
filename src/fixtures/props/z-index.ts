import { PropertyConfig } from '../../types/property-config';
import { integerPlugin } from '../plugins/integer';

export const zIndex: PropertyConfig = {
  cssProperty: 'z-index',
  classNamespace: 'z',
  valuePlugin: integerPlugin(),
};
