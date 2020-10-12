import { useState, useEffect } from 'react'
import { INavBarItemProps } from '../components/NavBar/NavBarItem'

export const useNavBarItems = () => {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const activate = (clickedItem: any) => {
      if (!clickedItem.active) {
        setItems(
          items.map(item =>
            item.name === clickedItem.name
              ? { ...item, active: true }
              : { ...item, active: false }
          )
        )
      }
    }

    const items = [
      { name: 'Listar Tarefas', href: '/', active: true, onClick: activate },
      { name: 'Nova Tarefa', href: '/form', active: false, onClick: activate }
    ]

    setItems(items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { items }
}
