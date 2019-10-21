import { UserPropConfig } from 'types/prop-config';

export const margin: UserPropConfig = {
  prop: ['margin'],
  propIdentifier: 'm',
  subProps: {
    all: '',
    top: 't',
    right: 'r',
    bottom: 'b',
    left: 'l',
    vertical: 'y',
    horizontal: 'x',
  },
  keywordSeparator: '',
  keywordValues: {
    auto: 'auto',
  },
  plugin: 'lengthUnit',
};
