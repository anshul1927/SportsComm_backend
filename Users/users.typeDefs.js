import { gql } from "apollo-server"


export default gql`
    type User{
        firstname: String!
        lastname: String
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }
    
`;