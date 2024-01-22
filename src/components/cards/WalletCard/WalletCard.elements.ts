import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 8px 24px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      height: 50%;
      width: 2px;
      background-color: ${theme.palette.primary.main};
    }
  `};
`

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const PrivateKeyText = styled.p`
  ${({ theme }) => css`
    word-break: break-all;
    border: 1px solid ${theme.palette.primary.main};
    margin: 1em 0;
    padding: 0.8em;
  `}
`
