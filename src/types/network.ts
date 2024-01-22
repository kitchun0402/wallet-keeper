export enum NetworkId {
  AVALANCHE_FUJI = '43113',
  BSC_TESTNET = '97',
}

export type Network = {
  rpcUrl: string
  chainId: string
  displayName: string
  decimals: number
  tokenSymbol: string
}
