import styled from 'styled-components'
import { useAccount, useContractRead } from 'wagmi'
import { useEffect, useState } from 'react'
import WizzmasCardArtifact from '../../contracts/artifacts/WizzmasCard.json'
import { range } from '../../lib/ArrayUtil'
import FlipViewer from '../generic/FlipViewer'
import { SmallTitle } from '../generic/StyledComponents'

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

  const renderItem = (item: any) => {
    console.log(process.env.VERCEL_URL)
    const dynamicUrl = senderIds ? `${process.env.VERCEL_URL ?? 'http://localhost:3000'}/api/card/dynamic/${senderIds[item]}` : "";
    const [card, loadCard] = useState<any | undefined>(undefined)

    useEffect(() => {
      async function fetchCard() {
        try {
          const response = await fetch(dynamicUrl)
          const content = await response.text()
          loadCard(content)
        } catch (err) {
          console.log(err)
        }
      }
      fetchCard()
    }, [])

    return (
      <Item>
        <Wrapper>
          <Card dangerouslySetInnerHTML={{ __html: card }} />
        </Wrapper>
      </Item>
    )
  }

  if (!address) {
    return <SmallTitle>Connect wallet to view sent cards!</SmallTitle>
  }

  if (isLoading) {
    return <SmallTitle>Loading...</SmallTitle>
  }

  if (isError) {
    return <SmallTitle>Could not read contract information!</SmallTitle>
  }

  if (senderIds != undefined && senderIds.length > 0) {
    return (
      <>
        <Title>
          <h3>Showing {senderIds.length} Cards Sent.</h3>
        </Title>
        <CardGrid>
          <FlipViewer items={range(0, senderIds.length)} renderItem={renderItem} />
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

const Card = styled.div`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

export default CardSentViewer
