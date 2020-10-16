import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'
import TaskListTable from './components/TaskListTable'

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="container" style={{ marginTop: 20 }}>
          <Switch>
            <Route path="/" exact component={TaskListTable} />
            <Route path="/form" component={TaskForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
