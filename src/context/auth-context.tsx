/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import * as React from 'react'
import { graphqlClient } from '@/graphql/client'
import { SignInUserMutation } from '@/graphql/mutations/auth'

export interface AuthContext {
  isAuthenticated: boolean
  login: (email: string, password: string, redirectTo?: string) => Promise<void>
  logout: () => Promise<void>
  user: any
}

const AuthContext = React.createContext<AuthContext | null>(null)

const key = 'tanstack.auth.user'

function getStoredUser() {
  return localStorage.getItem(key)
}

function setStoredUser(user: any) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user))
  } else {
    localStorage.removeItem(key)
  }
}

interface SignInUserResponse {
  signIn: {
    id: string
    name: string
    accessToken: string
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(getStoredUser())
  const isAuthenticated = !!user

  const logout = React.useCallback(async () => {
    setStoredUser(null)
    setUser(null)
    window.location.href = '/login'
  }, [])

  const login = React.useCallback(
    async (email: string, password: string, redirectTo?: string) => {
      try {
        const variables = { input: { email, password } } // adjust if needed

        // GraphQL request, no hooks used here
        const data: SignInUserResponse = await graphqlClient.request(
          SignInUserMutation,
          variables
        )
        if (data?.signIn?.name) {
          setStoredUser(data.signIn)
          setUser(data.signIn)

          // Redirect after successful login
          const destination = redirectTo || '/' // default redirect location
          window.location.href = destination
        } else {
          throw new Error('Login failed: Invalid response')
        }
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    []
  )

  React.useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        // If parsing fails, treat as string
        setUser(storedUser)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
