import { ethers } from 'ethers'
import { availableNetworks } from '../../configs/network'
import { NetworkId } from '../../types/network'
import { getWalletBalances } from '../getWalletBalances'

describe('getWalletBalances', () => {
  it('should return an array of wallet balances', async () => {
    const networkId = NetworkId.AVALANCHE_FUJI

    const provider = new ethers.providers.JsonRpcProvider(
      availableNetworks[networkId].rpcUrl,
    )
    const addresses = [
      '0x90abD5A18420474Af68C9DEEaB2786be696473A3',
      '0x0D7af8f6a1Ce70Ec38E5b6605ddaF8308636DB1a',
    ]

    const balances = await getWalletBalances(networkId, provider, addresses)

    expect(balances).toHaveLength(addresses.length)
    expect(balances[0]).toMatch(/^\d+(\.\d+)?$/)
  })
})
