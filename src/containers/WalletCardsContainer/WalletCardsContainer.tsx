import WalletCard from '../../components/cards/WalletCard/WalletCard'
import { Container } from './WalletCardsContainer.elements'

function WalletCardsContainer() {
  const walletList: Array<{ address: string; balance: string }> = []
  return (
    <Container>
      {walletList.length > 0 ? (
        walletList.map((wallet) => {
          return (
            <WalletCard
              key={wallet.address}
              address={wallet.address}
              balance={wallet.balance}
            />
          )
        })
      ) : (
        <h4>No wallet found</h4>
      )}
    </Container>
  )
}

export default WalletCardsContainer
