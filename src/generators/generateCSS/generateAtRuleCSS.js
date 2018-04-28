import generateClasses from './generateClasses';

const generateAtRuleCSS = ({atrule, output, library, condition}) => {
  const renderedClasses = generateClasses(library,true);
  if (!renderedClasses) return output;
  const renderedAtrule = `\n@${atrule} ${condition} {\n  ${renderedClasses}\n}\n`;
  return output += renderedAtrule;
};

export default generateAtRuleCSS;