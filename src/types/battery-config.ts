import { PropertyConfig, DeveloperPropertyConfig } from './property-config';
import { PluginConfig } from './plugin-config';

export interface BatteryConfig {
  props: PropertyConfig[];
  plugins?: PluginConfig[];
}

export interface DeveloperBatteryConfig {
  props: DeveloperPropertyConfig[];
  plugins?: PluginConfig[];
}
