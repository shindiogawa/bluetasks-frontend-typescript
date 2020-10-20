import React from 'react'

import { Container } from './styles'

interface IAlertProps {
  message: string
}
const Alert: React.FC<IAlertProps> = ({ message }) => {
  return (
    <Container className="alert alert-danger" role="alert">
      {message}
    </Container>
  )
}

export default Alert
