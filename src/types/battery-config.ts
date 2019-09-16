import { UserPropConfig } from './prop-config';
import { ValuePlugin } from './plugin-config';

export interface BatteryConfig {
  props: UserPropConfig[];
  plugins?: ValuePlugin[];
}
