import styled from 'styled-components'
import { range } from '../../lib/ArrayUtil'
import FlipViewer from '../generic/FlipViewer'
import { DynamicCardViewer } from './DynamicCardViewer'

type CardsViewerProps = {
  cards: number[]
}
const CardsViewer = ({ cards }: CardsViewerProps) => {
  const renderItem = (item: number) => {
    return (
        <a href={`/api/card/dynamic/${item}`}><Item><DynamicCardViewer card={item} /></Item></a>
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

const Item = styled.div`width: 300px; height: 300px;`

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


export default CardsViewer
