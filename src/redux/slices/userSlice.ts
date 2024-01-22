import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { type WalletBasicInfo } from '../../types/wallet'

interface UserState {
  wallets: WalletBasicInfo[]
}
const initialState: UserState = {
  wallets: [],
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAWallet: (state, action: PayloadAction<{ password: string }>) => {
      const wallet = ethers.Wallet.createRandom()
      // Get the private key and address
      const privateKey = wallet?.privateKey
      const address = wallet?.address

      const newWallet: WalletBasicInfo = {
        address,
        hashedPrivateKey: privateKey,
      }
      state.wallets.push(newWallet)
    },
  },
})

export const { addAWallet } = userSlice.actions

export default userSlice.reducer
