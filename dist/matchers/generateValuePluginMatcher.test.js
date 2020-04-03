import { generateValuePluginMatcher } from '../matchers/generateValuePluginMatcher';
describe('generateValuePluginMatcher', function () {
    var colorPlugin = {
        type: 'lookup',
        name: 'color',
        values: {
            black: '#000000',
            white: '#ffffff',
            pink: '#ff9dd8',
        },
    };
    describe('Value plugins', function () {
        describe('Handle no multiple props', function () {
            it('Then it generates a regex to match classes using the plugin', function () {
                var plugins = [colorPlugin];
                var props = [
                    {
                        cssProperty: ['background-color'],
                        classNamespace: 'bg',
                        pluginSeparator: '-',
                        valuePlugin: 'color',
                    },
                    {
                        cssProperty: ['fill'],
                        classNamespace: 'fill',
                        pluginSeparator: '-',
                        valuePlugin: 'color',
                    },
                ];
                expect(generateValuePluginMatcher(plugins, props)).toEqual({
                    color: /(^)(fill-|bg-)(black|white|pink)($)/,
                });
            });
        });
        describe('Handle single prop set as plugin default', function () {
            var plugins = [colorPlugin];
            var props = [
                {
                    cssProperty: ['color'],
                    classNamespace: 'text',
                    pluginDefault: true,
                    valuePlugin: 'color',
                },
            ];
            it('generates a matcher', function () {
                expect(generateValuePluginMatcher(plugins, props)).toEqual({
                    color: /(^)(black|white|pink)($)/,
                });
            });
        });
        describe('Handle multiple props with one set as plugin default', function () {
            var plugins = [colorPlugin];
            var props = [
                {
                    cssProperty: ['color'],
                    classNamespace: 'text',
                    pluginDefault: true,
                    valuePlugin: 'color',
                },
                {
                    cssProperty: ['background-color'],
                    classNamespace: 'bg',
                    pluginSeparator: '-',
                    valuePlugin: 'color',
                },
            ];
            it('generates a matcher', function () {
                expect(generateValuePluginMatcher(plugins, props)).toEqual({
                    color: /(^)(bg-|)(black|white|pink)($)/,
                });
            });
        });
        describe('Handle no props using the plugin', function () {
            var plugins = [colorPlugin];
            var props = [];
            it('does NOT generate a matcher', function () {
                expect(generateValuePluginMatcher(plugins, props)).toEqual({});
            });
        });
        describe('"Lookup" type plugin', function () {
            var lookupPlugin = {
                type: 'lookup',
                name: 'color',
                values: {
                    black: '#000000',
                    white: '#ffffff',
                    pink: '#ff9dd8',
                },
            };
            var plugins = [lookupPlugin];
            var props = [
                {
                    cssProperty: ['background-color'],
                    classNamespace: 'bg',
                    pluginSeparator: '-',
                    valuePlugin: 'color',
                },
            ];
            it('generates a regex that contains each value from the pluginConfig', function () {
                var matcher = generateValuePluginMatcher(plugins, props).color;
                expect(String(matcher).includes('white'));
                expect(String(matcher).includes('black'));
                expect(String(matcher).includes('pink'));
            });
        });
        describe('"Pattern" type plugin', function () {
            var integerPlugin = {
                type: 'pattern',
                name: 'integer',
                identifier: /-?\d{1,4}/,
            };
            describe('And none of the props using the plugin are set as the default', function () {
                it('Then it generates a regex to match classes using the plugin', function () {
                    var plugins = [integerPlugin];
                    var props = [
                        {
                            cssProperty: ['z-index'],
                            classNamespace: 'z',
                            valuePlugin: 'integer',
                        },
                    ];
                    expect(generateValuePluginMatcher(plugins, props)).toEqual({
                        integer: /(^)(z)(-?\d{1,4})($)/,
                    });
                });
            });
        });
    });
    describe('Class plugins', function () {
        describe('Handle prefixes', function () {
            var formatPseudo = function (cx, pseudo) { return cx + ":" + pseudo; };
            var pseudoPlugin = {
                name: 'pseudos',
                type: 'selector',
                affixType: 'prefix',
                modifiers: [
                    {
                        name: 'hover',
                        separator: '-',
                        identifier: 'hover',
                        modifierFn: formatPseudo,
                    },
                    {
                        name: 'focus',
                        separator: '-',
                        identifier: 'focus',
                        modifierFn: formatPseudo,
                    },
                ],
            };
            var plugins = [colorPlugin, pseudoPlugin];
            var props = [
                {
                    cssProperty: ['color'],
                    classNamespace: 'text',
                    pluginDefault: true,
                    valuePlugin: 'color',
                },
                {
                    cssProperty: ['background-color'],
                    classNamespace: 'bg',
                    pluginSeparator: '-',
                    valuePlugin: 'color',
                },
            ];
            it('generates a matcher', function () {
                expect(generateValuePluginMatcher(plugins, props)).toEqual({
                    color: /(hover-|focus-|^)(bg-|)(black|white|pink)($)/,
                });
            });
        });
        describe('Handle suffixes', function () {
            var breakpointsPlugin = {
                name: 'breakpoints',
                type: 'at-rule',
                atrule: 'media',
                affixType: 'suffix',
                modifiers: [
                    {
                        name: 'responsiveSmall',
                        identifier: 'sm',
                        separator: '-',
                        condition: '(min-width: 560px)',
                    },
                    {
                        name: 'responsiveSmall',
                        identifier: 'md',
                        separator: '-',
                        condition: '(min-width: 940px)',
                    },
                    {
                        name: 'responsiveLarge',
                        identifier: 'lg',
                        separator: '-',
                        condition: '(min-width: 1040px)',
                    },
                ],
            };
            var plugins = [colorPlugin, breakpointsPlugin];
            var props = [
                {
                    cssProperty: ['color'],
                    classNamespace: 'text',
                    pluginDefault: true,
                    valuePlugin: 'color',
                },
                {
                    cssProperty: ['background-color'],
                    classNamespace: 'bg',
                    pluginSeparator: '-',
                    valuePlugin: 'color',
                },
            ];
            it('generates a matcher', function () {
                expect(generateValuePluginMatcher(plugins, props)).toEqual({
                    color: /(^)(bg-|)(black|white|pink)(-sm|-md|-lg|$)/,
                });
            });
        });
    });
});
