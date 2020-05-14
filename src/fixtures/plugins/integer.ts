import { BatteryPlugin } from './../../battery-plugin';

export const integerPlugin = BatteryPlugin({
  type: 'pattern',
  identifier: /-?\d{1,4}/,
});
