import { ClassMetaData } from 'types/classname';
import { BatteryConfig } from 'types/battery-config';
import { generateClassObject } from 'utils/classObjects';

export const keywordToMetaData = (config: BatteryConfig): ClassMetaData[] => {
  const keywordProps = config.props.filter(prop => prop.values);

  if (keywordProps.length === 0) {
    return [];
  }

  return keywordProps
    .map(propConfig => [
      ...Object.entries(propConfig.values).reduce(
        (accum, [valueIdentifier, value]) => {
          const {
            valueSeparator = '',
            classNamespace = '',
            cssProperty,
          } = propConfig;

          const isDefaultValue = valueIdentifier === '__DEFAULT__';
          const sanitizedValueIdentifier = isDefaultValue
            ? ''
            : valueIdentifier;

          const processedSource = isDefaultValue
            ? `${classNamespace}${sanitizedValueIdentifier}`
            : `${classNamespace}${valueSeparator}${sanitizedValueIdentifier}`;

          const classMetaDataObj: ClassMetaData = {
            source: processedSource,
            keyword: true,
            property: cssProperty,
            explodedSource: {
              classNamespace: classNamespace,
              valueOrPluginSeparator: valueSeparator,
              valueIdentifier: sanitizedValueIdentifier,
            },
            classObject: generateClassObject(cssProperty, value),
          };

          return accum.concat(classMetaDataObj);
        },
        [],
      ),
    ])
    .reduce((xs, x) => xs.concat(x));
};
