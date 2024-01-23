import { ethers } from 'ethers'
import { availableNetworks } from '../../../configs/network'
import { useAppSelector } from '../../../hooks/redux'
import { encryptPrivateKey } from '../../../lib/privateKey'
import { render, screen, waitFor } from '../../../testUtils'
import { NetworkId } from '../../../types/network'
import { getShortenedAddress } from '../../../utils/getShortenedAddress'
import * as getWalletBalancesModule from '../../../utils/getWalletBalances'
import WalletCardsContainer from '../WalletCardsContainer'
jest.mock('../../../hooks/redux', () => ({
  ...jest.requireActual('../../../hooks/redux'),
  useAppSelector: jest.fn(),
}))

const walletData = {
  address: '0x1234567890123456789012345678901234567890',
  balance: '100.0',
  privateKey: 'this is my private key',
  password: '123456',
}
const networkId = NetworkId.AVALANCHE_FUJI
const mockUseAppSelector = useAppSelector as unknown as jest.Mock
const networkFromRedux = {
  currentNetworkId: networkId,
  readOnlyProvider: new ethers.providers.JsonRpcProvider(
    availableNetworks[networkId].rpcUrl,
  ),
}
describe('WalletCardsContainer', () => {
  it('should render a message when there is not wallet generated', () => {
    mockUseAppSelector.mockImplementation((callback) => {
      return callback({
        user: {
          wallets: [],
        },
        network: networkFromRedux,
      })
    })
    render(<WalletCardsContainer />)
    const message = screen.getByText('No wallet found')
    expect(message).toBeInTheDocument()
  })

  it('should render the wallet address', async () => {
    mockUseAppSelector.mockImplementation((callback) => {
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
        network: networkFromRedux,
      })
    })
    jest
      .spyOn(getWalletBalancesModule, 'getWalletBalances')
      .mockReturnValue(Promise.resolve([walletData.balance]))

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
