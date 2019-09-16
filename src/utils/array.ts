export const toCapture = (arr: string[], optional = false) => {
  if (arr.length < 1) {
    return '';
  }
  const optionalRegex = optional ? '?' : '';
  const sortedJoined = arr.sort((a, b) => b.length - a.length).join('|');
  return `(${sortedJoined})${optionalRegex}`;
};
