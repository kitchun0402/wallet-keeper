import { render, screen } from '../../../../testUtils'
import theme from '../../../../theme/theme'
import Button from '../Button'

describe('Button', () => {
  it('should render children correctly', () => {
    render(<Button>Hello World</Button>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should render with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toHaveStyle({
      backgroundColor: theme.palette.primary.main,
    })
  })

  it('should render with custom variant', () => {
    render(<Button variant="text">Click me</Button>)
    expect(screen.getByText('Click me')).toHaveStyle({
      backgroundColor: 'unset',
      color: theme.palette.primary.main,
    })
  })
  it('should render with disabled state', () => {
    render(
      <Button variant="text" disabled>
        Click me
      </Button>,
    )
    expect(screen.getByText('Click me')).toHaveStyle({
      backgroundColor: 'unset',
      color: theme.palette.primary.main,
      filter: 'brightness(0.5)',
      cursor: 'not-allowed',
    })
  })
})
