import {ApolloServer} from "apollo-server";
//import { typeDefs, resolvers } from "./schema.js";
const {typeDefs,resolvers} = require('./schema')
// const resolvers = require('./resolver')
import {getUser, protectedResolver} from "./Users/users.utils";

import mongoose from 'mongoose';
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect('mongodb+srv://anshul:anshul@cluster0.qn1xp.mongodb.net/sportsComm?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
mongoose.set('useCreateIndex', true);


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req})=> {

        return  {
        logedInUser : await getUser(req.headers.token)
    };
},
    
});

server.listen().then(() => console.log("server is running"));






