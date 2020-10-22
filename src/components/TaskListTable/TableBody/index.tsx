import React, { useCallback, useEffect, useMemo } from 'react'

import { Container } from './styles'

export interface ITableBodyProps {
  tasks: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }[]
  // remove(id: number): void
  // updateStatus(task: {
  //   id: number
  //   description: string
  //   whenToDo: string
  //   done: boolean
  // }): void
  // saveTask(task: {
  //   id: number
  //   description: string
  //   whenToDo: string
  //   done: boolean
  // }): void
  // editTask(id: number): void
}

const TableBody: React.FC<ITableBodyProps> = ({
  tasks
  // remove,
  // updateStatus,
  // editTask
}) => {
  console.log(tasks)
  return (
    <Container>
      {tasks.map(item => (
        <tr key={item.id}>
          <td>
            <input type="checkbox" checked={item.done} onChange={() => false} />
          </td>

          <td>{item.done ? <s>{item.description}</s> : item.description}</td>
          <td>{item.done ? <s>{item.whenToDo}</s> : item.whenToDo}</td>
          <td>
            <input
              type="button"
              className="btn btn-primary"
              value="Editar"
              onClick={() => false}
            />
            &nbsp;
            <input
              type="button"
              className="btn btn-danger"
              value="Excluir"
              onClick={() => false}
            />
          </td>
        </tr>
      ))}
    </Container>
  )
}

export default TableBody
