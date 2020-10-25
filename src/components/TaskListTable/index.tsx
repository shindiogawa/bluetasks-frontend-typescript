import React, { useEffect } from 'react'

import { Container } from './styles'
import TableBody, { ITableBodyProps } from './TableBody'
import TableHeader from './TableHeader'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EmptyTableBody from './EmptyTableBody'
import { useList } from '../../hooks/list'
import { Redirect } from 'react-router-dom'
import { useTasks } from '../../hooks/useTasks'
import { useAuth } from '../../hooks/useAuth'
import Alert from '../Alert'
import Spinner from '../Spinner'
const TaskListTable: React.FC<ITableBodyProps> = () => {
  const tasks = useTasks()
  const auth = useAuth()

  useEffect(() => {
    if (auth.credentials.username !== '') {
      tasks.list()
    }
  }, [auth.credentials])

  if (!auth.isAuthenticated()) {
    return <Redirect to="/login" />
  }

  return (
    <Container>
      {tasks.error === undefined ? '' : <Alert message={tasks.error} />}
      {tasks.processing ? (
        <Spinner />
      ) : (
        <table className="table table-striped">
          <TableHeader />
          {tasks.taskList.length > 0 ? (
            <TableBody
              tasks={tasks.taskList}
              // remove={removeTask}
              // updateStatus={updateTaskStatus}
              // saveTask={saveTask}
              // editTask={editTask}
            />
          ) : (
            <EmptyTableBody />
          )}
        </table>
      )}
      <ToastContainer autoClose={1500} />
    </Container>
  )
}

export default TaskListTable
