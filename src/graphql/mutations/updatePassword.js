import { gql } from 'graphql.macro';

export default gql`
  mutation UpdatePassword(
    $oldPassword: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    updatePassword(
      oldPassword: $oldPassword
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      successful
      messages {
        field
        message
      }
    }
  }
`;
