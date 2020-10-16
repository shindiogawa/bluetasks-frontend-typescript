import React, { useEffect, useState } from 'react'

import { Container } from './styles'
import TableBody, { ITableBodyProps } from './TableBody'
import TableHeader from './TableHeader'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EmptyTableBody from './EmptyTableBody'
import { useList } from '../../hooks/list'
const TaskListTable: React.FC<ITableBodyProps> = () => {
  const { tasks, removeTask, updateTaskStatus, saveTask } = useList()
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
