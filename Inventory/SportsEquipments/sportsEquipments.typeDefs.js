import { gql } from "apollo-server";
import GraphQLDate from "graphql-iso-date";
export default gql`
  type SportsEquipments {
    name: String!
    quantity: Int!
    available: Int
    createdAt: String!
    updatedAt: String!
  }
`;
