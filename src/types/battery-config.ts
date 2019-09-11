import { UserPropConfig } from './prop-config';
import { LookupPlugin, PatternPlugin } from './plugin-config';

export interface BatteryConfig {
  props: UserPropConfig[];
  plugins?: {
    lookup: LookupPlugin[];
    pattern: PatternPlugin[];
  };
}
