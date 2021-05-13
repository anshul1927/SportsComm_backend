import { gql } from "apollo-server-express";

export default gql`
  type AddSportsCategoryResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    addSportsCategory(category: String!): AddSportsCategoryResult!
  }
`;
