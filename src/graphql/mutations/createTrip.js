import { gql } from 'graphql.macro';

export default gql`
  mutation CreateTrip(
    $name: String!
    $shortDescription: String
    $datesUnknown: Boolean
    $startDate: DateTime
    $endDate: DateTime
    $duration: Int
    $currency: String!
    $status: String!
    $peopleCountForBudget: Int!
    $private: Boolean!
  ) {
    createTrip(
      input: {
        name: $name
        shortDescription: $shortDescription
        datesUnknown: $datesUnknown
        startDate: $startDate
        endDate: $endDate
        duration: $duration
        currency: $currency
        status: $status
        peopleCountForBudget: $peopleCountForBudget
        private: $private
      }
    ) {
      result {
        id
      }
      successful
      messages {
        field
        message
      }
    }
  }
`;
