import { gql } from 'graphql-request'

export const SignInUserMutation = gql`
  mutation SignInUser($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      accessToken
    }
  }
`
