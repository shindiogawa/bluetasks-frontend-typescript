import React from 'react'

import { Container } from './styles'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TaskService from '../../api/TaskService'
const TaskListTable: React.FC = () => {
  return (
    <Container>
      <table className="table table-striped">
        <TableHeader />
        <TableBody tasks={TaskService} />
      </table>
    </Container>
  )
}

export default TaskListTable
