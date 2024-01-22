import CryptoJS from 'crypto-js'
/**
 * Encrypts a private key using a password.
 *
 * @param {string} privateKey - The private key to encrypt.
 * @param {string} password - The password to use for encryption.
 * @returns {string} The encrypted private key.
 */
export const encryptPrivateKey = (
  privateKey: string,
  password: string,
): string => {
  return CryptoJS.AES.encrypt(privateKey, password).toString()
}

/**
 * Decrypts an encrypted private key using a password.
 *
 * @param {string} encryptedPrivateKey - The encrypted private key to decrypt.
 * @param {string} password - The password used for decryption.
 * @returns {string | null} The decrypted private key as a UTF-8 string.
 */
export const decryptPrivateKey = (
  encryptedPrivateKey: string,
  password: string,
): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
    return null
  }
}
