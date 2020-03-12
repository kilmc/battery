import { UserPropConfig } from './prop-config';
import { Plugin } from './plugin-config';

export interface BatteryConfig {
  props: UserPropConfig[];
  plugins?: Plugin[];
}
