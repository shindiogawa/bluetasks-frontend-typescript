import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
      </div>
    </BrowserRouter>
  )
}

export default App
