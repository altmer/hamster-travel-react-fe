import { gql } from 'graphql.macro';

export default gql`
  mutation setLocale($locale: String!) {
    setLocale(locale: $locale) @client
  }
`;
