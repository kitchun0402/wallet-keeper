import useWalletBalances from '../../../hooks/useWalletBalances'
import { render, screen, waitFor } from '../../../testUtils'
import { getShortenedAddress } from '../../../utils/getShortenedAddress'
import WalletCardsContainer from '../WalletCardsContainer'

const walletData = {
  address: '0x1234567890123456789012345678901234567890',
  balance: '100.0',
  privateKey: 'this is my private key',
  password: '123456',
}
jest.mock('../../../hooks/useWalletBalances', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('WalletCardsContainer', () => {
  it('should render a message when there is not wallet generated', () => {
    const useWalletBalancesMock = useWalletBalances as jest.Mock
    useWalletBalancesMock.mockReturnValue({
      wallets: [],
      balances: [],
    })
    render(<WalletCardsContainer />)
    const message = screen.getByText('No wallet found')
    expect(message).toBeInTheDocument()
  })

  it('should render the wallet address', async () => {
    const useWalletBalancesMock = useWalletBalances as jest.Mock
    useWalletBalancesMock.mockReturnValue({
      wallets: [
        {
          address: walletData.address,
          encryptedPrivateKey: 'encryptedPrivateKey',
        },
      ],
      balances: [walletData.balance],
    })

    render(<WalletCardsContainer />)
    await waitFor(() => {
      const walletBalance = screen.getByText(
        `Balance: ${walletData.balance} AVAX`,
      )
      expect(walletBalance).toBeInTheDocument()
    })
    expect(
      screen.getByText(getShortenedAddress(walletData.address)),
    ).toBeInTheDocument()
  })
})
