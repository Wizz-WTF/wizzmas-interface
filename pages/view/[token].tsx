import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import { DynamicCardViewer, useCardMeta } from '../../components/card/DynamicCardViewer'
import { AttributesBoxView } from '../../components/generic/Attributes'
import { LargeTitle } from '../../components/generic/StyledComponents'

const CardMetaView = ({ card }: { card: number }) => {
  const [cardMeta] = useCardMeta(card)
  return <>{cardMeta && <AttributesBoxView attributes={cardMeta.attributes} />}</>
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
            <LargeTitle>Wizzmas Card #{card}</LargeTitle>
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

export default ViewCard
