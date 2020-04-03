import { generateMatchers } from '../matchers/generateMatchers';
import { keywordToMetaData } from '../classMetaData/keywordToMetaData';
describe('generateMatchers', function () {
    describe('Given a valid batteryConfig', function () {
        describe('when the config contains keyword classes', function () {
            var config = {
                props: [
                    {
                        cssProperty: ['display'],
                        values: {
                            block: 'block',
                        },
                    },
                    {
                        cssProperty: ['position'],
                        values: {
                            absolute: 'absolute',
                        },
                    },
                ],
            };
            var classMetaData = keywordToMetaData(config);
            it('generates a regex to match those keyword classes', function () {
                expect(generateMatchers(config, classMetaData).keyword).toEqual(/(^)(absolute|block)($)/);
            });
        });
        describe('when the config contains a lookup plugin', function () {
            it('generates a regex to match classes associated with a specific plugin', function () {
                var colorPlugin = {
                    type: 'lookup',
                    name: 'color',
                    values: {
                        black: '#000000',
                        white: '#ffffff',
                        pink: '#ff9dd8',
                    },
                };
                var config = {
                    props: [
                        {
                            cssProperty: ['fill'],
                            classNamespace: 'fill',
                            pluginSeparator: '-',
                            valuePlugin: 'color',
                        },
                        {
                            cssProperty: ['background-color'],
                            classNamespace: 'bg',
                            pluginSeparator: '-',
                            valuePlugin: 'color',
                        },
                        {
                            cssProperty: ['color'],
                            classNamespace: 'text',
                            pluginDefault: true,
                            valuePlugin: 'color',
                        },
                    ],
                    plugins: [colorPlugin],
                };
                expect(generateMatchers(config, []).color).toEqual(/(^)(fill-|bg-|)(black|white|pink)($)/);
            });
        });
    });
});
