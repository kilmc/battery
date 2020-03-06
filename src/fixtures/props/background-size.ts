import { UserPropConfig } from 'types/prop-config';

export const backgroundSize: UserPropConfig = {
  cssProperty: ['background-size'],
  propIdentifier: 'bg',
  keywordSeparator: '-',
  keywordValues: {
    contain: 'contain',
    cover: 'cover',
  },
  plugin: 'lengthUnit',
};
