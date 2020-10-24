import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'
import TaskListTable from './components/TaskListTable'
import { AuthProvider } from './hooks/useAuth'
import { TasksProvider } from './hooks/useTasks'

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container" style={{ marginTop: 20 }}>
            {/* <TableListProvider> */}
            <TasksProvider>
              <Switch>
                <Route path="/" exact component={TaskListTable} />
                <Route path="/login" exact component={LoginForm} />
                <Route path="/form" exact component={TaskForm} />
                <Route path="/form/:id" exact component={TaskForm} />
              </Switch>
            </TasksProvider>
            {/* </TableListProvider> */}
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
