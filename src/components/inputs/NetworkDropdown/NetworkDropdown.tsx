import { useEffect } from 'react'
import { availableNetworks, defaultNetworkId } from '../../../configs/network'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { changeNetwork } from '../../../redux/slices/networkSlice'
import { type NetworkId } from '../../../types/network'
import DropdownMenu from '../DropdownMenu/DropdownMenu'

function NetworkDropdown() {
  const currentNetworkId = useAppSelector(
    (state) => state.network.currentNetworkId,
  )
  const dispatch = useAppDispatch()

  // Set the default network
  useEffect(() => {
    dispatch(changeNetwork({ networkId: defaultNetworkId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DropdownMenu
      label={availableNetworks[currentNetworkId].displayName}
      onSelectOption={(option) =>
        dispatch(changeNetwork({ networkId: option as NetworkId }))
      }
      data-testid="network-dropdown"
    >
      {Object.values(availableNetworks).map((network) => {
        return (
          <DropdownMenu.Option
            data-testid="network-option"
            key={network.chainId}
            value={network.chainId}
          >
            {network.displayName}
          </DropdownMenu.Option>
        )
      })}
    </DropdownMenu>
  )
}

export default NetworkDropdown
