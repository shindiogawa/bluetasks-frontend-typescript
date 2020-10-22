import React from 'react'

import { Container } from './styles'

const Spinner: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Carregando...</span>
      </div>
    </Container>
  )
}

export default Spinner
