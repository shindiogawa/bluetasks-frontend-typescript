import React from 'react'
import { Link } from 'react-router-dom'

import { Container } from './styles'

export interface INavBarItemProps {
  item: {
    name: string
    href: string
    active: boolean
    onClick(clickedItem: INavBarItemProps): void
  }
}

const NavBarItem: React.FC<INavBarItemProps> = ({ item }) => {
  return (
    <Container>
      <Link
        className={`nav-item nav-link ${item.active ? 'active' : ''}`}
        to={item.href}
        onClick={() => item.onClick({ item })}
      >
        {item.name}
      </Link>
    </Container>
  )
}

export default NavBarItem
