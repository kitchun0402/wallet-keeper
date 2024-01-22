import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: left;
  user-select: none;
`

export const MenuOption = styled.div`
  cursor: pointer;
  padding: 20px;
  &:hover {
    background-color: #ddd;
  }
`

export const Options = styled.div`
  position: absolute;
  background-color: #f1f1f1;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
`

export const MenuButton = styled.div`
  background-color: #f2f4f6;
  color: black;
  padding: 16px;
  border: none;
  width: 100%;
  cursor: pointer;
`
