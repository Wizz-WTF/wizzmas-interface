import styled from 'styled-components'
import { useContractRead } from 'wagmi'
import WizzmasCardArtifact from '../../contracts/artifacts/WizzmasCard.json'

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
    console.log('build back url')
    console.log(url);
    return url
  }

  return (
    <>
      <FlipCard>
        <FlipCardInner>
          <FlipCardFront>
            <FlipCardImage src={`/api/artwork/gif/${artwork}`} />
          </FlipCardFront>
          <FlipCardBack>
            <FlipCardImage src={buildBackURL()} />
          </FlipCardBack>
        </FlipCardInner>
      </FlipCard>
    </>
  )
}

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
