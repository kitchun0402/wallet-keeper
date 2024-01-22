import Button from '../../buttons/Button/Button'
import TextField from '../../inputs/TextField/TextField'
import Modal, { type ModalProps } from '../Modal/Modal'
import { ButtonGroup } from './PasswordModal.elements'

type Props = {
  passwordInput: string
  onPasswordInputChange: (password: string) => void
  onCloseModal: () => void
  onClickConfirmButton: () => void
} & ModalProps

function PasswordModal({
  passwordInput,
  onPasswordInputChange,
  onCloseModal,
  onClickConfirmButton,
  ...props
}: Props) {
  return (
    <Modal {...props}>
      <TextField
        data-testid="password-input"
        label="Enter your password"
        type="password"
        value={passwordInput}
        onChange={(e) => onPasswordInputChange(e.target.value)}
      />
      <ButtonGroup>
        <Button variant="text" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button onClick={onClickConfirmButton}>Confirm</Button>
      </ButtonGroup>
    </Modal>
  )
}

export default PasswordModal
