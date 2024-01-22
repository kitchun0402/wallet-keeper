import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../testUtils'
import DropdownMenu from '../DropdownMenu'

const dropdownMenuLabel = 'dropdown menu button'
describe('DropdownMenu', () => {
  it('should render the dropdown menu', () => {
    render(
      <DropdownMenu
        label={dropdownMenuLabel}
        onSelectOption={() => {
          //
        }}
      />,
    )
    const dropdownMenuElement = screen.getByText(dropdownMenuLabel)
    expect(dropdownMenuElement).toBeInTheDocument()
  })

  it('should open the dropdown menu when clicked', () => {
    render(
      <DropdownMenu
        label={dropdownMenuLabel}
        onSelectOption={() => {
          //
        }}
      >
        <DropdownMenu.Option value="mock option">
          mock option
        </DropdownMenu.Option>
      </DropdownMenu>,
    )
    const dropdownMenuElement = screen.getByText(dropdownMenuLabel)
    userEvent.click(dropdownMenuElement)
    const dropdownMenuOptionElement = screen.getByText('mock option')
    expect(dropdownMenuOptionElement).toBeInTheDocument()
  })

  it('should close the dropdown menu when clicking the menu button again', () => {
    render(
      <DropdownMenu
        label={dropdownMenuLabel}
        onSelectOption={() => {
          //
        }}
      >
        <DropdownMenu.Option value="mock option">
          mock option
        </DropdownMenu.Option>
      </DropdownMenu>,
    )

    const dropdownMenuElement = screen.getByText(dropdownMenuLabel)
    userEvent.click(dropdownMenuElement)
    const dropdownMenuOptionElement = screen.getByText('mock option')
    expect(dropdownMenuOptionElement).toBeInTheDocument()
    userEvent.click(dropdownMenuElement)
    expect(screen.queryByText('mock option')).not.toBeInTheDocument()
  })

  it('should call onSelectOption function when an option is selected', () => {
    const mockOnSelectOption = jest.fn()
    render(
      <DropdownMenu
        label={dropdownMenuLabel}
        onSelectOption={mockOnSelectOption}
      >
        <DropdownMenu.Option value="mock option">
          mock option
        </DropdownMenu.Option>
      </DropdownMenu>,
    )

    const dropdownMenuElement = screen.getByText(dropdownMenuLabel)
    userEvent.click(dropdownMenuElement)
    const dropdownMenuOptionElement = screen.getByText('mock option')
    userEvent.click(dropdownMenuOptionElement)
    expect(mockOnSelectOption).toBeCalledWith('mock option')
  })
})
