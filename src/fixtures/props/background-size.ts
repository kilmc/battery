import { UserPropConfig } from 'types/prop-config';

export const backgroundSize: UserPropConfig = {
  cssProperty: ['background-size'],
  classNamespace: 'bg',
  keywordSeparator: '-',
  values: {
    contain: 'contain',
    cover: 'cover',
  },
  valuePlugin: 'lengthUnit',
};
