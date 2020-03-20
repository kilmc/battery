import { PropertyConfig } from './prop-config';
import { Plugin } from './plugin-config';

export interface BatteryConfig {
  props: PropertyConfig[];
  plugins?: Plugin[];
}
