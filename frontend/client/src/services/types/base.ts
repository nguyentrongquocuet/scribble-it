import { RefItAll } from './utils';

export type ResolverResult<D, E = string> = {
  successResult?: D;
  failResult?: E;
  loading: boolean;
}
