"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
// Dummy Data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: 1, authorId: 1 },
    { name: 'The Final Empire', genre: 'Fantasy', id: 2, authorId: 2 },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: 3, authorId: 3 }
];
var authors = [
    { name: 'Patrick Rotherfuss', age: 44, id: 1 },
    { name: 'Brandon Sanderson', age: 42, id: 2 },
    { name: 'Terry Pratchet', age: 66, id: 3 }
];
var BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        genre: { type: graphql_1.GraphQLString },
        author: {
            type: AuthorType,
            resolve: function (parent, args) {
                console.log('Parent', parent);
                return authors.find(function (author) { return author.id === parent.authorId; });
            }
        }
    }); }
});
var AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (parent, args) {
                // Code to get data from db / other source
                return books.find(function (book) { return book.id === args.id; });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (parent, args) {
                return authors.find(function (author) { return author.id === args.id; });
            }
        }
    }
});
module.exports = new graphql_1.GraphQLSchema({
    query: RootQuery
});
