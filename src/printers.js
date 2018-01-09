// ------------------------------------------------------------------
// ============================  C S S  =============================
// ------------------------------------------------------------------

export const printClass = (className,declarations) => {
  const classBody = Object.keys(declarations)
    .map(prop => `${prop}: ${declarations[prop]};`)
    .join(' ')

  return `.${className} { ${classBody} }`;
};

export const atomsToCSS = (obj, indent = false) => Object.keys(obj)
  .map(cx => printClass(cx,obj[cx]))
  .join(indent ? '\n  ' : '\n');

export const generateMediaQuery = (classes,breakpoint,breakpoints) => {
  const renderedClasses = atomsToCSS(classes,true)
  return `\n@media (min-width: ${breakpoints[breakpoint]}) {
  ${renderedClasses}
}`
}
