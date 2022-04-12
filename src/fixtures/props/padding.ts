import { PropertyConfig } from '../../types/property-config';
import { lengthUnitsPlugin } from '../plugins/lengthUnits';

export const padding: PropertyConfig = {
  cssProperty: 'padding',
  classNamespace: 'p',
  subProps: {
    all: '',
    top: 't',
    right: 'r',
    bottom: 'b',
    left: 'l',
    vertical: 'y',
    horizontal: 'x',
  },
  valueSeparator: '-',
  values: {
    auto: 'auto',
    inherit: 'inherit',
  },
  valuePlugin: lengthUnitsPlugin(),
};
