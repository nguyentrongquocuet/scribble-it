import gql from 'graphql-tag';

export function userFragment(on = 'User') {
  return gql`
      fragment UserFragment on ${on} {
        id
        username
        avatar
      }
    `;
}

export const d = '';
