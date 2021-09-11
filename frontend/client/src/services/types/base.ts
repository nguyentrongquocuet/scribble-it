import { RefItAll } from './utils';

export type ResolverResult<D, E = string> = RefItAll<{
  successResult: D;
  failResult: E;
  loading: boolean;
}>;
