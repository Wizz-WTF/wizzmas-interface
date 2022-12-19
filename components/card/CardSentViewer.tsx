import { useAccount, useContractRead } from 'wagmi'
import WizzmasCardArtifact from '../../contracts/artifacts/WizzmasCard.json'
import { SmallTitle } from '../generic/StyledComponents'
import CardsViewer from './CardsViewer'

const CardSentViewer = () => {
  const { address } = useAccount()
  const {
    data: senderIds,
    isError,
    isLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CARD_CONTRACT_ADDRESS ?? '',
    contractInterface: WizzmasCardArtifact.abi,
    functionName: 'getSenderCardIds',
    args: [address],
  })

  if (!address) {
    return <SmallTitle>Connect wallet to view sent cards!</SmallTitle>
  }

  if (isLoading) {
    return <SmallTitle>Loading...</SmallTitle>
  }

  if (isError) {
    return <SmallTitle>Could not read contract information!</SmallTitle>
  }

  return <>{senderIds != undefined && <CardsViewer cards={senderIds as number[]} />}</>
}

export default CardSentViewer
