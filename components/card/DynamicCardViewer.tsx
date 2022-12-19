import styled from "styled-components"
import { useContractRead } from "wagmi"
import WizzmasCardArtifact from '../../contracts/artifacts/WizzmasCard.json'

type DynamicCardViewerProps = { card: number }
export const DynamicCardViewer = ({ card }: DynamicCardViewerProps) => {
  const {
    data: cardData,
    isError,
    isLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CARD_CONTRACT_ADDRESS ?? '',
    contractInterface: WizzmasCardArtifact.abi,
    functionName: 'getCard',
    args: [card],
  })

  return (
    <>
      {cardData && (
        <FlipCard>
          <FlipCardInner>
            <FlipCardFront>
              <FlipCardImage src={`/api/artwork/gif/${cardData?.artwork}`} />
            </FlipCardFront>
            <FlipCardBack>
              <FlipCardImage src={`/api/card/img/${cardData?.card}`} />
            </FlipCardBack>
          </FlipCardInner>
        </FlipCard>
      )}
    </>
  )
}

const FlipCard = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  perspective: 2000px;
`

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  :hover {
    transform: rotateY(180deg);
  }
`

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transform: rotateY(0deg);
`
const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transform: rotateY(180deg);
`
const FlipCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
