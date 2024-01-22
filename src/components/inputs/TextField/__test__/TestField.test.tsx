import { render, screen } from '../../../../testUtils'
import TextField from '../TextField'

describe('TextField', () => {
  it('should render label correctly', () => {
    const label = 'Username'
    render(<TextField label={label} />)
    const labelElement = screen.getByText(label)
    expect(labelElement).toBeInTheDocument()
  })

  it('should pass props correctly', () => {
    const placeholder = 'Enter your username'
    render(<TextField label="Username" placeholder={placeholder} />)
    const inputElement = screen.getByPlaceholderText(placeholder)
    expect(inputElement).toBeInTheDocument()
  })

  it('should render error message correctly', () => {
    render(
      <TextField
        label="Username"
        validationProps={{ isValid: false, errorMessage: 'error message' }}
      />,
    )
    const errorMessage = screen.getByText('error message')
    expect(errorMessage).toBeInTheDocument()
  })
})
