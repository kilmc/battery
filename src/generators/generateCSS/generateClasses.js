export const generateClass = (className,declarations) => {
  const classBody = Object.keys(declarations)
    .map(prop => `${prop}: ${declarations[prop]};`)
    .join(' ');

  return `.${className} { ${classBody} }`;
};

const generateClasses = (obj, indent = false) => Object.keys(obj)
  .map(cx => generateClass(cx,obj[cx]))
  .join(indent ? '\n  ' : '\n');

export default generateClasses;