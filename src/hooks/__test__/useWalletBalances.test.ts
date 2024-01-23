import { renderHook, waitFor } from '@testing-library/react'
import { ethers } from 'ethers'
import { availableNetworks } from '../../configs/network'
import { encryptPrivateKey } from '../../lib/privateKey'
import { NetworkId } from '../../types/network'
import * as getWalletBalancesModule from '../../utils/getWalletBalances'
import { useAppSelector } from '../redux'
import useWalletBalances from '../useWalletBalances'
jest.mock('../redux', () => ({
  ...jest.requireActual('../redux'),
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
const encryptedPrivateKey = encryptPrivateKey(
  walletData.privateKey,
  walletData.password,
)
describe('useWalletBalances', () => {
  beforeEach(() => {
    mockUseAppSelector.mockImplementation((callback) => {
      return callback({
        user: {
          wallets: [
            {
              address: walletData.address,
              encryptedPrivateKey,
            },
          ],
        },
        network: networkFromRedux,
      })
    })
    jest
      .spyOn(getWalletBalancesModule, 'getWalletBalances')
      .mockReturnValue(Promise.resolve([walletData.balance]))
  })

  it('should fetch and set wallet balances', async () => {
    const { result } = renderHook(() => useWalletBalances())

    expect(result.current.balances).toEqual([])
    await waitFor(() => {
      expect(result.current.balances).toEqual([walletData.balance])
      expect(result.current.wallets).toEqual([
        {
          address: walletData.address,
          encryptedPrivateKey,
        },
      ])
    })
  })
})
