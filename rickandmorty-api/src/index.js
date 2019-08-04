const fetch = require("node-fetch")
const { ApolloServer, gql } = require("apollo-server")

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  enum CharacterStatus {
    Alive
    Dead
    unknown
  }

  type Character {
    id: ID
    name: String
    status: CharacterStatus
    image: String
    episode: [String]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    character(id: ID!): Character
    characters: [Character]
  }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    characters: () => fetchCharacters(),
    character: (parent, args) => {
      const { id } = args
      return fetchCharacterById(id)
    }
  }
}

const fetchCharacters = () => {
  return fetch("https://rickandmortyapi.com/api/character/")
    .then(res => res.json())
    .then(json => json.results)
}

const fetchCharacterById = (id) => {
  return fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
} 

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers })

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})