import { ethers } from 'ethers'
import { availableNetworks } from '../configs/network'
import { type NetworkId } from '../types/network'

/**
 * Retrieves the balances of multiple wallet addresses on a specific network.
 * @param {NetworkId} networkId - The ID of the network.
 * @param {ethers.providers.JsonRpcProvider} provider - The JSON-RPC provider used to retrieve the balances.
 * @param {string[]} addresses - An array of wallet addresses.
 * @returns {Promise<string[]>} A Promise that resolves to an array of formatted balances.
 */
export async function getWalletBalances(
  networkId: NetworkId,
  provider: ethers.providers.JsonRpcProvider,
  addresses: string[],
): Promise<string[]> {
  // should use something like multicall to get balances in one call
  const allPromises = addresses.map((address) => {
    return provider.getBalance(address)
  })
  const results = await Promise.all(allPromises)
  return results.map((balance) => {
    // format the balance to the correct number of decimals
    return ethers.utils.formatUnits(
      balance,
      availableNetworks[networkId].decimals,
    )
  })
}
