import { GraphQLClient } from 'graphql-request'

function getAccessToken() {
  const userData = localStorage.getItem('tanstack.auth.user')
  try {
    const parsed = JSON.parse(userData || '{}')
    return parsed.accessToken || ''
  } catch (err) {
    console.error('Error parsing user token from localStorage:', err)
    return ''
  }
}

export const graphqlClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_ENDPOINT!,
  {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }
)
