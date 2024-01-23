import WalletCard from '../../components/cards/WalletCard/WalletCard'
import useWalletBalances from '../../hooks/useWalletBalances'
import { Container } from './WalletCardsContainer.elements'

function WalletCardsContainer() {
  const { wallets, balances } = useWalletBalances()
  return (
    <Container>
      {wallets.length > 0 ? (
        wallets.map((wallet, index) => {
          return (
            <WalletCard
              key={wallet.address}
              address={wallet.address}
              balance={balances[index] || '-'}
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
