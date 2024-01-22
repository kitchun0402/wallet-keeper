import userEvent from '@testing-library/user-event'
import { availableNetworks } from '../../../../configs/network'
import { render, screen } from '../../../../testUtils'
import { NetworkId } from '../../../../types/network'
import NetworkDropdown from '../NetworkDropdown'

describe('NetworkDropdown', () => {
  it('should render network options', () => {
    render(<NetworkDropdown />)
    const networkDropdown = screen.getByTestId('network-dropdown')
    userEvent.click(networkDropdown)
    const networkOptions = screen.getAllByTestId('network-option')
    expect(networkOptions.length).toEqual(Object.keys(availableNetworks).length)
  })

  it('should display the selected network', () => {
    render(<NetworkDropdown />)
    const networkDropdown = screen.getByTestId('network-dropdown')
    userEvent.click(networkDropdown)
    const networkOptions = screen.getAllByTestId('network-option')
    userEvent.click(networkOptions[0])
    expect(
      screen.getByText(availableNetworks[NetworkId.BSC_TESTNET].displayName),
    ).toBeInTheDocument()
  })
})
