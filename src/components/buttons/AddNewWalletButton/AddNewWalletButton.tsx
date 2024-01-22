import { useState } from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import { addAWallet } from '../../../redux/slices/userSlice'
import PasswordModal from '../../modals/PasswordModal/PasswordModal'
import Button from '../Button/Button'

function AddNewWalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [inputErrorMessage, setInputErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPasswordInput('')
    setInputErrorMessage('')
  }

  const handleAddNewWallet = () => {
    if (passwordInput.trim() === '') {
      setInputErrorMessage('Password cannot be empty')
      return
    }
    dispatch(addAWallet({ password: passwordInput }))
    handleCloseModal()
  }
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add new wallet</Button>
      <PasswordModal
        passwordInput={passwordInput}
        title="Add a new wallet"
        open={isModalOpen}
        onClickConfirmButton={handleAddNewWallet}
        onCloseModal={handleCloseModal}
        onPasswordInputChange={(value) => setPasswordInput(value)}
        passwordInputValidationProps={{
          isValid: !inputErrorMessage,
          errorMessage: inputErrorMessage,
        }}
      />
    </>
  )
}

export default AddNewWalletButton
