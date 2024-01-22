import { render, screen } from '../../../../testUtils'
import Modal from '../Modal'

const title = 'Test Modal'
describe('Modal', () => {
  it('should render modal title', () => {
    render(<Modal title={title} open={true} />)
    const modalTitle = screen.getByText(title)
    expect(modalTitle).toBeInTheDocument()
  })

  it('should render modal content', () => {
    const content = 'Test Modal Content'
    render(
      <Modal title={title} open={true}>
        {content}
      </Modal>,
    )
    const modalContent = screen.getByText(content)
    expect(modalContent).toBeInTheDocument()
  })

  it('should not render modal when closed', () => {
    render(<Modal title={title} open={false} />)
    const modalTitle = screen.queryByText(title)
    expect(modalTitle).not.toBeInTheDocument()
  })
})
