import { useEffect, useState } from 'react'
import { ITableBodyProps } from '../components/TaskListTable/TableBody'
import { toast, ToastContainer } from 'react-toastify'
export const useTableBody = (): // initialTasks: ITableBodyProps['tasks']
{
  tasks: ITableBodyProps['tasks']
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
} => {
  // useEffect(() => {
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
    }
    setTasks(tasks)
    console.log(tasks)
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

  return { tasks, removeTask, updateTaskStatus, saveTask }
}
