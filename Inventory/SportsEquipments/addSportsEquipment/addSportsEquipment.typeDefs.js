import { gql } from "apollo-server-express";

export default gql`
  type AddSportsItemResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    addSportsItems(
      name: String!
      quantity: Int!
      category: String!
    ): AddSportsItemResult!
  }
`;
