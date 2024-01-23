import { useEffect, useState } from 'react'
import { getWalletBalances } from '../utils/getWalletBalances'
import { useAppSelector } from './redux'

function useWalletBalances() {
  const wallets = useAppSelector((state) => state.user.wallets)
  const { readOnlyProvider, currentNetworkId } = useAppSelector(
    (state) => state.network,
  )
  const [balances, setBalances] = useState<string[]>([])

  // get wallet balances
  useEffect(() => {
    const getData = async () => {
      try {
        const balances = await getWalletBalances(
          currentNetworkId,
          readOnlyProvider,
          wallets.map((wallet) => wallet.address),
        )

        setBalances(balances)
      } catch (error) {
        // should handle errors
        console.error(error)
      }
    }
    void getData()
  }, [currentNetworkId, readOnlyProvider, wallets])
  return { balances, wallets }
}

export default useWalletBalances
