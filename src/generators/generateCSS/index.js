import { renameKeys } from '../../utils';
import { processClassNameTypes } from '../../plugins/classNameType';
import generateLibrary from '../generateLibrary';
import generateClasses from './generateClasses';
import generateAtRules from '../generateAtRules';

const generateCSS = (classNames, config) => {
  const library = generateLibrary(classNames,config);
  let libraryCSS = '';

  libraryCSS += generateAtRules(library,config.plugins,'css');

  processClassNameTypes(library,config.plugins);

  libraryCSS = [generateClasses(library),libraryCSS]
    .filter(x => x !== undefined)
    .join('\n').toString();

  return libraryCSS;
};

export default generateCSS;