import Button from '../../buttons/Button/Button'
import TextField, {
  type TextFieldProps,
} from '../../inputs/TextField/TextField'
import Modal, { type ModalProps } from '../Modal/Modal'
import { ButtonGroup } from './PasswordModal.elements'

type Props = {
  passwordInput: string
  onPasswordInputChange: (password: string) => void
  onCloseModal: () => void
  onClickConfirmButton: () => void
  passwordInputValidationProps?: TextFieldProps['validationProps']
} & ModalProps

function PasswordModal({
  passwordInput,
  onPasswordInputChange,
  onCloseModal,
  onClickConfirmButton,
  passwordInputValidationProps,
  children,
  ...props
}: Props) {
  return (
    <Modal {...props}>
      {children}
      <TextField
        data-testid="password-input"
        label="Enter your password"
        type="password"
        value={passwordInput}
        onChange={(e) => onPasswordInputChange(e.target.value)}
        validationProps={passwordInputValidationProps}
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
