import { gql } from 'graphql.macro';

export default gql`
  query GetLocale {
    locale @client
  }
`;
