import { gql } from 'graphql.macro';

export default gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    register(
      email: $email
      name: $name
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
