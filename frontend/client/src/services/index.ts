import {
  ApolloClient, ApolloLink, InMemoryCache, HttpLink, concat,
} from '@apollo/client/core';

console.log(import.meta.env.VITE_SERVER_URL);

const uri = import.meta.env.VITE_SERVER_URL;
const cache = new InMemoryCache();

const authMiddleWare = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: 'Bearer helllo',
      ddd: 'dadasd',
    },
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri,
  credentials: 'include',
});

// eslint-disable-next-line import/prefer-default-export
export const apolloClient = new ApolloClient({
  name: 'scribble-it',
  cache,
  link: concat(authMiddleWare, httpLink),
});
