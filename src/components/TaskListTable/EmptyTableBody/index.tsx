import React from 'react'

import { Container } from './styles'

const EmptyTableBody: React.FC = () => {
  return (
    <Container>
      <tr>
        <td colSpan={4}>Sem tarefas cadastradas no momento!</td>
      </tr>
    </Container>
  )
}

export default EmptyTableBody
