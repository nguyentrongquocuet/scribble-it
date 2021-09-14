import gql from 'graphql-tag';

export const GET_DEFAULT_AVATAR = gql`
  query {
    DefaultAvatar
  }
`;
