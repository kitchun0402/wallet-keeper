import userEvent from '@testing-library/user-event'
import { useAppSelector } from '../../../../hooks/redux'
import { encryptPrivateKey } from '../../../../lib/privateKey'
import { act, render, screen } from '../../../../testUtils'
import { NetworkId } from '../../../../types/network'
import { getShortenedAddress } from '../../../../utils/getShortenedAddress'
import WalletCard from '../WalletCard'

jest.mock('../../../../hooks/redux', () => ({
  ...jest.requireActual('../../../../hooks/redux'),
  useAppSelector: jest.fn(),
}))

const walletData = {
  address: '0x1234567890123456789012345678901234567890',
  balance: '100',
  privateKey: 'this is my private key',
  password: '123456',
}

describe('WalletCard', () => {
  beforeEach(() => {
    const mockUseSelector = useAppSelector as unknown as jest.Mock
    mockUseSelector.mockImplementation((callback) => {
      return callback({
        user: {
          wallets: [
            {
              address: walletData.address,
              encryptedPrivateKey: encryptPrivateKey(
                walletData.privateKey,
                walletData.password,
              ),
            },
          ],
        },
        network: {
          currentNetworkId: NetworkId.AVALANCHE_FUJI,
        },
      })
    })
  })

  it('should render the wallet card with the provided data', () => {
    render(
      <WalletCard address={walletData.address} balance={walletData.balance} />,
    )

    const walletAddress = screen.getByText(
      getShortenedAddress(walletData.address),
    )
    const walletBalance = screen.getByText(
      `Balance: ${walletData.balance} AVAX`,
    )

    expect(walletAddress).toBeInTheDocument()
    expect(walletBalance).toBeInTheDocument()
  })

  it('should show the modal when the showPrivateKeyBtn is clicked', () => {
    render(
      <WalletCard address={walletData.address} balance={walletData.balance} />,
    )

    const showPrivateKeyBtn = screen.getByTestId('show-private-key-btn')
    act(() => {
      userEvent.click(showPrivateKeyBtn)
    })
    const modalTitle = screen.getByText('Show private key')
    expect(modalTitle).toBeInTheDocument()
    const walletAddress = screen.getByTestId('password-modal-address-card')
    expect(walletAddress).toBeInTheDocument()
  })
  it("should show the private key when the user enters the correct password and clicks the 'Confirm' button", () => {
    render(
      <WalletCard address={walletData.address} balance={walletData.balance} />,
    )

    const showPrivateKeyBtn = screen.getByTestId('show-private-key-btn')
    act(() => {
      userEvent.click(showPrivateKeyBtn)
    })
    const passwordInput = screen.getByTestId('password-input')
    const confirmBtn = screen.getByText('Confirm')
    act(() => {
      userEvent.type(passwordInput, walletData.password)
      userEvent.click(confirmBtn)
    })
    const privateKey = screen.getByText(walletData.privateKey)
    expect(privateKey).toBeInTheDocument()
  })

  it("should show an error message when the user enters the wrong password and clicks the 'Confirm' button", () => {
    render(
      <WalletCard address={walletData.address} balance={walletData.balance} />,
    )

    const showPrivateKeyBtn = screen.getByTestId('show-private-key-btn')
    act(() => {
      userEvent.click(showPrivateKeyBtn)
    })
    const passwordInput = screen.getByTestId('password-input')
    const confirmBtn = screen.getByText('Confirm')
    act(() => {
      userEvent.type(passwordInput, 'wrong password')
      userEvent.click(confirmBtn)
    })
    const errorMessage = screen.getByText('Invalid password')
    expect(errorMessage).toBeInTheDocument()
  })
  it("should clear the password input when the user clicks the 'Cancel' button", () => {
    render(
      <WalletCard address={walletData.address} balance={walletData.balance} />,
    )

    const showPrivateKeyBtn = screen.getByTestId('show-private-key-btn')
    act(() => {
      userEvent.click(showPrivateKeyBtn)
    })
    const passwordInput = screen.getByTestId('password-input')
    const cancelBtn = screen.getByText('Cancel')
    act(() => {
      userEvent.type(passwordInput, 'wrong password')
      // close the modal
      userEvent.click(cancelBtn)
    })
    // open the modal again
    act(() => {
      userEvent.click(showPrivateKeyBtn)
    })
    expect(screen.getByTestId('password-input')).toHaveValue('')
  })
  it("should show password input validation error when the user clicks the 'Confirm' button without entering a password", () => {
    render(
      <WalletCard address={walletData.address} balance={walletData.balance} />,
    )

    const showPrivateKeyBtn = screen.getByTestId('show-private-key-btn')
    act(() => {
      userEvent.click(showPrivateKeyBtn)
    })
    const confirmBtn = screen.getByText('Confirm')
    act(() => {
      userEvent.click(confirmBtn)
    })
    const errorMessage = screen.getByText('Password cannot be empty')
    expect(errorMessage).toBeInTheDocument()
  })
})
