import { gql } from 'graphql.macro';

export default gql`
  query {
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
`;
