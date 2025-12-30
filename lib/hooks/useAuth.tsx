'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User, AuthState } from '@/types'

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const userJson = localStorage.getItem('user')
        if (userJson) {
          const user = JSON.parse(userJson)
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, _password: string) => {
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem('user', JSON.stringify(mockUser))
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (
    email: string,
    username: string,
    _password: string
  ) => {
    try {
      // Mock register - replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        username,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem('user', JSON.stringify(mockUser))
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const logout = async () => {
    localStorage.removeItem('user')
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

