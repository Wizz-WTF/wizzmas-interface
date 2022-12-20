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

export type MintProps = {
  artworkType: number | undefined
  templateType: number | undefined
  message: string | undefined
  token: SelectedToken | undefined
  recipient: string | undefined
}

const Mint: NextPage<MintProps> = ({ artworkType, templateType, message, token, recipient }: MintProps) => {
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

  let numArtworks = balanceOfArtwork ? BigNumber.from(balanceOfArtwork).toNumber() : 0

  if (isBalanceOfArtworkLoading) {
    return <SmallTitle>Checking your wallet for artworks...</SmallTitle>
  }

  if (numArtworks < 1) {
  }

  return (
    <>
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
      {numArtworks < 1 && <SmallTitle>You don't have any artworks!</SmallTitle>}
      <PrimaryButton disabled={!write || isLoading} onClick={() => write!()}>
        {isLoading ? 'Minting...' : 'Mint now'}
      </PrimaryButton>
      {(prepareError || error) && <DisplayError error={prepareError || error} />}
      {isSuccess && <SmallTitle>Congrats, you sent a Wizzmas Card to {recipient}!</SmallTitle>}
    </>
  )
}

export default Mint

const PreviewWrapper = styled.div`
  width: 375px;
  height: 295px;
  margin-left: auto;
    margin-right: auto;
`
