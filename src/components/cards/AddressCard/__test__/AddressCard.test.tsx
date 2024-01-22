import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../testUtils'
import { getShortenedAddress } from '../../../../utils/getShortenedAddress'
import AddressCard from '../AddressCard'
const mockAddress = '0x1234567890abcdef'
const mockOnShowPrivateKeyClick = jest.fn()
describe('AddressCard', () => {
  it('renders the address correctly', () => {
    render(
      <AddressCard
        address={mockAddress}
        onShowPrivateKeyClick={mockOnShowPrivateKeyClick}
      />,
    )
    const addressElement = screen.getByText(getShortenedAddress(mockAddress))
    expect(addressElement).toBeInTheDocument()
  })

  it('calls the onShowPrivateKeyClick callback when the button is clicked', () => {
    render(
      <AddressCard
        address={mockAddress}
        onShowPrivateKeyClick={mockOnShowPrivateKeyClick}
      />,
    )
    const buttonElement = screen.getByTestId('show-private-key-btn')
    userEvent.click(buttonElement)
    expect(mockOnShowPrivateKeyClick).toHaveBeenCalledTimes(1)
  })

  it('should copy the address when the copy button is clicked', async () => {
    const mockWriteText = jest.fn()

    Object.assign(window.navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    })
    render(
      <AddressCard
        address={mockAddress}
        onShowPrivateKeyClick={mockOnShowPrivateKeyClick}
      />,
    )
    const buttonElement = screen.getByTestId('copy-address-btn')
    userEvent.click(buttonElement)
    expect(mockWriteText).toHaveBeenCalledTimes(1)
    expect(mockWriteText).toBeCalledWith(mockAddress)
  })
})
