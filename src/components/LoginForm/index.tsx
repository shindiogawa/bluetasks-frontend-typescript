import React, { useState } from 'react'

import Alert from '../Alert'

import { Container } from './styles'

const LoginForm: React.FC = () => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  const [alertMessage, setAlertMessage] = useState('')
  const [processingState, setProcessingState] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setAlertMessage('tentativa de login')
  }

  const handleInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const field = event.target.name
    const value = event.target.value

    setLoginForm({ ...loginForm, [field]: value })
  }

  return (
    <Container>
      <h1>Login</h1>
      {alertMessage !== '' ? <Alert message={alertMessage} /> : ''}
      <form onSubmit={event => handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={event => handleInputChanged(event)}
            value={loginForm.username}
            placeholder="Digite o usuário"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={event => handleInputChanged(event)}
            value={loginForm.password}
            placeholder="Digite a senha"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={processingState}
        >
          Login
        </button>
      </form>
    </Container>
  )
}

export default LoginForm
