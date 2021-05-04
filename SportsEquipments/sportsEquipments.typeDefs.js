import { gql } from "apollo-server"


export default gql`
    type SportsEquipments {
        itemid: String!
        itemName: String!
        sports: String
        categoryOfEquipment: String!
        quantity: Int!
        available: Int!
        createdAt: String!
        updatedAt: String!
    }
    
`;