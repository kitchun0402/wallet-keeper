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
  onSelectOption: (option: string) => void
} & ComponentProps<'div'>

function DropdownMenu({ children, label, onSelectOption, ...props }: Props) {
  const [currentOption, setCurrentOption] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const updateCurrentOption = (option: string) => {
    setCurrentOption(option)
    onSelectOption(option)
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
      <Container>
        <MenuButton onClick={toggleMenu} {...props}>
          {label}
        </MenuButton>
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
