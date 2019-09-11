import { UserPropConfig } from 'types/prop-config';

export const zIndex: UserPropConfig = {
  prop: 'z-index',
  propIdentifier: 'z',
  plugin: [{ name: 'integers', modifiers: ['positive', 'negative'] }],
};
