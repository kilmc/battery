import { Plugin } from 'types/plugin-config';
import { UserPropConfig } from 'types/prop-config';
export declare const generateValueMatcher: (plugin: Plugin, captureSubGroups?: boolean) => string;
export declare const generateValuePluginMatcher: (plugins: Plugin[], propConfigs: UserPropConfig[]) => {
    [k: string]: RegExp;
};
