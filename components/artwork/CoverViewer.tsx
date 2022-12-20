import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AttributesBoxView } from '../generic/Attributes'

export const useArtworkMeta = (artworkId: number) => {
  const [artwork, setArtwork] = useState<any | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/artwork/meta/${artworkId}`)
      .then((res) => res?.json())
      .then((json) => setArtwork(json))
  }, [])

  return [artwork] as const
}

const CoverViewer = () => {
  const [artworkMeta] = useArtworkMeta(0)
  return (
    <div>
      <CardWrapper>
        <Image src={`/api/artwork/gif/0`} />
      </CardWrapper>
      <AttributesBoxView attributes={artworkMeta?.attributes} />
    </div>
  )
}

const CardWrapper = styled.div`
  padding: 2em;
  transform-style: preserve-3d;
  perspective: 1000px;
  max-width: 100%;
  max-height: 100%;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5em;
  box-shadow: 0 5px 10px rgba(24, 24, 24, 1), 0 10px 40px rgba(40, 40, 40, 0.8);

  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  animation-duration: 5s;
  animation-name: anim;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;

  @keyframes anim {
    0% {
      transform: rotateY(-8deg);
    }
    50% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(8deg);
    }
  }
`

export default CoverViewer
