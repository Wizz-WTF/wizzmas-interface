import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CardCreator from '../../components/creator/CardCreator'
import { LargeTitle } from '../../components/generic/StyledComponents'

const CardSender = () => {
  const [domLoaded, setDomLoaded] = useState(false)
  useEffect(() => {
    setDomLoaded(true)
  }, [])

  if (domLoaded) {
    return (
      <>
        <Header />

        <FillSection>
          <LargeTitle>Create & Send Wizzmas Holiday Cards</LargeTitle>
          <CardCreator />
        </FillSection>

        <Footer />
      </>
    )
  }
}

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

export default CardSender
