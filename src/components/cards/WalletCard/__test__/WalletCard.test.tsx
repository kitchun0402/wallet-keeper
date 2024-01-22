import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../testUtils'
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

  it('should call the onShowPrivateKeyClick function when the showPrivateKeyBtn is clicked', () => {
    const onShowPrivateKeyClick = jest.fn()

    render(
      <WalletCard
        address={walletData.address}
        balance={walletData.balance}
        onShowPrivateKeyClick={onShowPrivateKeyClick}
      />,
    )

    const showPrivateKeyBtn = screen.getByTestId('show-private-key-btn')
    userEvent.click(showPrivateKeyBtn)

    expect(onShowPrivateKeyClick).toHaveBeenCalledTimes(1)
  })
})
