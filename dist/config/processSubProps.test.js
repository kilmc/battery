import { convertSubProps } from './processSubProps';
describe('processSubProps', function () {
    it('converts configs with subProps into their own separate configs', function () {
        var margin = {
            cssProperty: ['margin'],
            classNamespace: 'm',
            subProps: {
                all: '',
                top: 't',
                right: 'r',
                bottom: 'b',
                left: 'l',
                vertical: 'y',
                horizontal: 'x',
            },
            valueSeparator: '',
            values: {
                auto: 'auto',
            },
            valuePlugin: 'lengthUnit',
        };
        var props = [margin];
        var marginSubProps = [
            {
                cssProperty: ['margin'],
                classNamespace: 'm',
                valueSeparator: '',
                values: {
                    auto: 'auto',
                },
                valuePlugin: 'lengthUnit',
            },
            {
                cssProperty: ['margin-top'],
                classNamespace: 'mt',
                valueSeparator: '',
                values: {
                    auto: 'auto',
                },
                valuePlugin: 'lengthUnit',
            },
            {
                cssProperty: ['margin-right'],
                classNamespace: 'mr',
                valueSeparator: '',
                values: {
                    auto: 'auto',
                },
                valuePlugin: 'lengthUnit',
            },
            {
                cssProperty: ['margin-bottom'],
                classNamespace: 'mb',
                valueSeparator: '',
                values: {
                    auto: 'auto',
                },
                valuePlugin: 'lengthUnit',
            },
            {
                cssProperty: ['margin-left'],
                classNamespace: 'ml',
                valueSeparator: '',
                values: {
                    auto: 'auto',
                },
                valuePlugin: 'lengthUnit',
            },
            {
                cssProperty: ['margin-top', 'margin-bottom'],
                classNamespace: 'my',
                valueSeparator: '',
                values: {
                    auto: 'auto',
                },
                valuePlugin: 'lengthUnit',
            },
            {
                cssProperty: ['margin-right', 'margin-left'],
                classNamespace: 'mx',
                valueSeparator: '',
                values: {
                    auto: 'auto',
                },
                valuePlugin: 'lengthUnit',
            },
        ];
        var config = {
            props: props,
        };
        expect(convertSubProps(config).props).toEqual(marginSubProps);
    });
});
