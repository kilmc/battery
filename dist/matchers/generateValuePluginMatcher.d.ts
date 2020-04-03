import { PluginConfig } from '../types/plugin-config';
import { DeveloperPropertyConfig } from '../types/property-config';
export declare const generateValueMatcher: (plugin: PluginConfig, captureSubGroups?: boolean) => string;
export declare const generateValuePluginMatcher: (plugins: PluginConfig[], propConfigs: DeveloperPropertyConfig[]) => {
    [k: string]: RegExp;
};
