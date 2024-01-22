import { type ComponentProps } from 'react'
import { StyledInput, StyledLabel } from './TextField.elements'

type Props = {
  label: string
} & ComponentProps<'input'>

function TextField({ label, ...props }: Props) {
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput {...props}></StyledInput>
    </>
  )
}

export default TextField
