import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTasks } from '../../../hooks/useTasks'

import { Container } from './styles'

export interface ITableBodyProps {
  tasks: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }[]
}

const TableBody: React.FC<ITableBodyProps> = ({ tasks }) => {
  const tasksService = useTasks()
  const [editId, setEditId] = useState(0)
  const onDeleteHandler = (taskToDelete: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }): void => {
    if (window.confirm('Deseja mesmo excluir esta tarefa?')) {
      tasksService.remove(taskToDelete)
    }
  }
  const onEditHandler = (taskId: number): void => {
    setEditId(taskId)
  }

  const onStatusChangeHandler = (taskToUpdate: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }): void => {
    taskToUpdate.done = !taskToUpdate.done
    tasksService.save(taskToUpdate, true)
  }

  useEffect(() => {
    if (tasksService.taskRemoved !== undefined) {
      toast.success(`Tarefa ${tasksService.taskRemoved.id} excluída!`, {
        position: toast.POSITION.BOTTOM_LEFT
      })
      tasksService.clearTaskUpdated()
    }
    if (tasksService.taskUpdated !== undefined) {
      toast.success(
        `Tarefa ${tasksService.taskUpdated.id} foi marcada como ${
          !tasksService.taskUpdated.done ? 'não' : ''
        } concluída !`,
        {
          position: toast.POSITION.BOTTOM_LEFT
        }
      )
      tasksService.clearTaskRemoved()
    }
  }, [tasksService.taskRemoved, tasksService.taskUpdated, tasksService])

  if (editId > 0) {
    return <Redirect to={`/form/${editId}`} />
  }

  return (
    <Container>
      {tasks.map(item => (
        <tr key={item.id}>
          <td>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => onStatusChangeHandler(item)}
            />
          </td>

          <td>{item.done ? <s>{item.description}</s> : item.description}</td>
          <td>{item.done ? <s>{item.whenToDo}</s> : item.whenToDo}</td>
          <td>
            <input
              type="button"
              className="btn btn-primary"
              value="Editar"
              onClick={() => onEditHandler(item.id)}
            />
            &nbsp;
            <input
              type="button"
              className="btn btn-danger"
              value="Excluir"
              onClick={() => onDeleteHandler(item)}
            />
          </td>
        </tr>
      ))}
    </Container>
  )
}

export default TableBody
