import { ClassMetaData } from 'types/classname';
import { Plugin } from 'types/plugin-config';
export declare const generateKeywordMatcher: (metaDataArr: ClassMetaData[], plugins: Plugin[]) => {
    keyword: RegExp;
};
