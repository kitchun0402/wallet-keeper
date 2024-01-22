import AddNewWalletButton from '../../components/buttons/AddNewWalletButton/AddNewWalletButton'
import NetworkDropdown from '../../components/inputs/NetworkDropdown/NetworkDropdown'
import WalletCardsContainer from '../WalletCardsContainer/WalletCardsContainer'
import { Container } from './WalletKeeper.elements'

function WalletKeeper() {
  return (
    <Container>
      <NetworkDropdown />
      <WalletCardsContainer />
      <AddNewWalletButton />
    </Container>
  )
}

export default WalletKeeper
