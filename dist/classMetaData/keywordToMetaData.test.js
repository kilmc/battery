import { keywordToMetaData } from './keywordToMetaData';
describe('keywordToMetaData', function () {
    describe('Given a config containing keyword class definitions', function () {
        test('Then it generates meta information for the class', function () {
            var config = {
                props: [
                    {
                        cssProperty: ['background-size'],
                        classNamespace: 'bg',
                        valueSeparator: '-',
                        values: {
                            contain: 'contain',
                            cover: 'cover',
                        },
                        valuePlugin: 'lengthUnits',
                    },
                ],
            };
            var expectedBackgroundSizeResult = [
                {
                    source: 'bg-contain',
                    explodedSource: {
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'contain',
                    },
                    property: ['background-size'],
                    keyword: true,
                    classObject: {
                        'background-size': 'contain',
                    },
                },
                {
                    source: 'bg-cover',
                    explodedSource: {
                        classNamespace: 'bg',
                        valueOrPluginSeparator: '-',
                        valueIdentifier: 'cover',
                    },
                    property: ['background-size'],
                    keyword: true,
                    classObject: {
                        'background-size': 'cover',
                    },
                },
            ];
            expect(keywordToMetaData(config)).toEqual(expectedBackgroundSizeResult);
        });
        describe('When classNamespace and valueOrPluginSeparator are undefined', function () {
            var config = {
                props: [
                    {
                        cssProperty: ['display'],
                        values: {
                            block: 'block',
                            inline: 'inline',
                        },
                    },
                ],
            };
            test('Then it returns an empty string', function () {
                expect(keywordToMetaData(config)[0]).toEqual({
                    source: 'block',
                    explodedSource: {
                        classNamespace: '',
                        valueOrPluginSeparator: '',
                        valueIdentifier: 'block',
                    },
                    property: ['display'],
                    keyword: true,
                    classObject: {
                        display: 'block',
                    },
                });
                expect(keywordToMetaData(config)[1]).toEqual({
                    source: 'inline',
                    explodedSource: {
                        classNamespace: '',
                        valueOrPluginSeparator: '',
                        valueIdentifier: 'inline',
                    },
                    property: ['display'],
                    keyword: true,
                    classObject: {
                        display: 'inline',
                    },
                });
            });
        });
    });
});
