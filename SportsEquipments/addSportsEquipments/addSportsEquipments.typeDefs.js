import {gql} from "apollo-server-express"

export default gql`

    type AddSportsEquipmentsResult {
        ok: Boolean!
        error: String
    }

    type Mutation{
        addSportsEquipment(
            itemid: String!
            itemName: String!
            sports: String
            categoryOfEquipment: String!
            quantity: Int!
        ): AddSportsEquipmentsResult!
    }
`;