import { type ComponentProps } from 'react'
import { Container, ModalContent, ModalHeader } from './Modal.elements'

export type ModalProps = {
  title: string
  open: boolean
} & ComponentProps<'div'>
function Modal({ title, open, children, ...props }: ModalProps) {
  if (!open) return <></>
  return (
    <Container {...props}>
      <ModalContent>
        <ModalHeader {...props}>
          <h5>{title}</h5>
        </ModalHeader>
        {children}
      </ModalContent>
    </Container>
  )
}

export default Modal
