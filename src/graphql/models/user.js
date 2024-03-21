export const typeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    user: User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
  }

  input NewUserInput {
    name: String!
    age: Int!
  }

  type User {
    id: ID!
    name: String
    email: String
  }
  `;

export const resolvers = {
  Query: {
    users: (obj, args, { mongo }) => {
      return mongo.users.find().toArray()
    },

    user: () => {
      return {
        id: 1,
        name: 'lexi'
      }
    }
  },

  Mutation: {
    createUser: async (_, { user }, {mongo}) => {
      const movies = await mongo.movies
      .find().
      toArray()
      console.log(movies)
      // insert into database
      return {
        id: 1,
        ...user
      }
    }
  },

  User: {
    id: (obj) => {
      return obj._id || obj.id
    },
    name: (obj) => {
      return obj.name.toUpperCase()
    }
  }
}
