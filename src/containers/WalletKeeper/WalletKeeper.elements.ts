import styled, { css } from 'styled-components'

export const Container = styled.main`
  ${({ theme }) => css`
    position: absolute;
    width: fit-content;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    background-color: ${theme.palette.common.white};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `}
`
