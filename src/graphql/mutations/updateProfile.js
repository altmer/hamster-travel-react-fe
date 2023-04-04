import { gql } from 'graphql.macro';

export default gql`
  mutation UpdateProfile(
    $name: String!
    $homeTownId: String
    $currency: String
  ) {
    updateProfile(name: $name, homeTownId: $homeTownId, currency: $currency) {
      result {
        id
        name
        currency
        homeTownId
        initials
        avatarThumb
      }
      successful
      messages {
        field
        message
      }
    }
  }
`;
