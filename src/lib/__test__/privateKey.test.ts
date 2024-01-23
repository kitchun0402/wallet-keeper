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

describe('decryptPrivateKey', () => {
  it('should return a falsy value with a wrong password', () => {
    const privateKey = 'myPrivateKey'
    const password = 'myPassword'
    const wrongPassword = 'wrongPassword'
    const encryptedPrivateKey = encryptPrivateKey(privateKey, password)
    const decryptedPrivateKey = decryptPrivateKey(
      encryptedPrivateKey,
      wrongPassword,
    )
    expect(decryptedPrivateKey).toBeFalsy()
  })
})
