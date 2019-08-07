import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

function CharactersQuery() {
    return <Query query={
        gql`{
            characters {
                id
                name
                status
                image
            }
        }`
    }>
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error!</p>

            const { characters } = data
            return characters.map(character => {
                return <li key={character.id}>
                    <p>{character.name}</p>
                </li>
            })
        }}
    </Query>
}

export default CharactersQuery