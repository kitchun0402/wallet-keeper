import { ethers, utils } from 'ethers'
import { availableNetworks } from '../../configs/network'
import { NetworkId } from '../../types/network'
import { getWalletBalances } from '../getWalletBalances'
describe('getWalletBalances', () => {
  it('should return an array of wallet balances', async () => {
    const networkId = NetworkId.AVALANCHE_FUJI
    const provider = new ethers.providers.JsonRpcProvider(
      availableNetworks[networkId].rpcUrl,
    )
    const balance = '100.0'
    const addresses = [
      '0x90abD5A18420474Af68C9DEEaB2786be696473A3',
      '0x0D7af8f6a1Ce70Ec38E5b6605ddaF8308636DB1a',
    ]
    const mockGetBalance = jest.fn()
    mockGetBalance.mockReturnValue(
      Promise.resolve(
        utils.parseUnits(balance, availableNetworks[networkId].decimals),
      ),
    )
    jest
      .spyOn(ethers.providers.JsonRpcProvider.prototype, 'getBalance')
      .mockImplementation(mockGetBalance)

    const balances = await getWalletBalances(networkId, provider, addresses)

    expect(balances).toHaveLength(addresses.length)
    expect(balances[0]).toBe(balance)
    expect(balances[1]).toBe(balance)
  })

  it("should still return an array of balances if the provider doesn't have a getBalance method", async () => {
    const networkId = NetworkId.AVALANCHE_FUJI
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const fakeProvider = {} as ethers.providers.JsonRpcProvider

    const balance = '100.0'
    const addresses = [
      '0x90abD5A18420474Af68C9DEEaB2786be696473A3',
      '0x0D7af8f6a1Ce70Ec38E5b6605ddaF8308636DB1a',
    ]
    const mockGetBalance = jest.fn()
    mockGetBalance.mockReturnValue(
      Promise.resolve(
        utils.parseUnits(balance, availableNetworks[networkId].decimals),
      ),
    )
    jest
      .spyOn(ethers.providers.JsonRpcProvider.prototype, 'getBalance')
      .mockImplementation(mockGetBalance)

    const balances = await getWalletBalances(networkId, fakeProvider, addresses)

    expect(balances).toHaveLength(addresses.length)
    expect(balances[0]).toBe(balance)
    expect(balances[1]).toBe(balance)
  })
})
