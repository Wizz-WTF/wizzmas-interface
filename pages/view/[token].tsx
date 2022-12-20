import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import { DynamicCardViewer, useCardMeta } from '../../components/card/DynamicCardViewer'

const CardMetaView = ({ card }: { card: number }) => {
  const [cardMeta] = useCardMeta(card)
  return (
    <>
      {cardMeta && (
        <Table>
          {cardMeta.attributes.map((attr: any, i: any) => (
            <Row key={i}>
              <TraitName>{attr.trait_type}</TraitName>
              <TraitValue>{attr.value}</TraitValue>
            </Row>
          ))}
        </Table>
      )}
    </>
  )
}

const ViewCard = () => {
  const router = useRouter()
  const card = router.query.token ? +router.query.token : undefined

  const [domLoaded, setDomLoaded] = useState(false)
  useEffect(() => {
    setDomLoaded(true)
  }, [])

  if (domLoaded && card != undefined) {
    return (
      <>
        <Header />

        <Content>
          <FillSection>
            <h2>Wizzmas Card #{card}</h2>
            {!isNaN(card) && (
              <>
                <CardWrapper>
                  <DynamicCardViewer card={card} />
                </CardWrapper>
                <CardMetaView card={card} />
              </>
            )}
          </FillSection>
        </Content>

        <Footer />
      </>
    )
  }
}

const CardWrapper = styled.div`
  width: 80vw;
  height: 65vw;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 3em;
  margin-bottom: 2em;
`

export const FillSection = styled.div`
  background: #111;
  width: 100%;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1em;
`

export const Table = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8em;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  :first-child {
    color: gray;
  }
`

export const TraitName = styled.div`
  color: gray;
`
export const TraitValue = styled.div`
  color: white;
`

export default ViewCard
