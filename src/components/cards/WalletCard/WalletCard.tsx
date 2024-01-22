import { type ComponentProps } from 'react'
import { availableNetworks } from '../../../configs/network'
import { useAppSelector } from '../../../hooks/redux'
import { getShortenedAddress } from '../../../utils/getShortenedAddress'
import IconButton from '../../buttons/IconButton/IconButton'
import CopyIcon from '../../icons/CopyIcon'
import KeyIcon from '../../icons/KeyIcon'
import { AddressContainer, Container } from './WalletCard.elements'

type Props = {
  address: string
  balance?: string
  onShowPrivateKeyClick?: () => void
} & ComponentProps<'div'>

function WalletCard({
  address,
  balance,
  onShowPrivateKeyClick,
  ...props
}: Props) {
  const networkId = useAppSelector((state) => state.network.currentNetworkId)
  const tokenSymbol = availableNetworks[networkId].tokenSymbol

  const copyAddress = async () => {
    await window.navigator.clipboard.writeText(address)
  }
  return (
    <Container {...props}>
      <AddressContainer>
        <p>{getShortenedAddress(address)}</p>
        <IconButton onClick={copyAddress} icon={<CopyIcon />} />
        {onShowPrivateKeyClick && (
          <IconButton
            data-testid="show-private-key-btn"
            icon={<KeyIcon />}
            onClick={onShowPrivateKeyClick}
          />
        )}
      </AddressContainer>
      <h5>
        Balance: {balance} {tokenSymbol}
      </h5>
    </Container>
  )
}

export default WalletCard
