import { useState, useEffect } from 'react'
import { INavBarItemProps } from '../components/NavBar/NavBarItem'
import { useAuth } from './useAuth'

export const useNavBarItems = (): {
  items: INavBarItemProps['item'][]
  helloMessage: string
} => {
  const auth = useAuth()
  const [items, setItems] = useState<INavBarItemProps['item'][]>([
    {}
  ] as INavBarItemProps['item'][])

  const [helloMessage, setHelloMessage] = useState<string>('')

  useEffect(() => {
    const activate = (clickedItem: INavBarItemProps) => {
      if (!clickedItem.item.active) {
        setItems(
          items.map(item =>
            item.name === clickedItem.item.name
              ? { ...item, active: true }
              : { ...item, active: false }
          )
        )
      }
    }

    const items: INavBarItemProps['item'][] = [
      { name: 'Listar Tarefas', href: '/', active: true, onClick: activate },
      { name: 'Nova Tarefa', href: '/form', active: false, onClick: activate }
    ]

    if (auth.isAuthenticated()) {
      items.push({
        name: 'Logout',
        active: false,
        href: '#',
        onClick: () => {
          auth.logout()
          setHelloMessage('')
        }
      })
      setHelloMessage(`Olá, ${auth.credentials.displayName}!`)
    }

    setItems(items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.credentials])

  return { items, helloMessage }
}
