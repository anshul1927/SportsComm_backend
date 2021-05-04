import { gql } from "apollo-server"


export default gql`
    type User{
        firstname: String!
        lastname: String
        username: String!
        email: String!
        rollno: String!
        mobileno: String!
        gender: String!
        dob: String!
        batch: String!
        year: String!
        idType: String!
        createdAt: String!
        updatedAt: String!
    }
    
`;