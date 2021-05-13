import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";

//import { typeDefs, resolvers } from "./schema.js";
const { typeDefs, resolvers } = require("./schema");
// const resolvers = require('./resolver')
import { getUser, protectedResolver } from "./Users/users.utils";

import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

// mongodb+srv://anshul:anshul@cluster0.qn1xp.mongodb.net/sportsComm?retryWrites=true&w=majority

mongoose.connect(
  "mongodb://localhost/SportsComm",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) {
      console.log(
        "Unable to connect to the server. Please start the server. Error:",
        err
      );
    } else {
      console.log("Connected to Server successfully!");
    }
  }
);
mongoose.set("useCreateIndex", true);

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      logedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
app.use(logger("dev"));

server.applyMiddleware({
  app,
});

app.listen({ port: PORT }, () => {
  console.log(`🚀server is running on http://localhost:${PORT}✅`);
});
