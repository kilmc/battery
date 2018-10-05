import generateClasses from './generateClasses';

const generateAtRuleCSS = ({ atrule, output, library, condition }) => {
  const renderedClasses = generateClasses(library, true);
  if (!renderedClasses) return output;
  const renderedAtrule = `@${atrule} ${condition} {\n  ${renderedClasses}\n}`;
  return (output += renderedAtrule);
};

export default generateAtRuleCSS;
