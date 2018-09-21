import generateClasses from './generateClasses';

interface AtRuleGeneratorObject {
  atrule: string;
  output: string;
  library: { [key: string]: { [key: string]: string } };
  condition: string;
}

const generateAtRuleCSS = ({
  atrule,
  output,
  library,
  condition
}: AtRuleGeneratorObject): string => {
  const renderedClasses = generateClasses(library, true);
  if (!renderedClasses) return output;
  const renderedAtrule = `@${atrule} ${condition} {\n  ${renderedClasses}\n}`;
  return (output += renderedAtrule);
};

export default generateAtRuleCSS;
