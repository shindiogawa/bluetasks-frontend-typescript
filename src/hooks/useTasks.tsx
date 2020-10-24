import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { ITableBodyProps } from '../components/TaskListTable/TableBody'
import { API_ENDPOINT } from '../constants/constants'
import { useAuth } from './useAuth'

interface ITasksContext {
  taskList: ITableBodyProps['tasks']
  error: string
  processing: boolean
  taskRemoved: string
  taskUpdated: string
  taskLoaded: string
  list(): void
  clearTaskRemoved(): void
  clearTaskUpdated(): void
  clearTaskLoaded(): void
}

const TaskContext = createContext<ITasksContext>({} as ITasksContext)

const TasksProvider: React.FC = ({ children }) => {
  const auth = useAuth()
  const [taskList, setTaskList] = useState<ITableBodyProps['tasks']>([])
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [taskRemoved, setTaskRemoved] = useState('')
  const [taskUpdated, setTaskUpdated] = useState('')
  const [taskLoaded, setTaskLoaded] = useState('')

  const list = async () => {
    try {
      setProcessing(true)
      setError('')
      const response = await axios.get(
        `${API_ENDPOINT}/tasks?sort=whenToDo,asc`,
        buildAuthHeader()
      )
      const content = response.data.content

      if (
        content.length === 1 &&
        content[0].value &&
        content[0].value.length === 0
      ) {
        setTaskList([])
      } else {
        setTaskList(content)
      }
      setProcessing(false)
    } catch (error) {
      setError(error)
    }
  }

  const clearTaskRemoved = () => {
    setTaskRemoved('')
  }

  const clearTaskUpdated = () => {
    setTaskUpdated('')
  }

  const clearTaskLoaded = () => {
    setTaskLoaded('')
  }

  const buildAuthHeader = () => {
    return {
      headers: {
        Authorization: `Bearer ${auth.credentials.token}`
      }
    }
  }

  return (
    <TaskContext.Provider
      value={{
        taskList,
        error,
        processing,
        taskRemoved,
        taskUpdated,
        taskLoaded,
        list,
        clearTaskRemoved,
        clearTaskUpdated,
        clearTaskLoaded
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

function useTasks(): ITasksContext {
  const context = useContext(TaskContext)

  return context
}

export { TasksProvider, useTasks }
