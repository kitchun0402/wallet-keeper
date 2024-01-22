import { useState, type ComponentProps } from 'react'
import {
  Container,
  MenuButton,
  MenuOption,
  Options,
} from './DropdownMenu.elements'
import DropdownMenuContextProvider, {
  useDropdownMenuContext,
} from './DropdownMenuContext'

type Props = {
  label: string
  onOptionsChange: (option: string) => void
} & ComponentProps<'div'>

function DropdownMenu({ children, label, onOptionsChange, ...props }: Props) {
  const [currentOption, setCurrentOption] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const updateCurrentOption = (option: string) => {
    setCurrentOption(option)
    onOptionsChange(option)
  }
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <DropdownMenuContextProvider
      value={{
        currentOption,
        isMenuOpen,
        updateCurrentOption,
        toggleMenu,
      }}
    >
      <Container {...props}>
        <MenuButton onClick={toggleMenu}>{label}</MenuButton>
        {isMenuOpen && <Options>{children}</Options>}
      </Container>
    </DropdownMenuContextProvider>
  )
}

export default DropdownMenu

type MenuOptionProps = {
  value: string
} & ComponentProps<'div'>

function Option({ children, value, ...props }: MenuOptionProps) {
  const { updateCurrentOption, toggleMenu } = useDropdownMenuContext()
  const handleClickOption = () => {
    updateCurrentOption(value)
    toggleMenu()
  }
  return (
    <MenuOption {...props} onClick={handleClickOption}>
      {children}
    </MenuOption>
  )
}

DropdownMenu.Option = Option
