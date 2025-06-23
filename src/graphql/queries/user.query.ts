// src/graphql/queries/user.query.ts
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { graphqlClient } from '../client'

const GET_USERS = gql`
  query GetUser {
    user {
      id
      name
      email
    }
  }
`

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => graphqlClient.request(GET_USERS),
  })
}
