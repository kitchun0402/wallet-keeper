import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { availableNetworks, defaultNetworkId } from '../../configs/network'
import { NETWORK_SLICE_NAME } from '../../constants/redux'
import { type NetworkId } from '../../types/network'

interface NetworkState {
  currentNetworkId: NetworkId
  readOnlyProvider: ethers.providers.JsonRpcProvider
}
const initialState: NetworkState = {
  currentNetworkId: defaultNetworkId,
  readOnlyProvider: new ethers.providers.JsonRpcProvider(
    availableNetworks[defaultNetworkId].rpcUrl,
  ),
}
const networkSlice = createSlice({
  name: NETWORK_SLICE_NAME,
  initialState,
  reducers: {
    changeNetwork: (state, action: PayloadAction<{ networkId: NetworkId }>) => {
      state.currentNetworkId = action.payload.networkId
      state.readOnlyProvider = new ethers.providers.JsonRpcProvider(
        availableNetworks[action.payload.networkId].rpcUrl,
      )
    },
  },
})

export const { changeNetwork } = networkSlice.actions

export default networkSlice.reducer
