import reducer, { addAWallet } from '../userSlice'

describe('userSlice', () => {
  describe('addAWallet', () => {
    it('should add a new wallet to the state', () => {
      const initialState = {
        wallets: [],
      }
      const password = 'testPassword'
      const newState = reducer(initialState, addAWallet({ password }))
      expect(newState.wallets).toHaveLength(1)
      expect(newState.wallets[0].address).toBeDefined()
      expect(newState.wallets[0].encryptedPrivateKey).toBeDefined()
    })
  })
})
