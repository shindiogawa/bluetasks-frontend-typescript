import axios from 'axios'
import React, { useState } from 'react'
import { ITableBodyProps } from '../components/TaskListTable/TableBody'
import { API_ENDPOINT } from '../constants/constants'
import { useAuth } from './useAuth'

export const useTasks = () => {
  const auth = useAuth()
  const [taskList, setTaskList] = useState([])
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
      console.log(taskList)
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

  return {
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
  }
}
