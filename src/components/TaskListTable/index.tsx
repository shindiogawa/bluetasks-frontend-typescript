import React, { useEffect, useState } from 'react'

import { Container } from './styles'
import TableBody, { ITableBodyProps } from './TableBody'
import TableHeader from './TableHeader'
import { useTableBody } from '../../hooks/useTableBody'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EmptyTableBody from './EmptyTableBody'
const TaskListTable: React.FC = () => {
  // const tasks = useTableBody()
  const removeTask = (id: number): void => {
    if (window.confirm('Deseja mesmo remover essa tarefa?')) {
      const tasks2: ITableBodyProps['tasks'] = tasks.filter(
        task => id !== task.id
      )
      setTasks(tasks2)
      toast.success('Tarefa excluída!', {
        position: toast.POSITION.BOTTOM_LEFT
      })
    }
  }

  const [tasks, setTasks] = useState<ITableBodyProps['tasks']>([
    {
      id: 1,
      description: 'Tarefa 1',
      whenToDo: '01/01/2030',
      done: false
    },
    {
      id: 2,
      description: 'Tarefa 2',
      whenToDo: '02/01/2030',
      done: false
    },
    {
      id: 3,
      description: 'Tarefa 3',
      whenToDo: '03/01/2030',
      done: false
    },
    {
      id: 4,
      description: 'Tarefa 4',
      whenToDo: '04/01/2030',
      done: true
    }
  ])

  return (
    <Container>
      <table className="table table-striped">
        <TableHeader />
        {tasks.length > 0 ? (
          <TableBody tasks={tasks} remove={removeTask} />
        ) : (
          <EmptyTableBody />
        )}
      </table>
      <ToastContainer autoClose={1500} />
    </Container>
  )
}

export default TaskListTable
