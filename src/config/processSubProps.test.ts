import { convertSubProps } from './processSubProps';
import {
  PropertyConfig,
  DeveloperPropertyConfig,
} from '../types/property-config';
import { DeveloperBatteryConfig } from '../types/battery-config';

describe('processSubProps', () => {
  it('converts configs with subProps into their own separate configs', () => {
    const margin: DeveloperPropertyConfig = {
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

    const props = [margin];
    const marginSubProps: DeveloperPropertyConfig[] = [
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

    const config: DeveloperBatteryConfig = {
      props,
    };

    expect(convertSubProps(config).props).toEqual(marginSubProps);
  });
});
