import userEvent from '@testing-library/user-event'
import { act, render, screen } from '../../../../testUtils'
import { getShortenedAddress } from '../../../../utils/getShortenedAddress'
import WalletCard from '../WalletCard'

const walletData = {
  address: '0x1234567890123456789012345678901234567890',
  balance: '100',
}

describe('WalletCard', () => {
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
})
