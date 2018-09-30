import { processClassNameTypes } from '../../plugins/classNameType';
import generateLibrary from '../generateLibrary';
import generateClasses from './generateClasses';
import generateAtRules from '../generateAtRules';
import { BatteryConfig } from '../../types/';

const generateCSS = (classNames: string[], config: BatteryConfig): string => {
  const library = generateLibrary(classNames, config);
  let libraryCSS = '';

  libraryCSS += generateAtRules(library, config.plugins);

  processClassNameTypes(library, config.plugins);

  libraryCSS = [generateClasses(library), libraryCSS]
    .filter(x => x !== undefined)
    .join('\n')
    .toString();

  return libraryCSS;
};

export default generateCSS;
