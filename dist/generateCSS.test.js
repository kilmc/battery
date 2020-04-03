import { generateCSS } from './generateCSS';
import { pseudoPlugin } from './fixtures/plugins/pseudo';
import { hoverTargetPlugin } from './fixtures/plugins/hoverTarget';
import { breakpointPlugin } from './fixtures/plugins/breakpoint';
import { margin } from './fixtures/props/margin';
import { lengthUnitsPlugin } from './fixtures/plugins/lengthUnits';
var testOutput = function (source, expectation) {
    expect(source.replace(/\s/g, '')).toEqual(expectation.replace(/\s/g, ''));
};
describe('generateCSS', function () {
    describe('Handles keywords', function () {
        describe('with propIndicator', function () {
            var input = ['bg-contain', 'text-center'];
            var config = {
                props: [
                    {
                        cssProperty: 'background-size',
                        classNamespace: 'bg',
                        valueSeparator: '-',
                        values: {
                            contain: 'contain',
                            cover: 'cover',
                        },
                    },
                    {
                        cssProperty: 'text-align',
                        classNamespace: 'text',
                        valueSeparator: '-',
                        values: {
                            center: 'center',
                        },
                    },
                ],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.bg-contain { background-size: contain } .text-center { text-align: center }');
            });
        });
        describe('with NO propIndicator', function () {
            var input = ['block', 'absolute'];
            var config = {
                props: [
                    {
                        cssProperty: 'display',
                        values: {
                            block: 'block',
                        },
                    },
                    {
                        cssProperty: 'position',
                        values: {
                            absolute: 'absolute',
                        },
                    },
                ],
            };
            test('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.block { display: block } .absolute { position: absolute }');
            });
        });
        describe('with a default value', function () {
            var input = ['border'];
            var config = {
                props: [
                    {
                        cssProperty: 'border',
                        classNamespace: 'border',
                        valueSeparator: '-',
                        values: { __DEFAULT__: '1px solid #000' },
                    },
                ],
            };
            test('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.border { border: 1px solid #000 }');
            });
        });
    });
    describe('Handles subProps', function () {
        describe('standard set', function () {
            var classNames = ['mb2', 'mt10p', 'm3', 'mr1'];
            var config = {
                props: [margin],
                plugins: [lengthUnitsPlugin],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(classNames, config), "\n          .m3 { margin: 1.125rem }\n          .mb2 { margin-bottom: 0.75rem }\n          .mr1 { margin-right: 0.375rem }\n          .mt10p { margin-top: 10% }\n          ");
            });
        });
        describe('multiple prop set', function () {
            var classNames = ['mx2', 'my50p'];
            var config = {
                props: [margin],
                plugins: [lengthUnitsPlugin],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(classNames, config), "\n          .mx2 { margin-right: 0.75rem; margin-left: 0.75rem }\n          .my50p { margin-top: 50%; margin-bottom: 50% }\n          ");
            });
        });
        describe('border prop set', function () {
            var classNames = ['border-top-solid', 'border-x-dashed'];
            var config = {
                props: [
                    {
                        cssProperty: 'border-style',
                        classNamespace: 'border',
                        subPropSeparator: '-',
                        subProps: {
                            top: 'top',
                            right: 'right',
                            bottom: 'bottom',
                            left: 'left',
                            horizontal: 'x',
                            vertical: 'y',
                        },
                        valueSeparator: '-',
                        values: {
                            solid: 'solid',
                            dashed: 'dashed',
                        },
                    },
                ],
                plugins: [lengthUnitsPlugin],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(classNames, config), "\n          .border-x-dashed {  border-right-style: dashed; border-left-style: dashed}\n          .border-top-solid { border-top-style: solid }\n          ");
            });
        });
    });
    describe('Handles pattern plugins', function () {
        describe('with NO modifiers', function () {
            var input = ['z100', 'flex1'];
            var config = {
                props: [
                    {
                        cssProperty: 'z-index',
                        classNamespace: 'z',
                        valuePlugin: 'integer',
                    },
                    {
                        cssProperty: 'flex',
                        classNamespace: 'flex',
                        valuePlugin: 'integer',
                    },
                ],
                plugins: [
                    { type: 'pattern', name: 'integer', identifier: /-?\d{1,4}/ },
                ],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), ' .flex1 { flex: 1 } .z100 { z-index: 100 }');
            });
        });
        describe('with modifiers', function () {
            var input = ['w100p', 'h50p'];
            var config = {
                props: [
                    {
                        cssProperty: 'width',
                        classNamespace: 'w',
                        valuePlugin: 'lengthUnit',
                    },
                    {
                        cssProperty: 'height',
                        classNamespace: 'h',
                        valuePlugin: 'lengthUnit',
                    },
                ],
                plugins: [
                    {
                        type: 'pattern',
                        name: 'lengthUnit',
                        identifier: /-?\d{1,4}/,
                        modifiers: [
                            {
                                name: 'percent',
                                identifier: 'p',
                                modifierFn: function (value) { return value + "%"; },
                            },
                        ],
                    },
                ],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.h50p { height: 50% } .w100p { width: 100% }');
            });
        });
        describe('with default modifier', function () {
            var input = ['m3'];
            var config = {
                props: [
                    {
                        cssProperty: 'margin',
                        classNamespace: 'm',
                        valuePlugin: 'lengthUnit',
                    },
                ],
                plugins: [
                    {
                        type: 'pattern',
                        name: 'lengthUnit',
                        identifier: /-?\d{1,4}/,
                        modifiers: [
                            {
                                name: 'baseline',
                                defaultModifier: true,
                                modifierFn: function (value) {
                                    var number = (parseInt(value) * 6) / 10;
                                    return number + "rem";
                                },
                            },
                        ],
                    },
                ],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.m3 { margin: 1.8rem }');
            });
        });
    });
    describe('Handles lookup plugins', function () {
        describe('with NO modifiers', function () {
            var input = ['bg-black', 'white'];
            var config = {
                props: [
                    {
                        cssProperty: 'color',
                        pluginDefault: true,
                        valuePlugin: 'color',
                    },
                    {
                        cssProperty: 'background-color',
                        classNamespace: 'bg',
                        pluginSeparator: '-',
                        valuePlugin: 'color',
                    },
                ],
                plugins: [
                    {
                        type: 'lookup',
                        name: 'color',
                        values: { black: '#000000', white: '#FFFFFF' },
                    },
                ],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.bg-black { background-color: #000000 } .white { color: #FFFFFF }');
            });
        });
        describe('with modifiers', function () {
            var hexToRgba = function (hex, opacity) {
                var hexValue = hex.replace('#', '');
                var r = parseInt(hexValue.substring(0, 2), 16);
                var g = parseInt(hexValue.substring(2, 4), 16);
                var b = parseInt(hexValue.substring(4, 6), 16);
                return "rgba(" + r + "," + g + "," + b + "," + parseInt(opacity) / 100 + ")";
            };
            var input = ['bg-black_50', 'white_01'];
            var config = {
                props: [
                    {
                        cssProperty: 'color',
                        pluginDefault: true,
                        valuePlugin: 'color',
                    },
                    {
                        cssProperty: 'background-color',
                        classNamespace: 'bg',
                        pluginSeparator: '-',
                        valuePlugin: 'color',
                    },
                ],
                plugins: [
                    {
                        type: 'lookup',
                        name: 'color',
                        values: { black: '#000000', white: '#FFFFFF' },
                        modifiers: [
                            {
                                name: 'opacity',
                                modifierFn: hexToRgba,
                                separator: '_',
                                identifier: /\d+/,
                            },
                        ],
                    },
                ],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.bg-black_50 { background-color: rgba(0,0,0,0.5) } .white_01 { color: rgba(255,255,255,0.01) }');
            });
        });
    });
    describe('Handles selector plugins', function () {
        var input = ['hover-bg-contain', 'hover-item-text-center'];
        var config = {
            props: [
                {
                    cssProperty: 'background-size',
                    classNamespace: 'bg',
                    valueSeparator: '-',
                    values: {
                        contain: 'contain',
                        cover: 'cover',
                    },
                },
                {
                    cssProperty: 'text-align',
                    classNamespace: 'text',
                    valueSeparator: '-',
                    values: {
                        center: 'center',
                    },
                },
            ],
            plugins: [pseudoPlugin, hoverTargetPlugin],
        };
        describe('', function () {
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), '.hover-bg-contain:hover { background-size: contain } .hover-target:hover .hover-item-text-center { text-align: center }');
            });
        });
    });
    describe('Handles atrule plugins', function () {
        var input = ['bg-contain-md', 'bg-cover-md', 'text-center-sm'];
        var config = {
            props: [
                {
                    cssProperty: 'background-size',
                    classNamespace: 'bg',
                    valueSeparator: '-',
                    values: {
                        contain: 'contain',
                        cover: 'cover',
                    },
                },
                {
                    cssProperty: 'text-align',
                    classNamespace: 'text',
                    valueSeparator: '-',
                    values: {
                        center: 'center',
                    },
                },
            ],
            plugins: [breakpointPlugin],
        };
        describe('', function () {
            it('renders valid CSS', function () {
                testOutput(generateCSS(input, config), "\n          @media (min-width: 560px) {\n            .text-center-sm { text-align: center }\n          }\n          @media (min-width: 940px) {\n            .bg-contain-md { background-size: contain }\n            .bg-cover-md { background-size: cover }\n          }");
            });
        });
    });
    describe('Sorts', function () {
        describe('into descending alpha-numeric order', function () {
            var backgroundSize = {
                cssProperty: 'background-size',
                classNamespace: 'bg',
                valueSeparator: '-',
                values: {
                    contain: 'contain',
                    cover: 'cover',
                },
            };
            var textAlign = {
                cssProperty: 'text-align',
                classNamespace: 'text',
                valueSeparator: '-',
                values: {
                    center: 'center',
                },
            };
            var classNames = [
                'text-center',
                'bg-cover',
                'mb2',
                'mt10p',
                'm3',
                'mr1',
                'bg-contain',
                'mr2',
                'mr3',
                'mt11',
                'mt11p',
            ];
            var config = {
                props: [margin, backgroundSize, textAlign],
                plugins: [lengthUnitsPlugin],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(classNames, config), "\n            .bg-contain { background-size: contain }\n            .bg-cover { background-size: cover }\n            .m3 { margin: 1.125rem }\n            .mb2 { margin-bottom: 0.75rem }\n            .mr1 { margin-right: 0.375rem }\n            .mr2 { margin-right: 0.75rem }\n            .mr3 { margin-right: 1.125rem }\n            .mt11 { margin-top: 4.125rem }\n            .mt10p { margin-top: 10% }\n            .mt11p { margin-top: 11% }\n            .text-center { text-align: center }\n          ");
            });
        });
        describe('moves auto and inherit values to the bottom of the list', function () {
            var margin = {
                cssProperty: 'margin',
                classNamespace: 'm',
                valueSeparator: '-',
                values: {
                    base: '1rem',
                    zzzz: '10rem',
                    auto: 'auto',
                    inherit: 'inherit',
                },
            };
            var classNames = ['m-auto', 'm-zzzz', 'm-inherit', 'm-base'];
            var config = {
                props: [margin],
                plugins: [lengthUnitsPlugin],
            };
            it('renders valid CSS', function () {
                testOutput(generateCSS(classNames, config), "\n            .m-base { margin: 1rem }\n            .m-zzzz { margin: 10rem }\n            .m-auto { margin: auto }\n            .m-inherit { margin: inherit }\n            ");
            });
        });
    });
});
