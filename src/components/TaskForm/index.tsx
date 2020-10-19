import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useList } from '../../hooks/list'
import { useTableBody } from '../../hooks/useTableBody'
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
  const { saveTask, loadTask, editTask } = useList()
  const [formTask, setFormTask] = useState({
    id: 0,
    description: '',
    whenToDo: '',
    done: false
  })
  const [redirect, setRedirect] = useState(false)
  const [buttonName, setButtonName] = useState('Cadastrar')
  const { id } = match.params

  useEffect(() => {
    if (id) {
      setFormTask(loadTask(~~id))
      editTask(0)
      setButtonName('Alterar')
    }
  }, [editTask, id, loadTask])

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    saveTask(formTask)
    setRedirect(true)
  }

  const onInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const field = event.target.name
    const value = event.target.value

    setFormTask({ ...formTask, [field]: value })
    console.log(formTask)
  }
  if (redirect) {
    return <Redirect to="/" />
  }
  return (
    <Container>
      <h1>Cadastro da Tarefa</h1>
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
        <button type="submit" className="btn btn-primary">
          {buttonName}
        </button>
        &nbsp;&nbsp;
        <button type="button" className="btn btn-danger">
          Cancelar
        </button>
      </form>
    </Container>
  )
}

export default TaskForm
