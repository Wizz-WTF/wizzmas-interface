import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { FRWC_SOULS_ADDRESS, FRWC_WARRIORS_ADDRESS, FRWC_WIZARDS_ADDRESS } from '../../constants'
import { getNFTs } from '../../lib/AlchemyUtil'
import Picker from '../generic/Picker'
import { fetchRunesWalkCycleFront } from '../../lib/TokenArtwork'
import { MediumTitle, VStack } from '../generic/StyledComponents'

export interface SelectedToken {
  tokenContract: string
  tokenId: number
}

type SelectedTokenProps = {
  onTokenSelected: (selected: SelectedToken) => void
}
const TokenPicker = ({ onTokenSelected }: SelectedTokenProps) => {
  const supportedTokens = [FRWC_WIZARDS_ADDRESS, FRWC_SOULS_ADDRESS, FRWC_WARRIORS_ADDRESS]
  const { address } = useAccount()

  const [loadingTokens, setLoadingTokens] = useState(false)
  const [ownedTokens, setOwnedTokens] = useState<any | undefined>(undefined)
  const [ownedTokensError, setOwnedTokensError] = useState<Error | null>(null)

  const tokensPerPage = 10

  if (!address) {
    return <p>Connect wallet to mint!</p>
  }

  useEffect(() => {
    setLoadingTokens(true)
    getNFTs(
      address,
      supportedTokens.map((c) => c.toString())
    )
      .then((res) => {
        setOwnedTokens(res.ownedNfts)
        setLoadingTokens(false)
      })
      .catch((error) => {
        setLoadingTokens(false)
        setOwnedTokensError(error)
      })
  }, [])

  const renderItem = (item: any) => {
    let id = BigNumber.from(item.id.tokenId).toNumber()
    let imgUrl = fetchRunesWalkCycleFront(item.contract.address, id)
    return (
      <Item>
        <TokenImage src={imgUrl} />
      </Item>
    )
  }

  return (
    <VStack>
      <MediumTitle>2. Select NFT:</MediumTitle>
      {loadingTokens == true && <p>Checking wallet...</p>}
      {ownedTokensError && <p>Could not load wallet NFTs...</p>}
      {ownedTokens && (
        <Picker
          items={ownedTokens}
          perPage={tokensPerPage}
          onSelected={(item) =>
            onTokenSelected({
              tokenContract: item.contract.address,
              tokenId: BigNumber.from(item.id.tokenId).toNumber(),
            })
          }
          renderItem={renderItem}
        />
      )}
      {ownedTokens && ownedTokens.length == 0 && <p>You have no eligible tokens.</p>}
    </VStack>
  )
}

const Item = styled.div`
  width: 100px;
  height: 100px;
`

const TokenImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export default TokenPicker
