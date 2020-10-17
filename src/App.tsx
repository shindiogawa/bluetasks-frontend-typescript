import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'
import TaskListTable from './components/TaskListTable'
import { TableListProvider } from './hooks/list'

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="container" style={{ marginTop: 20 }}>
          <TableListProvider>
            <Switch>
              <Route path="/" exact component={TaskListTable} />
              <Route path="/form" exact component={TaskForm} />
              <Route path="/form/:id" exact component={TaskForm} />
            </Switch>
          </TableListProvider>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
