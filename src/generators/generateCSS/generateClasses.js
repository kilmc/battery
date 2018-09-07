import { escapeCharacters } from '../../utils';

const singleLineClass = (className,classBody) =>
  `.${className} { ${classBody} }`;

const multiLineClass = (className,classBody,indent) =>
  `.${className} {
  ${classBody}
${indent ? '  ' : ''}}`;

export const generateClass = (className,declarations, multiple, indent) => {
  const escapedClassName = escapeCharacters(className);
  const classBody = Object.keys(declarations)
    .map(prop => `${indent && multiple ? '  ' : ''}${prop}: ${declarations[prop]};`)
    .join(multiple ? '\n  ' :' ');

  return multiple
    ? multiLineClass(escapedClassName,classBody,indent)
    : singleLineClass(escapedClassName,classBody);
};

const generateClasses = (obj, indent = false) => {
  if (Object.keys(obj).length < 1) return;
  return Object.keys(obj)
    .map(cx => {
      const multiple = Object.keys(obj[cx]).length > 1;
      return generateClass(cx,obj[cx],multiple,indent);
    })
    .join(indent ? '\n  ' : '\n');
}

export default generateClasses;