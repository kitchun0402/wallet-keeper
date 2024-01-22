import AddNewWalletButton from '../../components/buttons/AddNewWalletButton/AddNewWalletButton'
import WalletCardsContainer from '../WalletCardsContainer/WalletCardsContainer'
import { Container } from './WalletKeeper.elements'

function WalletKeeper() {
  return (
    <Container>
      <WalletCardsContainer />
      <AddNewWalletButton />
    </Container>
  )
}

export default WalletKeeper
