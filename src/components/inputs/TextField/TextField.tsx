import { type ComponentProps } from 'react'
import { ErrorMessage, StyledInput, StyledLabel } from './TextField.elements'

export type TextFieldProps = {
  label: string
  validationProps?: {
    isValid: boolean
    errorMessage: string
  }
} & ComponentProps<'input'>

function TextField({ label, validationProps, ...props }: TextFieldProps) {
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput {...props} />
      {!validationProps?.isValid && validationProps?.errorMessage && (
        <ErrorMessage>{validationProps.errorMessage}</ErrorMessage>
      )}
    </>
  )
}

export default TextField
