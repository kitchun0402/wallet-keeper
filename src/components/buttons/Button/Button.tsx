import { type ComponentProps } from 'react'
import { StyledButton } from './Button.elements'

type Props = {
  variant?: 'filled' | 'text'
  disabled?: boolean
} & ComponentProps<'button'>

function Button({
  children,
  variant = 'filled',
  disabled = false,
  ...props
}: Props) {
  return (
    <StyledButton variant={variant} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
