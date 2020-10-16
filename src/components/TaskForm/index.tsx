import React, { useState } from 'react'
import { useList } from '../../hooks/list'
import { useTableBody } from '../../hooks/useTableBody'
import TaskListTable from '../TaskListTable'

import { Container } from './styles'

const TaskForm: React.FC = () => {
  const { saveTask } = useList()
  const [formTask, setFormTask] = useState({
    id: 0,
    description: '',
    whenToDo: '',
    done: false
  })
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    saveTask(formTask)
  }

  const onInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const field = event.target.name
    const value = event.target.value

    setFormTask({ ...formTask, [field]: value })
    console.log(formTask)
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
            onChange={event => onInputChangeHandler(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="whenToDo">Descrição</label>
          <input
            type="date"
            className="form-control"
            name="whenToDo"
            placeholder="Informe a data"
            onChange={event => onInputChangeHandler(event)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
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
