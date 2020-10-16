import { useEffect, useState } from 'react'
import { ITableBodyProps } from '../components/TaskListTable/TableBody'

export const useTableBody = (): ITableBodyProps['tasks'] => {
  const [tasks, setTasks] = useState<ITableBodyProps['tasks']>([
    {}
  ] as ITableBodyProps['tasks'])

  useEffect(() => {
    const removeTask = (id: number): void => {
      const tasks2: ITableBodyProps['tasks'] = tasks.filter(
        task => id !== task.id
      )
      console.log(tasks2)
      setTasks(tasks2)
    }
    const tasks: ITableBodyProps['tasks'] = [
      {
        id: 1,
        description: 'Tarefa 1',
        whenToDo: '01/01/2030',
        done: false
        // remove: removeTask
      },
      {
        id: 2,
        description: 'Tarefa 2',
        whenToDo: '02/01/2030',
        done: false
        // remove: removeTask
      },
      {
        id: 3,
        description: 'Tarefa 3',
        whenToDo: '03/01/2030',
        done: false
        // remove: removeTask
      },
      {
        id: 4,
        description: 'Tarefa 4',
        whenToDo: '04/01/2030',
        done: true
        // remove: removeTask
      }
    ]

    setTasks(tasks)
  }, [])

  return tasks
}
