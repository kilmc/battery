import { BatteryConfig } from 'types/battery-config';
import { classMetaToCSS } from 'css/classMetaToCSS';
import { addMetaData } from 'classMetaData/addMetaData';

export const generateCSS = (
  classNames: string[],
  config: BatteryConfig,
): string => {
  const classMeta = addMetaData(classNames, config);
  const processedClasses = classMeta.map(classMetaToCSS);

  return processedClasses.join(' ');
};
