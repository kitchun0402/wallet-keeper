import { decryptPrivateKey, encryptPrivateKey } from '../privateKey'

describe('encryptPrivateKey', () => {
  it('should encrypt the private key with the given password', () => {
    const privateKey = 'myPrivateKey'
    const password = 'myPassword'
    const encryptedPrivateKey = encryptPrivateKey(privateKey, password)
    const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey, password)
    expect(decryptedPrivateKey).toEqual(privateKey)
  })
})
