import { ethers } from 'ethers'
import Button from '../../components/buttons/Button/Button'
import WalletCardsContainer from '../WalletCardsContainer/WalletCardsContainer'
import { Container } from './WalletKeeper.elements'

function WalletKeeper() {
  const createWallet = async () => {
    const wallet = ethers.Wallet.createRandom()
    if (wallet) {
      // Get the private key and address
      const privateKey = wallet?.privateKey
      const address = wallet?.address

      console.log('Private Key:', privateKey)
      console.log('Address:', address)
    }
  }
  return (
    <Container>
      <WalletCardsContainer />
      <Button onClick={createWallet}>Add new wallet</Button>
    </Container>
  )
}

export default WalletKeeper
