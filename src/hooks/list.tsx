import React, { createContext, useState, useContext } from 'react'
import { ITableBodyProps } from '../components/TaskListTable/TableBody'

import { toast } from 'react-toastify'

interface IListTableContext {
  tasks: ITableBodyProps['tasks']
  editId: number
  removeTask(id: number): void
  updateTaskStatus(task: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }): void
  saveTask(task: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }): void
  editTask(id: number): void
  loadTask(id: number): ITableBodyProps['tasks'][0]
}

const ListTableContext = createContext<IListTableContext>(
  {} as IListTableContext
)

const TableListProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<ITableBodyProps['tasks']>([
    {
      id: 1,
      description: 'Tarefa 1',
      whenToDo: '2030-01-01',
      done: false
    },
    {
      id: 2,
      description: 'Tarefa 2',
      whenToDo: '2030-01-02',
      done: false
    },
    {
      id: 3,
      description: 'Tarefa 3',
      whenToDo: '2030-01-03',
      done: false
    },
    {
      id: 4,
      description: 'Tarefa 4',
      whenToDo: '2030-01-04',
      done: true
    }
  ])

  const [editId, setEditId] = useState<number>(0)

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
  const updateTaskStatus = (task: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }) => {
    task.done = !task.done
    setTasks(tasks.map(t => (task.id !== t.id ? t : task)))
  }

  const editTask = (id: number): void => {
    setEditId(id)
  }

  const loadTask = (id: number): ITableBodyProps['tasks'][0] => {
    return tasks.filter(t => t.id === id)[0]
  }
  const saveTask = (task: {
    id: number
    description: string
    whenToDo: string
    done: boolean
  }): void => {
    if (task.id !== 0) {
      setTasks(tasks.map(t => (task.id !== t.id ? t : task)))
    } else {
      const taskId = Math.max(...tasks.map(task => task.id)) + 1
      task.id = taskId
      tasks.push(task)
      setTasks(tasks)
    }

    console.log(tasks)
  }
  return (
    <ListTableContext.Provider
      value={{
        tasks,
        editId,
        removeTask,
        updateTaskStatus,
        saveTask,
        editTask,
        loadTask
      }}
    >
      {children}
    </ListTableContext.Provider>
  )
}

function useList(): IListTableContext {
  const context = useContext(ListTableContext)

  return context
}

export { TableListProvider, useList }
