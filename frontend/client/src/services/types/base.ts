import { RefItAll } from './utils';

export type ResolverResult<D, E = string> = RefItAll<{
  successResult: D;
  failResult: E;
  loading: boolean;
}>;

export interface QueryResult<Name> {
  __typename: Name;
}

export type RootQueryResult<Name, SuccessNode, ErrorNode> = {
  __typename: Name;
  status: 'SUCCESS';
  statusCode: number;
  node: SuccessNode;
} | {
  __typename: Name;
  status: 'ERROR';
  statusCode: number;
  node: ErrorNode;
}
