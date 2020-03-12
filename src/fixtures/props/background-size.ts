import { UserPropConfig } from 'types/prop-config';

export const backgroundSize: UserPropConfig = {
  cssProperty: ['background-size'],
  classNamespace: 'bg',
  valueSeparator: '-',
  values: {
    contain: 'contain',
    cover: 'cover',
  },
  valuePlugin: 'lengthUnit',
};
