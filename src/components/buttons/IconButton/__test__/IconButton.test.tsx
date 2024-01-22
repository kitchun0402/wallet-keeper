import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../testUtils'
import CopyIcon from '../../../icons/CopyIcon'
import IconButton from '../IconButton'

describe('IconButton', () => {
  it('should render the icon', () => {
    render(<IconButton icon={<CopyIcon data-testid="icon" />} />)
    const iconElement = screen.getByTestId('icon')
    expect(iconElement).toBeInTheDocument()
  })

  it('should fire the onClick function when the button is clicked', () => {
    const onClick = jest.fn()
    render(
      <IconButton data-testid="button" icon={<CopyIcon />} onClick={onClick} />,
    )
    const buttonElement = screen.getByTestId('button')
    userEvent.click(buttonElement)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
