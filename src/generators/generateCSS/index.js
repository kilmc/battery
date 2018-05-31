import cssesc from 'cssesc';
import { renameKeys } from '../../utils/';
import { processClassNameTypes } from '../../plugins/classNameType';
import generateLibrary from '../generateLibrary';
import generateClasses from './generateClasses';
import generateAtRules from '../generateAtRules';

const processDisallowedCharacters = (library) => {
  const escape = (str) => cssesc(str,{isIdentifier: true});
  const regex = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
  renameKeys(library,x => !x.match(regex),escape);
};

const generateCSS = (classNames, config) => {
  const library = generateLibrary(classNames,config);
  processDisallowedCharacters(library);
  let libraryCSS = '';

  libraryCSS += generateAtRules(library,config.plugins,'css');

  processClassNameTypes(library,config.plugins);

  libraryCSS = `${generateClasses(library)}\n${libraryCSS}`;

  return libraryCSS;
};

export default generateCSS;