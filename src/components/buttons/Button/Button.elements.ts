import styled, { css } from 'styled-components'

type StyledButtonProps = {
  variant: 'filled' | 'text'
  disabled: boolean
}
export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<StyledButtonProps>`
  ${({ variant, theme, disabled }) => css`
    border: none;
    background: none;
    border-radius: 999px;
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.common.white};
    padding: 0.8em 1.5em;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }

    ${variant === 'text' &&
    css`
      background-color: unset;
      color: ${theme.palette.primary.main};
    `}

    ${disabled &&
    css`
      cursor: not-allowed;
      filter: brightness(0.5);
      &:hover {
        filter: brightness(0.5);
      }
    `}
  `}
`
