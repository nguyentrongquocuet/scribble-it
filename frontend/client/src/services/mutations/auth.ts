import gql from 'graphql-tag';
import { userFragment } from '../fragments';

export const LOGIN_MUTATION = gql`
  mutation MLogin($username: String!, $password: String!) {
      Login(username: $username, password: $password){
        status
        statusCode
        node {
          ...on LoginFailed {
              message
          }
          ...on AuthToken {
            token
            expiredAt
            user {
              ...UserFragment
            }
          }
        }
      }
  }
  ${userFragment()}
`;

export const SIGNUP_MUTATION = gql`
  mutation MSignUp($username: String!, $password: String!, $repassword: String!, $avatar: String) {
    SignUp(password: $password, repassword: $repassword, username:$username, avatar: $avatar) {
      status
      statusCode
      node {
        ...on AlreadyRegisted {
          message
        }
        ...on InvalidInput {
          errors {
            error
            field
          }
        }
        ...on AuthToken {
          expiredAt
          token
          user {
            ...UserFragment
          }
        }
      }
    }
  }
  ${userFragment()}
`;

