var { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql")
var express = require('express')
var { createHandler } = require("graphql-http/lib/use/express")
var { ruruHTML } = require("ruru/server")

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello(name: String!): String
//     age: String
//     weight: Float
//     isOver18: Boolean

//     hobbies: [String!]!

//     user: User
//   }

//   type User {
//     id: Int
//     name: String
//   }
// `)

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => {
        return obj.name.trim().toLowerCase()
      }
    }
  }
})


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return 'Hello World'
        },
      },

      user: {
        type: User,
        resolve: () => {
          return {
            id: 1,
            name: 'lexi'
          }
        }
      }
    }
  })
})

// The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   // hello: (args) => {
//   //   // fetch from db
//   //   // process
//   //   return "Hello, " + args.name
//   // },
//   hello: ({name}) => {
//     // fetch from db
//     // process
//     return "Hello, " + name
//   },
//   age: () => {
//     return "24"
//   },
//   weight: 77.7,
//   isOver18: true,
//   hobbies: () => {
//     return ["Carting", "F1", "Simulator"]
//   },
//   user: () => {
//     return {
//       id: 1,
//       name: 'lexi'

//     }
//   }
// }

// Run the GraphQL query '{ hello }' and print out the response

const app = express()

app.all('/graphql', createHandler({ schema }))

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})


app.listen(4000)
console.log(`
Api running on: http://localhost:4000
Test: http://localhost:4000/graphql?query={hello,age}
`)
