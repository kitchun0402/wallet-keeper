import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../testUtils'
import PasswordModal from '../PasswordModal'

describe('PasswordModal', () => {
  it('should render the modal', () => {
    render(
      <PasswordModal
        passwordInput="password input"
        onPasswordInputChange={() => {}}
        onClickConfirmButton={() => {}}
        onCloseModal={() => {}}
        open={true}
        title="mock title"
      />,
    )
    const passwordInput = screen.getByTestId('password-input')
    expect(passwordInput).toHaveAttribute('value', 'password input')
    const modalTitle = screen.getByText('mock title')
    expect(modalTitle).toBeInTheDocument()
  })

  it('should call the corresponding event handlers', () => {
    const mockOnClickConfirmButton = jest.fn()
    const mockOnCloseModal = jest.fn()
    const mockOnPasswordInputChange = jest.fn()
    render(
      <PasswordModal
        passwordInput=""
        onPasswordInputChange={mockOnPasswordInputChange}
        onClickConfirmButton={mockOnClickConfirmButton}
        onCloseModal={mockOnCloseModal}
        open={true}
        title="mock title"
      />,
    )
    const confirmButton = screen.getByText('Confirm')
    userEvent.click(confirmButton)
    expect(mockOnClickConfirmButton).toHaveBeenCalledTimes(1)
    const cancelButton = screen.getByText('Cancel')
    userEvent.click(cancelButton)
    expect(mockOnCloseModal).toHaveBeenCalledTimes(1)
    const passwordInput = screen.getByTestId('password-input')
    userEvent.type(passwordInput, 'password')
    expect(mockOnPasswordInputChange).toHaveBeenCalledTimes(8)
  })
})
