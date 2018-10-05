import { generateLibrary } from '../';
import generateAtRules from '../generateAtRules';
import { processClassNameTypes } from '../../plugins/classNameType';

const generateStyleTags = config => classNames => {
  const library = generateLibrary(classNames, config);
  let libraryCSS = '';

  libraryCSS += generateAtRules(library, config.plugins, 'styletags');
  processClassNameTypes(library, config.plugins);

  return libraryCSS;
};

export default generateStyleTags;
