//import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

import {loadFilesSync} from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
// import {makeExecutableSchema} from "@graphql-tools/schema"
// import path from "path";
/// const __dirname = path.resolve();
// console.log(path.resolve());

import path from "path";
const __dirname = path.resolve();


const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);

//const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

// const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js')`);
// console.log(path.resolve()+" 1");

// console.log(path.resolve() + " 2");

// const typeDefs = mergeTypeDefs(loadedTypes);
// console.log(path.resolve() + " 3");


// const resolvers = mergeResolvers(loadedResolvers);

// const schema = makeExecutableSchema({typeDefs, resolvers});
// console.log(path.resolve()+" 5");
// // //console.log(schema);

// export default schema;


// import { gql } from 'apollo-server';

// const typeDefs = gql`
//     type Menu {
//         _id: String,
//         name: String,
//         price: Float
//     }
//     type Restaurant {
//         _id: String,
//         name: String,
//         email: String,
//         location: String,
//         menu: [Menu]
//     }
//     type Customer {
//         _id: String,
//         name: String,
//         email: String,
//         location: String
//     }
//     type Order {
//         _id: String,
//         customerId: String,
//         restaurantId: String,
//         order: [String]
//     }
//     type Query {
//         restaurants: [Restaurant],
//         restaurant (id: String): Restaurant,
//         customers: [Customer],
//         customer (id: String): Customer,
//         orders: [Order],
//         order (id: String): Order
//     }
//     input MenuItem {
//         name: String,
//         price: Float
//     }
//     type Mutation {
//         addRestaurant (name: String, email: String, location: String, menu: [MenuItem]): Restaurant,
//         addCustomer (name: String, email: String, location: String): Customer,
//         addOrder (customerId: String, restaurantId: String, order: [String]): Order
//     }
//     type Subscription {
//         newOrder (restaurantId: String): Order
//     }
// `;

// module.exports = typeDefs