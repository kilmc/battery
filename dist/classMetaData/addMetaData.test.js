import { addMetaData } from './addMetaData';
import { colorPlugin } from '../fixtures/plugins/color';
import { integerPlugin } from '../fixtures/plugins/integer';
import { lengthUnitsPlugin } from '../fixtures/plugins/lengthUnits';
import { breakpointPlugin } from '../fixtures/plugins/breakpoint';
import { pseudoPlugin } from '../fixtures/plugins/pseudo';
import { hoverTargetPlugin } from '../fixtures/plugins/hoverTarget';
describe('addMetaData', function () {
    describe('Handles keyword classNames', function () {
        var config = {
            props: [
                {
                    cssProperty: ['position'],
                    values: {
                        absolute: 'absolute',
                    },
                },
                {
                    cssProperty: ['display'],
                    values: {
                        block: 'block',
                    },
                },
                {
                    cssProperty: ['background-size'],
                    classNamespace: 'bg',
                    valueSeparator: '-',
                    values: {
                        contain: 'contain',
                        cover: 'cover',
                    },
                    valuePlugin: 'lengthUnit',
                },
            ],
        };
        var inputClassNames = ['block', 'absolute', 'bg-contain'];
        test('All meta data is added to the classMetaData object', function () {
            expect(addMetaData(inputClassNames, config)).toEqual([
                {
                    source: 'block',
                    selector: 'block',
                    keyword: true,
                    property: ['display'],
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: '',
                        valueOrPluginSeparator: '',
                        valueIdentifier: 'block',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    classObject: {
                        display: 'block',
                    },
                },
                {
                    source: 'absolute',
                    selector: 'absolute',
                    keyword: true,
                    property: ['position'],
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: '',
                        valueOrPluginSeparator: '',
                        valueIdentifier: 'absolute',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    classObject: {
                        position: 'absolute',
                    },
                },
                {
                    source: 'bg-contain',
                    selector: 'bg-contain',
                    keyword: true,
                    property: ['background-size'],
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'contain',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    classObject: {
                        'background-size': 'contain',
                    },
                },
            ]);
        });
    });
    describe('Handles value plugin classNames', function () {
        var config = {
            props: [
                {
                    cssProperty: ['z-index'],
                    classNamespace: 'z',
                    valuePlugin: 'integer',
                },
                {
                    cssProperty: ['background-color'],
                    classNamespace: 'bg',
                    pluginSeparator: '-',
                    valuePlugin: 'color',
                },
                {
                    cssProperty: ['background-size'],
                    classNamespace: 'bg',
                    valueSeparator: '-',
                    values: {
                        contain: 'contain',
                        cover: 'cover',
                    },
                    valuePlugin: 'lengthUnit',
                },
                {
                    cssProperty: ['width'],
                    classNamespace: 'w',
                    valuePlugin: 'lengthUnit',
                },
            ],
            plugins: [integerPlugin, colorPlugin, lengthUnitsPlugin],
        };
        var inputClassNames = ['bg-white', 'bg-white_10', 'z100', 'w3'];
        test('All meta data is added to the classMetaData object', function () {
            expect(addMetaData(inputClassNames, config)).toEqual([
                {
                    source: 'bg-white',
                    selector: 'bg-white',
                    keyword: false,
                    property: ['background-color'],
                    valuePlugin: 'color',
                    valuePluginType: 'lookup',
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'white',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    classObject: {
                        'background-color': '#FFFFFF',
                    },
                },
                {
                    source: 'bg-white_10',
                    selector: 'bg-white_10',
                    keyword: false,
                    property: ['background-color'],
                    valuePlugin: 'color',
                    valuePluginType: 'lookup',
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'white',
                        modifierSeparator: '_',
                        modifierIdentifier: '10',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    valueModifier: 'opacity',
                    classObject: {
                        'background-color': 'rgba(255,255,255,0.1)',
                    },
                },
                {
                    source: 'z100',
                    selector: 'z100',
                    keyword: false,
                    property: ['z-index'],
                    valuePlugin: 'integer',
                    valuePluginType: 'pattern',
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: 'z',
                        valueOrPluginSeparator: '',
                        valueIdentifier: '100',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    classObject: {
                        'z-index': '100',
                    },
                },
                {
                    source: 'w3',
                    selector: 'w3',
                    keyword: false,
                    property: ['width'],
                    valuePlugin: 'lengthUnit',
                    valuePluginType: 'pattern',
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: 'w',
                        valueOrPluginSeparator: '',
                        valueIdentifier: '3',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    valueModifier: 'ratio',
                    classObject: {
                        width: '1.125rem',
                    },
                },
            ]);
        });
    });
    describe('Handles class plugin classNames', function () {
        var config = {
            props: [
                {
                    cssProperty: ['z-index'],
                    classNamespace: 'z',
                    valuePlugin: 'integer',
                },
                {
                    cssProperty: ['background-color'],
                    classNamespace: 'bg',
                    pluginSeparator: '-',
                    valuePlugin: 'color',
                },
                {
                    cssProperty: ['background-size'],
                    classNamespace: 'bg',
                    valueSeparator: '-',
                    values: {
                        contain: 'contain',
                        cover: 'cover',
                    },
                    valuePlugin: 'lengthUnit',
                },
                {
                    cssProperty: ['width'],
                    classNamespace: 'w',
                    valuePlugin: 'lengthUnit',
                },
            ],
            plugins: [
                integerPlugin,
                colorPlugin,
                lengthUnitsPlugin,
                breakpointPlugin,
                pseudoPlugin,
                hoverTargetPlugin,
            ],
        };
        var inputClassNames = [
            'bg-white-md',
            'hover-bg-white_10',
            'z100-lg',
            'hover-item-bg-contain',
        ];
        test('All meta data is added to the classMetaData object', function () {
            expect(addMetaData(inputClassNames, config)).toEqual([
                {
                    source: 'bg-white-md',
                    selector: 'bg-white-md',
                    keyword: false,
                    property: ['background-color'],
                    valuePlugin: 'color',
                    valuePluginType: 'lookup',
                    atrulePlugin: 'breakpoint',
                    atruleModifier: 'responsiveMedium',
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'white',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffixSeparator: '-',
                        suffix: 'md',
                    },
                    classObject: {
                        'background-color': '#FFFFFF',
                    },
                },
                {
                    source: 'hover-bg-white_10',
                    selector: 'hover-bg-white_10',
                    keyword: false,
                    property: ['background-color'],
                    valuePlugin: 'color',
                    valuePluginType: 'lookup',
                    selectorPlugin: 'pseudo',
                    selectorModifier: 'hover',
                    explodedSource: {
                        prefix: 'hover',
                        prefixSeparator: '-',
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'white',
                        modifierSeparator: '_',
                        modifierIdentifier: '10',
                        suffix: '',
                        suffixSeparator: '',
                    },
                    valueModifier: 'opacity',
                    classObject: {
                        'background-color': 'rgba(255,255,255,0.1)',
                    },
                },
                {
                    source: 'z100-lg',
                    selector: 'z100-lg',
                    keyword: false,
                    property: ['z-index'],
                    valuePlugin: 'integer',
                    valuePluginType: 'pattern',
                    atrulePlugin: 'breakpoint',
                    atruleModifier: 'responsiveLarge',
                    explodedSource: {
                        prefix: '',
                        prefixSeparator: '',
                        classNamespace: 'z',
                        valueOrPluginSeparator: '',
                        valueIdentifier: '100',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffixSeparator: '-',
                        suffix: 'lg',
                    },
                    classObject: {
                        'z-index': '100',
                    },
                },
                {
                    source: 'hover-item-bg-contain',
                    selector: 'hover-item-bg-contain',
                    keyword: true,
                    property: ['background-size'],
                    selectorPlugin: 'hoverTarget',
                    selectorModifier: 'hoverItem',
                    explodedSource: {
                        prefix: 'hover-item',
                        prefixSeparator: '-',
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'contain',
                        modifierSeparator: '',
                        modifierIdentifier: '',
                        suffixSeparator: '',
                        suffix: '',
                    },
                    classObject: {
                        'background-size': 'contain',
                    },
                },
            ]);
        });
    });
});
