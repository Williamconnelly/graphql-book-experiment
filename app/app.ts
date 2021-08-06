// lib/app.ts
import express = require('express');
import graphqlHTTP = require('express-graphql');
import mongoose from 'mongoose';
const cors = require('cors');
const schema = require('./schema/schema');

// Create a new express application instance
const app: express.Application = express();

mongoose.connect('mongodb+srv://dbAdmin:dbAdmin00@cluster0-yn6mm.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => console.log('CONNECTED TO DATABASE!'));

app.use(cors());

app.use(`/graphql`, graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});