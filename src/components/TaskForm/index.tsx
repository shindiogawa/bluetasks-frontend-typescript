import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useList } from '../../hooks/list'
import { useAuth } from '../../hooks/useAuth'
import { useTableBody } from '../../hooks/useTableBody'
import { useTasks } from '../../hooks/useTasks'
import Alert from '../Alert'
import TaskListTable from '../TaskListTable'

import { Container } from './styles'
interface ITaskFormParams {
  match: {
    params: {
      id: string
    }
  }
}
const TaskForm: React.FC<ITaskFormParams> = ({ match }) => {
  const auth = useAuth()
  const tasks = useTasks()
  const { saveTask, loadTask, editTask } = useList()
  const [formTask, setFormTask] = useState({
    id: 0,
    description: '',
    whenToDo: '',
    done: false
  })
  const [redirect, setRedirect] = useState(false)
  const { id } = match.params

  useEffect(() => {
    if (id && auth.credentials.username !== '') {
      tasks.load(~~id)
    }
  }, [auth.credentials])

  useEffect(() => {
    if (tasks.taskLoaded) {
      setFormTask(tasks.taskLoaded)
      tasks.clearTaskLoaded()
    }
  }, [tasks.taskLoaded])

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    tasks.save(formTask, false)
  }

  const onInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const field = event.target.name
    const value = event.target.value

    setFormTask({ ...formTask, [field]: value })
  }

  if (!auth.isAuthenticated()) {
    return <Redirect to="/login" />
  }

  if (redirect || tasks.taskUpdated) {
    tasks.clearTaskUpdated()
    return <Redirect to="/" />
  }

  return (
    <Container>
      <h1>Cadastro da Tarefa</h1>
      {tasks.error !== undefined ? <Alert message={tasks.error} /> : ''}
      <form onSubmit={event => onSubmitHandler(event)}>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Digite a descrição"
            value={formTask.description}
            onChange={event => onInputChangeHandler(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="whenToDo">Descrição</label>
          <input
            type="date"
            className="form-control"
            name="whenToDo"
            value={formTask.whenToDo}
            placeholder="Informe a data"
            onChange={event => onInputChangeHandler(event)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={tasks.processing}
        >
          {tasks.processing ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : formTask.id === 0 ? (
            'Gravar'
          ) : (
            'Alterar'
          )}
        </button>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-danger"
          disabled={tasks.processing}
          onClick={() => setRedirect(true)}
        >
          Cancelar
        </button>
      </form>
    </Container>
  )
}

export default TaskForm
