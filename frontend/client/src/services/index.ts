import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';

console.log(import.meta.env.VITE_SERVER_URL);

const link = ApolloLink.from([createUploadLink({
  uri: import.meta.env.VITE_SERVER_URL,
})]);
const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  name: 'scribble-it',
  cache,
  link,
});
