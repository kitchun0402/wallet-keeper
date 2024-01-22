import React from 'react'

type Context = {
  currentOption: string
  updateCurrentOption: (option: string) => void
  toggleMenu: () => void
  isMenuOpen: boolean
}
const initialContext = {
  currentOption: '',
  updateCurrentOption: (option: string) => {
    //
  },
  toggleMenu: () => {},
  isMenuOpen: false,
}

const DropdownMenuContext = React.createContext(initialContext)

export const useDropdownMenuContext = () =>
  React.useContext(DropdownMenuContext)

type Props = {
  children: React.ReactNode
  value: Context
}

function DropdownMenuContextProvider({ children, value }: Props) {
  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

export default DropdownMenuContextProvider
