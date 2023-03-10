import { NextPage } from 'next'
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import WizzWTFMinterArtifact from '../../contracts/artifacts/WizzWTFMinter.json'
import DisplayError from '../generic/DisplayError'
import { PrimaryButton, SmallTitle } from '../generic/StyledComponents'

export type ArtworkMintProps = {
  artworkType: number | undefined
}
const ArtworkMint: NextPage<ArtworkMintProps> = ({ artworkType }: ArtworkMintProps) => {
  const {
    data: mintPrice,
    isError: isPriceError,
    isLoading: isPriceLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_WIZZ_WTF_MINTER_ADDRESS ?? '',
    contractInterface: WizzWTFMinterArtifact.abi,
    functionName: 'mintPrice',
  })

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_WIZZ_WTF_MINTER_ADDRESS ?? '',
    contractInterface: WizzWTFMinterArtifact.abi,
    functionName: 'mint',
    args: [artworkType],
    overrides: { value: mintPrice },
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

  if (isPriceLoading) {
    return <></>
  }

  return (
    <>
      <PrimaryButton disabled={!write || isLoading} onClick={() => write!()}>
        {isLoading ? 'Minting...' : 'Mint now'}
      </PrimaryButton>
      {(prepareError || error) && <DisplayError error={prepareError || error} />}
      {isSuccess && <SmallTitle>Congrats, you minted a Wizz WTF!</SmallTitle>}
    </>
  )
}

export default ArtworkMint
