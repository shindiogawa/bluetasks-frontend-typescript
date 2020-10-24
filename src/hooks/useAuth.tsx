import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AUTH_ENDPOINT, CREDENTIALS_NAME } from '../constants/constants'

interface IAuthContext {
  login(username: string, password: string): void
  logout(): void
  isAuthenticated(): boolean
  credentials: {
    username: string
    displayName: string
    token: string
  }
  error: string
  processing: boolean
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    displayName: '',
    token: ''
  })

  const [error, setError] = useState<string>('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadCredentials()
  }, [])

  const login = async (username: string, password: string) => {
    const loginInfo = { username: username, password: password }
    setProcessing(true)
    try {
      const response = await axios.post(`${AUTH_ENDPOINT}/login`, loginInfo)
      const token = response.headers.authorization.replace('Bearer ', '')
      storeCredentials(token)
      setProcessing(false)
    } catch (error) {
      console.error(error)
      setError('O login não pode ser realizado')
      setProcessing(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem(CREDENTIALS_NAME)
    setCredentials({
      username: '',
      displayName: '',
      token: ''
    })
  }

  const storeCredentials = (token: string) => {
    const tokenData = JSON.parse(atob(token.split('.')[1]))
    const credentials = {
      username: tokenData.sub,
      displayName: tokenData.displayName,
      token: token
    }
    console.log(credentials)
    sessionStorage.setItem(CREDENTIALS_NAME, JSON.stringify(credentials))
    setCredentials(credentials)
  }

  const loadCredentials = () => {
    const storeCredentials = sessionStorage.getItem(CREDENTIALS_NAME)

    if (storeCredentials !== null) {
      setCredentials(JSON.parse(storeCredentials))
    }
  }

  const isAuthenticated = () => {
    return sessionStorage.getItem(CREDENTIALS_NAME) !== null
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        credentials,
        error,
        processing
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
