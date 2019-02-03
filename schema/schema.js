const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

const users = [
  { id: 'a', firstName: 'A', age: 1 },
  { id: 'b', firstName: 'B', age: 2 }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
