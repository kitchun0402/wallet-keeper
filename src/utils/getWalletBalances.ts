import { ethers } from 'ethers'
import { availableNetworks } from '../configs/network'
import { type NetworkId } from '../types/network'

export async function getWalletBalances(
  networkId: NetworkId,
  provider: ethers.providers.JsonRpcProvider,
  addresses: string[],
) {
  // should use something like multicall to get balances in one call
  const allPromises = addresses.map((address) => {
    return provider.getBalance(address)
  })
  const results = await Promise.all(allPromises)
  return results.map((balance) => {
    return ethers.utils.formatUnits(
      balance,
      availableNetworks[networkId].decimals,
    )
  })
}
