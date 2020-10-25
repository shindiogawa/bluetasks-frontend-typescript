import axios, { AxiosError } from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { ITableBodyProps } from '../components/TaskListTable/TableBody'
import { API_ENDPOINT } from '../constants/constants'
import { useAuth } from './useAuth'

interface ITasksContext {
  taskList: ITableBodyProps['tasks']
  error: string | undefined
  processing: boolean
  remove(taskToRemove: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }): void
  save(
    taskToSave: {
      id: number
      description: string
      whenToDo: string
      done: boolean
    },
    onlyStatus: boolean
  ): void
  taskRemoved:
    | {
        id: number
        description: string
        whenToDo: string
        done: boolean
      }
    | undefined
  taskUpdated:
    | {
        id: number
        description: string
        whenToDo: string
        done: boolean
      }
    | undefined
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
  const [error, setError] = useState<string | undefined>()
  const [processing, setProcessing] = useState(false)
  const [taskRemoved, setTaskRemoved] = useState<{
    id: number
    description: string
    whenToDo: string
    done: boolean
  }>()
  const [taskUpdated, setTaskUpdated] = useState<{
    id: number
    description: string
    whenToDo: string
    done: boolean
  }>()
  const [taskLoaded, setTaskLoaded] = useState('')

  const list = async () => {
    try {
      setProcessing(true)
      setError(undefined)
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
      handleError(error)
    }
  }

  const remove = async (taskToRemove: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }) => {
    try {
      await axios.delete(
        `${API_ENDPOINT}/tasks/${taskToRemove.id}`,
        buildAuthHeader()
      )
      setTaskList(taskList.filter(task => taskToRemove.id !== task.id))
      setTaskRemoved(taskToRemove)
    } catch (error) {
      handleError(error)
    }
  }

  const save = async (
    taskToSave: {
      id: number
      description: string
      whenToDo: string
      done: boolean
    },
    onlyStatus = false
  ) => {
    try {
      setProcessing(!onlyStatus)
      setTaskUpdated(undefined)
      setError(undefined)

      if (taskToSave.id === 0) {
        await axios.post(`${API_ENDPOINT}/tasks`, taskToSave, buildAuthHeader())
      } else {
        await axios.put(
          `${API_ENDPOINT}/tasks/${taskToSave.id}`,
          taskToSave,
          buildAuthHeader()
        )
      }

      setProcessing(false)
      setTaskUpdated(taskToSave)
    } catch (error) {
      handleError(error)
    }
  }

  // const load = async id => {
  //   try {
  //     setProcessing(true)
  //     setError({} as AxiosError)
  //     setTaskLoaded(null)
  //     const response = await axios.get(
  //       `${API_ENDPOINT}/tasks/${id}`,
  //       buildAuthHeader()
  //     )
  //     setTaskLoaded(response.data)
  //     setProcessing(false)
  //   } catch (error) {
  //     handleError(error)
  //   }
  // }

  const clearTaskRemoved = () => {
    setTaskRemoved(undefined)
  }

  const clearTaskUpdated = () => {
    setTaskUpdated(undefined)
  }

  const clearTaskLoaded = () => {
    setTaskLoaded('')
  }

  const handleError = (error: AxiosError) => {
    console.log(error)
    const resp = error.response

    if (resp && resp.status === 400 && resp.data) {
      setError(resp.data.error)
    } else {
      setError(error.message)
    }

    setProcessing(false)
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
        remove,
        save,
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
