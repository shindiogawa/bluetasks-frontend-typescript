import React from 'react'

import { Container } from './styles'
const TableHeader: React.FC = () => {
  return (
    <Container className="thead-dark">
      <tr>
        <th scope="col">Status</th>
        <th scope="col">Descrição</th>
        <th scope="col">Data</th>
        <th scope="col">Ações</th>
      </tr>
    </Container>
  )
}

export default TableHeader
