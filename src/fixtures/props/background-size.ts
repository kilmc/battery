import { UserPropConfig } from 'types/prop-config';

export const backgroundSize: UserPropConfig = {
  cssProperty: ['background-size'],
  classNamespace: 'bg',
  keywordSeparator: '-',
  keywordValues: {
    contain: 'contain',
    cover: 'cover',
  },
  plugin: 'lengthUnit',
};
