import { render } from '../../../../testUtils'
import DropdownMenuContextProvider from '../DropdownMenuContext'

const initialContext = {
  currentOption: '',
  updateCurrentOption: (option: string) => {
    //
  },
  toggleMenu: () => {},
  isMenuOpen: false,
}
describe('DropdownMenuContextProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <DropdownMenuContextProvider value={{ ...initialContext }}>
        <div>Child Component</div>
      </DropdownMenuContextProvider>,
    )
    expect(getByText('Child Component')).toBeInTheDocument()
  })
})
