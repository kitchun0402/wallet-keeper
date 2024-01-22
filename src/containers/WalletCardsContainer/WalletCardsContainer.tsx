import { useEffect, useState } from 'react'
import WalletCard from '../../components/cards/WalletCard/WalletCard'
import { useAppSelector } from '../../hooks/redux'
import { getWalletBalances } from '../../utils/getWalletBalances'
import { Container } from './WalletCardsContainer.elements'

function WalletCardsContainer() {
  const walletList = useAppSelector((state) => state.user.wallets)
  const { readOnlyProvider, currentNetworkId } = useAppSelector(
    (state) => state.network,
  )
  const [walletBalances, setWalletBalances] = useState<string[]>([])

  // get wallet balances
  useEffect(() => {
    const getData = async () => {
      try {
        const balances = await getWalletBalances(
          currentNetworkId,
          readOnlyProvider,
          walletList.map((wallet) => wallet.address),
        )
        setWalletBalances(balances)
      } catch (error) {
        // should handle errors
        console.error(error)
      }
    }
    void getData()

    return () => {
      return setWalletBalances([])
    }
  }, [currentNetworkId, readOnlyProvider, walletList])

  return (
    <Container>
      {walletList.length > 0 ? (
        walletList.map((wallet, index) => {
          return (
            <WalletCard
              key={wallet.address}
              address={wallet.address}
              balance={walletBalances[index] || '-'}
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
