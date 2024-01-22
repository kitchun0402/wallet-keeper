import { NetworkId, type Network } from '../types/network'

export const defaultNetworkId = NetworkId.AVALANCHE_FUJI
export const availableNetworks: { [id in NetworkId]: Network } = {
  [NetworkId.AVALANCHE_FUJI]: {
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    chainId: NetworkId.AVALANCHE_FUJI,
    displayName: 'Avalanche Fuji Testnet',
    decimals: 18,
    tokenSymbol: 'AVAX',
  },
  [NetworkId.BSC_TESTNET]: {
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    chainId: NetworkId.BSC_TESTNET,
    displayName: 'BSC Testnet',
    decimals: 18,
    tokenSymbol: 'tBNB',
  },
}
