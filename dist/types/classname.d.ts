import { CSSProperties } from '../types/css';
export declare type ClassObject = {
    [key in CSSProperties]?: string;
};
export interface ClassObjectGroup {
    [k: string]: ClassObject;
}
export interface ExplodedClassSource {
    prefix?: string;
    prefixSeparator?: string;
    suffix?: string;
    suffixSeparator?: string;
    classNamespace?: string;
    valueOrPluginSeparator?: string;
    valueIdentifier: string;
    modifierSeparator?: string;
    modifierIdentifier?: string;
}
export interface ClassMetaData {
    property?: CSSProperties[];
    source: string;
    selector?: string;
    explodedSource?: ExplodedClassSource;
    keyword?: boolean;
    valuePlugin?: string;
    valuePluginType?: 'pattern' | 'lookup';
    atrulePlugin?: string;
    atruleModifier?: string;
    selectorPlugin?: string;
    selectorModifier?: string;
    valueModifier?: string;
    classObject?: ClassObject;
    invalid?: boolean;
    css?: string;
}
