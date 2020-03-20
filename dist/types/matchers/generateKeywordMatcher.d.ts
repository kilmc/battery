import { ClassMetaData } from 'types/classname';
import { PluginConfig } from 'types/plugin-config';
export declare const generateKeywordMatcher: (metaDataArr: ClassMetaData[], plugins: PluginConfig[]) => {
    keyword: RegExp;
};
