import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import Alert from '../Alert'

import { Container } from './styles'

const LoginForm: React.FC = () => {
  const auth = useAuth()
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    auth.login(loginForm.username, loginForm.password)
  }

  if (auth.isAuthenticated()) {
    return <Redirect to="/" />
  }

  return (
    <Container>
      <h1>Login</h1>
      {auth.error !== '' ? <Alert message={auth.error} /> : ''}
      <form onSubmit={event => handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            className="form-control"
            onChange={event =>
              setLoginForm({ ...loginForm, username: event.target.value })
            }
            value={loginForm.username}
            placeholder="Digite o usuário"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="form-control"
            onChange={event =>
              setLoginForm({ ...loginForm, password: event.target.value })
            }
            value={loginForm.password}
            placeholder="Digite a senha"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={auth.processing}
        >
          Login
        </button>
      </form>
    </Container>
  )
}

export default LoginForm
