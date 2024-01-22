import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { USER_SLICE_NAME } from '../../constants/redux'
import { encryptPrivateKey } from '../../lib/privateKey'
import { type WalletBasicInfo } from '../../types/wallet'

interface UserState {
  wallets: WalletBasicInfo[]
}
const initialState: UserState = {
  wallets: [],
}
const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    addAWallet: (state, action: PayloadAction<{ password: string }>) => {
      const wallet = ethers.Wallet.createRandom()
      // Get the private key and address
      const privateKey = wallet?.privateKey
      const address = wallet?.address
      const encryptedPrivateKey = encryptPrivateKey(
        privateKey,
        action.payload.password,
      )
      const newWallet: WalletBasicInfo = {
        address,
        encryptedPrivateKey,
      }
      state.wallets.push(newWallet)
    },
  },
})

export const { addAWallet } = userSlice.actions

export default userSlice.reducer
