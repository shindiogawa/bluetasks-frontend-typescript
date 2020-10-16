import React, { useCallback, useEffect, useMemo } from 'react'

import { Container } from './styles'

export interface ITableBodyProps {
  tasks: {
    id: number
    description: string
    whenToDo: string
    done: boolean
    // remove(id: number): void
  }[]
  remove(id: number): void
}

const TableBody: React.FC<ITableBodyProps> = ({ tasks, remove }) => {
  console.log(tasks)
  return (
    <Container>
      {tasks.map(item => (
        <tr key={item.id}>
          <td>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => {
                console.log('test')
              }}
            />
          </td>
          <td>{item.description}</td>
          <td>{item.whenToDo}</td>
          <td>
            <input type="button" className="btn btn-primary" value="Editar" />
            &nbsp;
            <input
              type="button"
              className="btn btn-danger"
              value="Excluir"
              onClick={() => remove(item.id)}
            />
          </td>
        </tr>
      ))}
    </Container>
  )
}

export default TableBody
