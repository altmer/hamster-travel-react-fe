import { gql } from 'graphql.macro';

export default gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      currentUser {
        id
        name
        currency
        initials
        color
        avatarThumb
        homeTownId
      }
    }
  }
`;
