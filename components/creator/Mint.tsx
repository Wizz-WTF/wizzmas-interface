import { ethers, BigNumber } from 'ethers'
import { NextPage } from 'next'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead, useAccount } from 'wagmi'
import WizzmasCardArtifact from '../../contracts/artifacts/WizzmasCard.json'
import WizzWTFArtifact from '../../contracts/artifacts/WizzWTF.json'
import { MediumTitle, PrimaryButton, SmallTitle } from '../generic/StyledComponents'
import DisplayError from '../generic/DisplayError'
import { SelectedToken } from './TokenPicker'
import { DynamicCardPreviewer } from '../card/DynamicCardViewer'
import styled from 'styled-components'
import Link from 'next/link'

export type MintProps = {
  artworkType: number | undefined
  templateType: number | undefined
  message: string | undefined
  token: SelectedToken | undefined
  recipient: string | undefined
}

type GetArtworksResult = {
  balance: number | undefined,
  isLoading: boolean
}
const useArtworks = (artworkType: number): GetArtworksResult => {
  const { address } = useAccount()

  const {
    data: balanceOfArtwork,
    isError: isBalanceOfArtworkError,
    isLoading: isBalanceOfArtworkLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_WIZZ_WTF_ADDRESS ?? '',
    contractInterface: WizzWTFArtifact.abi,
    functionName: 'balanceOf',
    args: [address, artworkType],
  })

  return { balance: balanceOfArtwork ? BigNumber.from(balanceOfArtwork).toNumber() : undefined, isLoading: isBalanceOfArtworkLoading}
}

const Mint: NextPage<MintProps> = ({ artworkType, templateType, message, token, recipient }: MintProps) => {
  const { address } = useAccount()
  const { balance: numArtworks, isLoading: isLoadingArtworks } = useArtworks(0)
  const {
    data: mintEnabled,
    isError: isMintEnabledError,
    isLoading: isMintEnabledLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CARD_CONTRACT_ADDRESS ?? '',
    contractInterface: WizzmasCardArtifact.abi,
    functionName: 'mintEnabled',
  })

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CARD_CONTRACT_ADDRESS ?? '',
    contractInterface: WizzmasCardArtifact.abi,
    functionName: 'mint',
    args: [
      token?.tokenContract ? ethers.utils.getAddress(token.tokenContract) : undefined,
      token?.tokenId,
      artworkType,
      templateType,
      message,
      recipient ? ethers.utils.getAddress(recipient) : undefined,
    ],
  })
  const { data, error, write } = useContractWrite(config)
  const {
    data: txData,
    isLoading,
    isSuccess,
  } = useWaitForTransaction({
    confirmations: 1,
    hash: data?.hash,
  })


  return (
    <Wrapper>
      <MediumTitle>Wizzmas Card Ready!</MediumTitle>
      <PreviewWrapper>
        <DynamicCardPreviewer
          artwork={artworkType}
          message={message}
          template={templateType}
          token={token?.tokenId}
          tokenContract={token?.tokenContract}
        />
      </PreviewWrapper>

      <p>This card will be sent to {recipient}</p>

      {isLoadingArtworks && <SmallTitle>Checking your wallet for artworks...</SmallTitle>}
      {!isLoadingArtworks && (numArtworks ?? 0) < 1 && <SmallTitle>You don't have any artworks!</SmallTitle>}

      <PrimaryButton disabled={!write || isLoading || !mintEnabled} onClick={() => write!()}>
        {isLoading ? 'Minting...' : !mintEnabled ? 'Mint Closed...' : 'Mint now'}
      </PrimaryButton>
      {(prepareError || error) && <DisplayError error={prepareError || error} />}
      {isSuccess && (
        <>
          <MediumTitle>Success! You've sent a Wizzmas Card to {recipient}!</MediumTitle>
          <Link href="/send">-&gt; Send another Card</Link>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: no-wrap;
  flex-direction: column;
  gap: 1em;
  text-align: center;
`

const PreviewWrapper = styled.div`
  width: 80vw;
  height: 60vw;
`
export default Mint
