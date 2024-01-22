import { type ComponentProps } from 'react'
import { getShortenedAddress } from '../../../utils/getShortenedAddress'
import IconButton from '../../buttons/IconButton/IconButton'
import CopyIcon from '../../icons/CopyIcon'
import KeyIcon from '../../icons/KeyIcon'
import { Container } from './AddressCard.elements'

type Props = {
  address: string
  onShowPrivateKeyClick?: () => void
} & ComponentProps<'div'>

function AddressCard({ address, onShowPrivateKeyClick, ...props }: Props) {
  const copyAddress = async () => {
    await window.navigator.clipboard.writeText(address)
  }
  return (
    <Container {...props}>
      <p>{getShortenedAddress(address)}</p>
      <IconButton
        data-testid="copy-address-btn"
        onClick={copyAddress}
        icon={<CopyIcon />}
      />
      {onShowPrivateKeyClick && (
        <IconButton
          data-testid="show-private-key-btn"
          icon={<KeyIcon />}
          onClick={onShowPrivateKeyClick}
        />
      )}
    </Container>
  )
}

export default AddressCard
