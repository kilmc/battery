import { processClassNameTypes } from '../../plugins/classNameType';
import generateLibrary from '../generateLibrary';
import generateClasses from './generateClasses';
import generateAtRules from './generateAtRules';

const generateCSS = (classNames, config) => {
  const library = generateLibrary(classNames,config);
  let libraryCSS = '';

  libraryCSS += generateAtRules(library,config.plugins);
  processClassNameTypes(library,config.plugins);

  libraryCSS = `${generateClasses(library)}\n${libraryCSS}`;

  return libraryCSS;
};

export default generateCSS;