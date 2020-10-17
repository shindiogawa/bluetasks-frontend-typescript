import React, { useEffect, useState } from 'react'

import { Container } from './styles'
import TableBody, { ITableBodyProps } from './TableBody'
import TableHeader from './TableHeader'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EmptyTableBody from './EmptyTableBody'
import { useList } from '../../hooks/list'
import { Redirect } from 'react-router-dom'
const TaskListTable: React.FC<ITableBodyProps> = () => {
  const {
    tasks,
    editId,
    removeTask,
    updateTaskStatus,
    saveTask,
    editTask
  } = useList()
  if (editId > 0) {
    return <Redirect to={`/form/${editId}`} />
  }
  return (
    <Container>
      <table className="table table-striped">
        <TableHeader />
        {tasks.length > 0 ? (
          <TableBody
            tasks={tasks}
            remove={removeTask}
            updateStatus={updateTaskStatus}
            saveTask={saveTask}
            editTask={editTask}
          />
        ) : (
          <EmptyTableBody />
        )}
      </table>
      <ToastContainer autoClose={1500} />
    </Container>
  )
}

export default TaskListTable
