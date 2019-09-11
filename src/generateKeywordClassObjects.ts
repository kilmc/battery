import { BatteryConfig } from 'types/battery-config';
import { ClassObject } from 'types/classname';

export const generateKeywordClassObjects = (
  config: BatteryConfig,
): { [k: string]: ClassObject } => {
  const keywordProps = config.props.filter(
    prop => prop.keywordValues !== undefined,
  );

  return {};
};
