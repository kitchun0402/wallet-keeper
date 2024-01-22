import { useState, type ComponentProps } from 'react'
import { availableNetworks } from '../../../configs/network'
import { useAppSelector } from '../../../hooks/redux'
import { decryptPrivateKey } from '../../../lib/privateKey'
import PasswordModal from '../../modals/PasswordModal/PasswordModal'
import AddressCard from '../AddressCard/AddressCard'
import { Container, PrivateKeyText } from './WalletCard.elements'

type Props = {
  address: string
  balance?: string
} & ComponentProps<'div'>

function WalletCard({ address, balance, ...props }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [recoveredPrivateKey, setRecoveredPrivateKey] = useState('')
  const wallet = useAppSelector((state) =>
    state.user.wallets.find((wallet) => wallet.address === address),
  )
  const [inputErrorMessage, setInputErrorMessage] = useState('')
  const handleCloseModal = () => {
    setIsModalOpen(false)
    clearInputs()
    setRecoveredPrivateKey('')
  }
  const clearInputs = () => {
    setPasswordInput('')
    setInputErrorMessage('')
  }
  const handleRecoverPrivateKey = () => {
    if (passwordInput.trim() === '') {
      setInputErrorMessage('Password cannot be empty')
      return
    }
    const decryptedPrivateKey = decryptPrivateKey(
      wallet?.encryptedPrivateKey || '',
      passwordInput,
    )
    // if the password is wrong, decryptedPrivateKey will be null
    if (!decryptedPrivateKey) {
      setInputErrorMessage('Invalid password')
      setRecoveredPrivateKey('')
      return
    }
    // show the private key
    setRecoveredPrivateKey(decryptedPrivateKey)
    clearInputs()
  }
  const networkId = useAppSelector((state) => state.network.currentNetworkId)
  const tokenSymbol = availableNetworks[networkId].tokenSymbol

  return (
    <Container {...props}>
      <AddressCard
        address={address}
        onShowPrivateKeyClick={() => setIsModalOpen(true)}
      />
      <h5>
        Balance: {balance} {tokenSymbol}
      </h5>
      <PasswordModal
        title="Show private key"
        passwordInput={passwordInput}
        onPasswordInputChange={(password) => setPasswordInput(password)}
        open={isModalOpen}
        onClickConfirmButton={handleRecoverPrivateKey}
        onCloseModal={handleCloseModal}
        passwordInputValidationProps={{
          errorMessage: inputErrorMessage,
          isValid: !inputErrorMessage,
        }}
      >
        <AddressCard
          data-testid="password-modal-address-card"
          address={address}
        />
        {recoveredPrivateKey && (
          <PrivateKeyText>{recoveredPrivateKey}</PrivateKeyText>
        )}
      </PasswordModal>
    </Container>
  )
}

export default WalletCard
