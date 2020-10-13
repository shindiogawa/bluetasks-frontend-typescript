import React, { useEffect, useState } from 'react'

import { Container } from './styles'
import TableBody, { ITableBodyProps } from './TableBody'
import TableHeader from './TableHeader'
import { useTableBody } from '../../hooks/useTableBody'
const TaskListTable: React.FC = () => {
  const tasks = useTableBody()
  return (
    <Container>
      <table className="table table-striped">
        <TableHeader />
        <TableBody tasks={tasks} />
      </table>
    </Container>
  )
}

export default TaskListTable
