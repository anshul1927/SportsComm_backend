import { gql } from "apollo-server-express";

export default gql`
  type Sports {
    category: String!
    items: [SportsEquipments]
  }
`;
