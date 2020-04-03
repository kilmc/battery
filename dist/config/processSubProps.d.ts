import { DeveloperPropertyConfig } from '../types/property-config';
import { DeveloperBatteryConfig } from '../types/battery-config';
export declare const convertSubProps: (config: DeveloperBatteryConfig) => {
    props: DeveloperPropertyConfig[];
    plugins?: import("..").PluginConfig[];
};
