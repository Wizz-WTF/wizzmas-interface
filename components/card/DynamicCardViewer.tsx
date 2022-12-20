import build from 'next/dist/build'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useContractRead } from 'wagmi'
import WizzmasCardArtifact from '../../contracts/artifacts/WizzmasCard.json'
import { Segment, VStack } from '../generic/StyledComponents'

type Card = {
  tokenContract: string
  token: number
  artwork: number
  template: number
  message: string
}

export const useCardMeta = (cardId: number) => {
  const [card, setCard] = useState<any | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/card/meta/${cardId}`)
      .then((res) => res?.json())
      .then((json) => setCard(json))
  }, [])

  return [card] as const
}

export const useCard = (cardId: number) => {
  const [card, setCard] = useState<Card | undefined>(undefined)
  useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CARD_CONTRACT_ADDRESS ?? '',
    contractInterface: WizzmasCardArtifact.abi,
    functionName: 'getCard',
    args: [cardId],
    onSuccess: (data) => {
      setCard(data as unknown as Card)
    },
  })

  return [card] as const
}

type DynamicCardPreviewerProps = {
  tokenContract: string | undefined
  token: number | undefined
  artwork: number | undefined
  template: number | undefined
  message: string | undefined
}
export const DynamicCardPreviewer = ({
  tokenContract,
  token,
  artwork,
  template,
  message,
}: DynamicCardPreviewerProps) => {
  function buildBackURL(): string {
    var url = '/api/card/img/generate?'
    url += template != undefined ? `&template=${template}` : ''
    url += message != undefined ? `&message=${message}` : ''
    url += tokenContract ? `&contract=${tokenContract}` : ''
    url += token != undefined ? `&token=${token}` : ''
    return url
  }
  const backUrl = buildBackURL()

  return (
    <>
      <FlipCard>
        <FlipCardInner>
          <FlipCardFront>
            <FlipCardImage src={`/api/artwork/gif/${artwork}`} />
          </FlipCardFront>
          <FlipCardBack>
            <FlipCardImage src={backUrl} />
          </FlipCardBack>
        </FlipCardInner>
      </FlipCard>
    </>
  )
}

type DynamicCardViewerProps = { card: number }
export const DynamicCardViewer = ({ card }: DynamicCardViewerProps) => {
  const [cardData] = useCard(card)

  return (
    <>
      {cardData && (
        <DynamicCardPreviewer
          artwork={cardData.artwork}
          message={cardData.message}
          template={cardData.template}
          token={cardData.token}
          tokenContract={cardData.tokenContract}
        />
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
  transition: transform 0.8s;
  transform-style: preserve-3d;
  // transition-timing-function: ease-out;
  // :hover, :active {
  //   transform: rotateY(180deg);
  // }
  -webkit-animation: cog 8s infinite;
	-moz-animation: cog 8s infinite;
	-ms-animation: cog 8s infinite; 			
	animation: cog 8s infinite;
  animation-direction: alternate;
  @keyframes cog {
    0%, 20% { 
      -moz-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      transform: rotateY(0deg)
    }
    30%, 70%{ 
      -moz-transform: rotateY(180deg);
      -ms-transform: rotateY(180deg);
      transform: rotateY(180deg)
    }
    80%, 100%{ 
      -moz-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      transform: rotateY(0deg)
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
