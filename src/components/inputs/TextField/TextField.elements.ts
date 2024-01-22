import styled, { css } from 'styled-components'

export const StyledInput = styled.input`
  ${({ theme }) => css`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 100%;
    transition: all 0.3s ease-in-out;
    margin: 0.5em 0;
    &:focus {
      border-color: ${theme.palette.primary.main};
    }
  `}
`

export const StyledLabel = styled.label`
  font-size: 0.8rem;
`

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0.5em 0;
`
