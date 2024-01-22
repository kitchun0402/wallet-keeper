import { ethers } from 'ethers'
import { availableNetworks } from '../../../configs/network'
import { NetworkId } from '../../../types/network'
import reducer, { changeNetwork } from '../networkSlice'

describe('networkSlice', () => {
  describe('changeNetwork', () => {
    it('should update the current network ID and read-only provider', () => {
      const initialState = {
        currentNetworkId: NetworkId.AVALANCHE_FUJI,
        readOnlyProvider: new ethers.providers.JsonRpcProvider(
          availableNetworks[NetworkId.AVALANCHE_FUJI].rpcUrl,
        ),
      }

      const expectedState = {
        currentNetworkId: NetworkId.BSC_TESTNET,
        readOnlyProvider: new ethers.providers.JsonRpcProvider(
          availableNetworks[NetworkId.BSC_TESTNET].rpcUrl,
        ),
      }

      const newState = reducer(
        initialState,
        changeNetwork({ networkId: NetworkId.BSC_TESTNET }),
      )

      expect(newState).toEqual(expectedState)
    })
  })
})
