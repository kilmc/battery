import { BatteryPlugin } from './../../battery-plugin';

export const breakpointPlugin = BatteryPlugin({
  type: 'at-rule',
  atrule: 'media',
  affixType: 'suffix',
  modifiers: [
    {
      name: 'responsiveSmall',
      identifier: 'sm',
      separator: '-',
      condition: '(min-width: 560px)',
    },
    {
      name: 'responsiveMedium',
      identifier: 'md',
      separator: '-',
      condition: '(min-width: 940px)',
    },
    {
      name: 'responsiveLarge',
      identifier: 'lg',
      separator: '-',
      condition: '(min-width: 1040px)',
    },
  ],
});
