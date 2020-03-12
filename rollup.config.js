import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: {
    // use CommonJS for now, until Node.js fully supports ES Modules
    // https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff
    format: 'cjs',
    dir: 'dist',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
