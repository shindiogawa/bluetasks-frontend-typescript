import React from 'react'

import { Container } from './styles'

interface ITableBodyProps {
  tasks: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }[]
}

const TableBody: React.FC<ITableBodyProps> = ({ tasks }) => {
  return (
    <Container>
      {tasks.map(item => (
        <tr key={item.id}>
          <td>
            <input type="checkbox" checked={item.done} />
          </td>
          <td>{item.description}</td>
          <td>{item.whenToDo}</td>
          <td>
            <input type="button" className="btn btn-primary" value="Editar" />
            &nbsp;
            <input type="button" className="btn btn-danger" value="Excluir" />
          </td>
        </tr>
      ))}
    </Container>
  )
}

export default TableBody
