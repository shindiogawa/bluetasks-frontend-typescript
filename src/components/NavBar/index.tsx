import React from 'react'
import { APP_NAME } from '../../constants/constants'
import { useNavBarItems } from '../../hooks/useNavBarItems'
import NavBarItem from './NavBarItem'
import { v4 } from 'uuid'
import { Container } from './styles'

const NavBar: React.FC = () => {
  const navBarItems = useNavBarItems()
  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">{APP_NAME}</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <div className="navbar-nav mr-auto">
            {navBarItems.items.map(item => (
              <NavBarItem key={v4()} item={item} />
            ))}
          </div>
          <span className="navbar-text">{navBarItems.helloMessage}</span>
        </div>
      </nav>
    </Container>
  )
}

export default NavBar
