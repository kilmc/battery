// import { subtractArrays } from './helpers';

export const groupByCharLength = (arr) => {
  const sorted = arr.reduce((xs,x) => {
    const charCount = x.length;

    if (!xs[charCount]) {
      xs[charCount] = [x];
    } else {
      xs[charCount].push(x);
    }
    return xs;
  },{});

  return sorted;
};


// export const createPlugin = (pluginConfig) => (propConfigs,arr) => {
//   const classFilter = (arr) => {

//   };
// };