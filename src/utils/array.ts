export const baseToCapture = (nonCapture: boolean) => (
  arr: string[],
  optional = false,
) => {
  if (arr.length < 1) {
    return '';
  }
  const optionalRegex = optional ? '|' : '';
  const nonCaptureRegex = nonCapture ? '?:' : '';
  const sortedJoined = arr.sort((a, b) => b.length - a.length).join('|');
  return `(${nonCaptureRegex}${sortedJoined}${optionalRegex})`;
};

export const toCapture = baseToCapture(false);
export const toGroup = baseToCapture(true);

export const unique = (arr: any[]) => [...new Set(arr)];
