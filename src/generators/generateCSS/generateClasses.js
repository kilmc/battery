import { escapeCharacters } from '../../utils';

const singleLineClass = (className, classBody) =>
  `.${className} { ${classBody} }`;

const multiLineClass = (className, classBody, indent) =>
  `.${className} {
  ${classBody}
${indent ? '  ' : ''}}`;

export const generateClass = (className, declarations, multiple, indent) => {
  const escapedClassName = escapeCharacters(className);
  const classBody = Object.keys(declarations)
    .map(
      prop => `${indent && multiple ? '  ' : ''}${prop}: ${declarations[prop]};`
    )
    .join(multiple ? '\n  ' : ' ');

  return multiple
    ? multiLineClass(escapedClassName, classBody, indent)
    : singleLineClass(escapedClassName, classBody);
};

const shorthandProps = [
  'border',
  'border-top',
  'border-bottom',
  'border-left',
  'border-right',
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'padding',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right'
];

export const filterUtilityClasses = (obj, classPlugins) => {
  const regex = classPlugins
    .reduce((pluginRegex, plugin) => {
      const modifiers = plugin.modifiers;
      const root = plugin.className[0];
      const includeRoot = plugin.className[1] ? [plugin.className[0]] : [];
      let modifierStrings = [];

      if (modifiers) {
        modifierStrings = modifiers.reduce((accum, modifier) => {
          const {
            regex = '',
            regexSeparator = '',
            separator = '',
            className
          } = modifier;

          const modifierClassName =
            className && className[0] ? className[0] : '';

          const item = `${root}${separator}${modifierClassName}${regexSeparator}${regex}`;

          return accum.concat(item);
        }, []);
      }

      const pluginRegexSet = includeRoot.concat(modifierStrings);
      return pluginRegex.concat(pluginRegexSet);
    }, [])
    .join('|');
  const utilityClassNames = Object.keys(obj).filter(className =>
    className.match(regex)
  );

  return utilityClassNames.reduce((accum, cx) => {
    accum[cx] = obj[cx];
    Reflect.deleteProperty(obj, cx);
    return accum;
  }, {});
};

const orderShorthandProps = obj => {
  const shorthandClasses = Object.keys(obj)
    .filter(className => {
      const props = Object.keys(obj[className]);
      return props.some(prop => shorthandProps.includes(prop));
    })
    .sort();

  return shorthandClasses.reduce((accum, cx) => {
    accum[cx] = obj[cx];
    Reflect.deleteProperty(obj, cx);
    return accum;
  }, {});
};

const orderClassesByProperty = obj => {
  const orderedClassNames = Object.keys(obj).sort((a, b) => {
    const propA = Object.keys(obj[a])[0];
    const propB = Object.keys(obj[b])[0];

    return propA.localeCompare(propB);
  });

  return orderedClassNames.reduce((accum, cx) => {
    accum[cx] = obj[cx];
    Reflect.deleteProperty(obj, cx);
    return accum;
  }, {});
};

export const orderClasses = (obj, config) => {
  let utilityClasses = {};
  if (config.plugins) {
    const classTypePlugins = config.plugins.filter(
      plugin => plugin.type === 'class'
    );
    utilityClasses = filterUtilityClasses(obj, classTypePlugins);
  }

  const shorthandClasses = orderShorthandProps(obj);
  const remainingClasses = orderClassesByProperty(obj);
  return {
    ...utilityClasses,
    ...shorthandClasses,
    ...remainingClasses
  };
};

const generateClasses = (obj, indent = false) => {
  if (Object.keys(obj).length < 1) return;
  return Object.keys(obj)
    .map(cx => {
      const multiple = Object.keys(obj[cx]).length > 1;
      return generateClass(cx, obj[cx], multiple, indent);
    })
    .join(indent ? '\n  ' : '\n');
};

export default generateClasses;
