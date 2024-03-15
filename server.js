var { graphql, buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    age: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    // fetch from db
    // process
    return "Hello world!"
  },
  age: () => {
    return "24"
  }
}

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ age }",
  rootValue,
}).then(response => {
  console.log(response)
})
