import React, { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import TaskService from '../../../api/TaskService'
import { useTasks } from '../../../hooks/useTasks'

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
  const tasksService = useTasks()

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
              onClick={() => false}
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
