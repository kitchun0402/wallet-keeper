import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../testUtils'
import AddNewWalletButton from '../AddNewWalletButton'

describe('AddNewWalletButton', () => {
  it('should render the button without errors', () => {
    render(<AddNewWalletButton />)
    const button = screen.getByText('Add new wallet')
    expect(button).toBeInTheDocument()
  })

  it('should open the modal after clicking the addNewWalletButton', () => {
    render(<AddNewWalletButton />)
    const button = screen.getByText('Add new wallet')
    userEvent.click(button)
    const modalLabelText = screen.getByText('Enter your password')
    expect(modalLabelText).toBeInTheDocument()
  })
  it('should close the modal after clicking the close button', () => {
    render(<AddNewWalletButton />)
    const button = screen.getByText('Add new wallet')
    userEvent.click(button)
    const cancelButton = screen.getByText('Cancel')
    userEvent.click(cancelButton)
    const modalLabelText = screen.queryByText('Enter your password')
    expect(modalLabelText).not.toBeInTheDocument()
  })
})
