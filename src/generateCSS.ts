import { BatteryConfig } from 'types/battery-config';
import { classMetaToCSS } from 'css/classMetaToCSS';
import { addMetaData } from 'classMetaData/addMetaData';

export const generateCSS = (
  classNames: string[],
  config: BatteryConfig,
): string => {
  const classMetaArr = addMetaData(classNames, config);
  const processedClasses = classMetaArr.map(classMeta => {
    classMeta.css = classMetaToCSS(classMeta, config.plugins);
    return classMeta;
  });

  return processedClasses.map(c => c.css).join(' ');
};
