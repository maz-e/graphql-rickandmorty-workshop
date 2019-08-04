import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

function CharactersQuery() {
    return <Query query={
        gql`{
            characters {
                results {
                    id
                    name
                    status
                    image
                }
            }
        }`
    }>
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error!</p>

            const {characters: { results } } = data
            debugger
            return results.map(character => {
                return <p>{character.name}</p>
            })
        }}
    </Query>
}

export default CharactersQuery