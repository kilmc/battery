import { escapeCharacters } from '../../utils';

const singleLineClass = (className: string, classBody: string): string =>
  `.${className} { ${classBody} }`;

const multiLineClass = (
  className: string,
  classBody: string,
  indent: boolean
): string =>
  `.${className} {
  ${classBody}
${indent ? '  ' : ''}}`;

export const generateClass = (
  className: string,
  declarations: { [key: string]: string },
  multiple: boolean,
  indent: boolean
): string => {
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

const generateClasses = (
  obj: { [key: string]: { [key: string]: string } },
  indent: boolean = false
) => {
  if (Object.keys(obj).length < 1) return;
  return Object.keys(obj)
    .map(cx => {
      const multiple = Object.keys(obj[cx]).length > 1;
      return generateClass(cx, obj[cx], multiple, indent);
    })
    .join(indent ? '\n  ' : '\n');
};

export default generateClasses;
