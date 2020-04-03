import { generateKeywordMatcher } from '../matchers/generateKeywordMatcher';
describe('generateKeywordMatchers', function () {
    describe('Given a valid batteryConfig', function () {
        describe('When the config contains keyword classes', function () {
            it('Then it generates a regex to match those keyword classes', function () {
                var classMetaData = [
                    {
                        source: 'absolute',
                        property: ['position'],
                        keyword: true,
                    },
                    {
                        source: 'block',
                        property: ['display'],
                        keyword: true,
                    },
                ];
                expect(generateKeywordMatcher(classMetaData, []).keyword).toEqual(/(^)(absolute|block)($)/);
            });
            it('And it orders the classNames by length', function () {
                var classMetaData = [
                    {
                        source: 'absolute',
                        property: ['position'],
                        keyword: true,
                    },
                    {
                        source: 'block',
                        property: ['display'],
                        keyword: true,
                    },
                    {
                        source: 'bg-contain',
                        property: ['background-size'],
                        keyword: true,
                    },
                ];
                expect(generateKeywordMatcher(classMetaData, []).keyword).toEqual(/(^)(bg-contain|absolute|block)($)/);
            });
        });
    });
    describe('Class plugins', function () {
        describe('Handle prefixes', function () {
            var formatPseudo = function (cx, pseudo) { return cx + ":" + pseudo; };
            var classPlugins = [
                {
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
                },
            ];
            var classMetaData = [
                {
                    source: 'absolute',
                    property: ['position'],
                    keyword: true,
                },
                {
                    source: 'block',
                    property: ['display'],
                    keyword: true,
                },
            ];
            it('generates a matcher', function () {
                expect(generateKeywordMatcher(classMetaData, classPlugins)).toEqual({
                    keyword: /(hover-|focus-|^)(absolute|block)($)/,
                });
            });
        });
    });
});
