import { hasX } from '../utils';

export const hasLookupValues = (valuePlugins) =>
  hasX(valuePlugins,x => x.values);