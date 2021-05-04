import {gql} from "apollo-server";

export default gql`

    type CreateAccountResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        createAccount(
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
            password: String!
        ): CreateAccountResult!
    }
`;