import { gql } from 'graphql.macro';

export default gql`
  mutation ResetPassword(
    $token: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    resetPassword(
      passwordResetToken: $token
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
