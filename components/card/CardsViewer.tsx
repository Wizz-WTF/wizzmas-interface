import styled from 'styled-components'
import { range } from '../../lib/ArrayUtil'
import FlipViewer from '../generic/FlipViewer'
import { getBaseUrl } from '../../constants'

type CardsViewerProps = {
  cards: number[]
}
const CardsViewer = ({ cards }: CardsViewerProps) => {
  const renderItem = (item: number) => {
    const dynamicUrl = cards ? `${getBaseUrl() ?? 'http://localhost:3000'}/api/card/dynamic/${cards[item]}` : ''
    const imageUrl = cards ? `${getBaseUrl() ?? 'http://localhost:3000'}/api/card/img/${cards[item]}` : ''
    return (
      <a href={dynamicUrl}>
        <Card src={imageUrl} />
      </a>
    )
  }

  if (cards.length > 0) {
    return (
      <>
        <Title>
          <h3>Showing {cards.length} Cards Sent.</h3>
        </Title>
        <CardGrid>
          <FlipViewer items={range(0, cards.length)} renderItem={renderItem} />
        </CardGrid>
      </>
    )
  } else {
    return (
      <>
        <p>No sent cards!</p>
      </>
    )
  }
}

const CardGrid = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
`

const Title = styled.div`
  padding-left: 2em;
  padding-right: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 1em;
  width: 100%;
`

const Item = styled.div`
  width: 300px;
  height: 300px;
`

const Wrapper = styled.div`
  padding: 0.2em;
`

const Card = styled.img`
  width: 300px;
  height: 236px;
  border: 0;
  overflow: hidden;
  cursor: pointer;
  border: dashed;
  border-color: #222;
  :hover {
    border: dashed;
    border-color: yellow;
  }
`

export default CardsViewer
