"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express = require("express");
var graphqlHTTP = require("express-graphql");
var schema = require('./schema/schema');
// Create a new express application instance
var app = express();
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
